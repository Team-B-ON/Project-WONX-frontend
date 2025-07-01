import React, { useState } from "react";
import { Link } from 'react-router-dom';
import backgroundImg from '@/assets/common/netflix-background.png';
import { ChevronRight } from 'lucide-react';
import { requestAuthLink } from "@/services/api/SignUpPage/auth";

const SignUp = () => {
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

    return(
        <div
            className="min-h-screen bg-cover bg-center relative"
            style={{ 
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: '90%' 
            }}
        >
            <div className="absolute inset-0 bg-black/80" />

            <div className="relative z-10 min-h-screen">
                <header className="flex justify-between items-center px-[148px] py-[30px]">
                    <div className="text-white font-bold text-xl">로고</div>
                    <Link to="/login">
                        <button className="bg-[#E50914] w-[71px] h-[32px] rounded-[4px] cursor-pointer 
                                            transition-colors duration-200 ease-in-out hover:bg-[rgb(193,17,25)]
                                            text-white text-[14px] font-medium
                                            flex items-center justify-center">
                            로그인
                        </button>
                    </Link>
                </header>

                <main className="text-white py-28 text-center">
                    <h1 className="text-[56px] font-extrabold leading-tight">
                        영화, 시리즈 등을<br />무제한으로
                    </h1>
                    <p className="mt-[16px] text-[20px] font-medium">
                        5,500원으로 시작하세요. 멤버십은 언제든지 해지 가능합니다.
                    </p>
                    <p className="mt-[32px] text-[16px]">
                        시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일 주소를 입력하세요.
                    </p>

                    <div className="mt-[16px] flex flex-row justify-center gap-[8px]">
                        <input
                            type="email"
                            placeholder="이메일 주소"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-[408px] h-[56px] pt-[18px] pl-[16px] pb-[19px]
                                        rounded-[4px] border border-[rgba(255,255,255,0.7)]/60
                                        placeholder:text-[16px] placeholder:text-[rgba(255,255,255,0.70)]/90"
                        />
                        <button 
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`h-[56px] w-[178.32px] bg-[#E50914] pr-[22px] pl-[30px] pb-[4px] rounded-[4px] cursor-pointer 
                                        transition-colors duration-200 ease-in-out hover:bg-[rgb(193,17,25)]
                                        text-white font-medium text-[24px] leading-none
                                        flex items-center justify-center gap-2
                                        ${loading ? 'cursor-wait' : 'cursor-pointer'}
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
                                <>
                                시작하기
                                <ChevronRight size={30} className="mt-[4px]" />
                                </>
                            )}
                        </button>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default SignUp;