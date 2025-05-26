// components/LoginModal.tsx
import React from 'react';

const LoginModal = () => {
    return (
        <div className="bg-black/70 text-white w-[450px] pt-[48px] px-[64px] pb-[103px] mx-auto rounded-[3px]">
            <h2 className="text-[32px] font-bold">로그인</h2>
            <input
                type="email"
                placeholder="이메일 주소"
                className="mt-[29px] h-[56px] w-full pt-[18px] pl-[16px] pb-[19px] 
                            rounded-[4px] border border-[rgba(255,255,255,0.7)]/60
                            placeholder:text-[16px] placeholder:text-[rgba(255,255,255,0.70)]/90"
            />
            <button className="w-full h-[40px] mt-[42px] cursor-pointer
                                transition-colors duration-200 ease-in-out
                                bg-[#E50914] rounded-[4px] hover:bg-[rgb(193,17,25)]
                                flex items-center justify-center">
                  <span className=" text-[16px] font-medium hover:opacity-90">
                        로그인 코드 받기
                    </span>
            </button>
            <div className="mt-[42px] flex items-center space-x-[12px] text-[16px]">
                <input 
                    type="checkbox" 
                    id="remember"
                    className="peer w-[18px] h-[18px] flex-shrink-0 rounded-[2px] cursor-pointer
                                appearance-none border border-[rgba(128,128,128,0.7)]
                                hover:border-white transition-colors duration-200 ease-in-out
                                checked:bg-white"
                     />
                <label htmlFor="remember" className="select-none">로그인 정보 저장</label>
            </div>
            <div className="mt-[25px] text-[rgba(255,255,255,0.70)] text-[16px]">
                넷플릭스 회원이 아닌가요?{' '}
                <span className="font-semibold text-[16px] cursor-pointer text-white hover:underline">
                    지금 가입하세요.
                </span>
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
