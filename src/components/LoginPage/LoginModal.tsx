import { requestAuthLink } from '@/services/api/SignUpPage/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const LoginModal = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async() => {
        if (!email) return;
        setLoading(true);
        try {
            await requestAuthLink(email);
            console.log('이메일 전송 완료');
            alert('인증 링크가 발송되었습니다. 메일함을 확인해주세요.');
        } catch {
            alert('인증 요청에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black/70 text-white w-[450px] pt-[48px] px-[64px] pb-[103px] mx-auto rounded-[3px]">
            <h2 className="text-[32px] font-bold">로그인</h2>
            <input
                type="email"
                placeholder="이메일 주소"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="mt-[29px] h-[56px] w-full pt-[18px] pl-[16px] pb-[19px] 
                            rounded-[4px] border border-[rgba(255,255,255,0.7)]/60
                            placeholder:text-[16px] placeholder:text-[rgba(255,255,255,0.70)]/90"
            />
            <button 
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full h-[40px] mt-[42px]
                            transition-colors duration-200 ease-in-out
                            bg-[#E50914] rounded-[4px] hover:bg-[rgb(193,17,25)]
                            flex items-center justify-center
                            ${loading ? 'cursor-default' : 'cursor-pointer'}
                            `}
            >
                {loading ? (
                    <div className="flex items-center justify-center">
                    <span
                        className="w-2 h-2 bg-white rounded-full animate-loading-dots"
                        style={{ animationDelay: '0s' }}
                    />
                    <span
                        className="w-2 h-2 bg-white rounded-full animate-loading-dots mx-2"
                        style={{ animationDelay: '0.2s' }}
                    />
                    <span
                        className="w-2 h-2 bg-white rounded-full animate-loading-dots"
                        style={{ animationDelay: '0.4s' }}
                    />
                    </div>
                ) : (
                    <span className=" text-[16px] font-medium hover:opacity-90">
                        로그인 코드 받기
                    </span>
                )}
            </button>
            <div className="mt-[42px] flex items-center space-x-[12px] text-[16px]">
                <div className="relative w-[18px] h-[18px] flex-shrink-0">
                <input 
                    type="checkbox" 
                    id="remember"
                    className="peer w-[18px] h-[18px] flex-shrink-0 rounded-[2px] cursor-pointer
                                appearance-none border border-[rgba(128,128,128,0.7)]
                                hover:border-white transition-colors duration-200 ease-in-out
                                checked:bg-white"
                     />
                     <span
                        className="
                            absolute inset-0
                            hidden peer-checked:flex
                            items-center justify-center
                            text-black text-[12px] font-extrabold
                            pointer-events-none
                        "
                    >
                        ✓
                    </span>
                </div>
                <label htmlFor="remember" className="select-none">로그인 정보 저장</label>
            </div>
            <div className="mt-[25px] text-[rgba(255,255,255,0.70)] text-[16px]">
                넷플릭스 회원이 아닌가요?{' '}
                <Link to="/signup" className="font-semibold text-[16px] cursor-pointer text-white hover:underline">
                    지금 가입하세요.
                </Link>
            </div>
            <div className="mt-[28px] text-[13px] ">
                <p className="text-[rgba(255,255,255,0.5)]">
                    이 페이지는 Google reCAPTCHA의 보호를 받아 사용자가 로봇이 아님을 확인합니다.{'\n'}
                </p>
                <a href="#" className="block mt-[8px] underline text-[#448EF4]">자세히 알아보기.</a>
            </div>
        </div>
    );
};

export default LoginModal;
