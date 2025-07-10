import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { setAuthTokens } from '@/services/api/index';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const accessToken  = params.get('accessToken');
    const refreshToken = params.get('refreshToken');

    console.log("search:", search);
    console.log("access_token:", accessToken);
    console.log("refresh_token:", refreshToken);

    if (accessToken && refreshToken) {
      // 1) 토큰 저장
      console.log("토큰 저장 시도");
      setAuthTokens({ accessToken, refreshToken });

      setTimeout(() => {
        console.log("홈으로 이동");
        navigate('/home', { replace: true, state: { fromCallback: true } });
      }, 500);
    } else {
      // 토큰이 없으면 로그인 페이지로
      console.warn("토큰 없음. 로그인 페이지로 이동");
      setTimeout(() => {
        navigate('/');
      }, 500);
    }
  }, [search, navigate]);

  return (
    <div
        className="min-h-screen bg-cover bg-center relative"
    >
        <div className="absolute inset-0 bg-black" />

        <div className="absolute inset-0 z-20 flex items-center justify-center min-h-screen text-white">
            <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold text-800 mb-4">🍿 로그인 중...</h1>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
        </div>
    </div>
  );
};

export default AuthCallback;
