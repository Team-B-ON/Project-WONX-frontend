import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// === 리프레시 토큰 상태 관리 ===
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onFailed(err: any) {
  refreshSubscribers.forEach((cb) => cb(err));
  refreshSubscribers = [];
}

// === 요청 인터셉터 ===
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// === 응답 인터셉터 ===
axiosInstance.interceptors.response.use(
  (response) => {
    // refresh 응답에서만 토큰 저장
    if (response.config?.url?.includes('/auth/refresh')) {
      const { accessToken, refreshToken } = response.data || {};
      if (accessToken && refreshToken) {
        setAuthTokens({ accessToken, refreshToken });
      }
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          addRefreshSubscriber((token: string) => {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await axiosInstance.post('/auth/refresh', {
          refreshToken,
        });

        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        setAuthTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken });
        onRefreshed(newAccessToken);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        onFailed(refreshError);
        clearAuthTokens();
        window.location.href = '/';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// === 토큰 수동 저장 ===
export function setAuthTokens({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

// === 토큰 삭제 ===
export function clearAuthTokens() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  delete axiosInstance.defaults.headers.common['Authorization'];
}

export default axiosInstance;
