import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  // 첫번째 토큰 로그
  console.log('request interceptor, token=', token);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(response => {
  const { accessToken, refreshToken } = response.data || {};
  if (accessToken && refreshToken) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }
  return response;
}, error => {
  return Promise.reject(error);
});

// 로그인 시 토큰 저장
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

// 로그아웃 시 토큰 삭제
export function clearAuthTokens() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  delete axiosInstance.defaults.headers.common['Authorization'];
}


export default axiosInstance;