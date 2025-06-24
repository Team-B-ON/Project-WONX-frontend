import React, { useRef, useState, useEffect } from 'react';
import RatingStars from '@/components/MovieDetailsPage/RatingStars';

const reviews = [  // 임시 데이터터
  {
    id: 1,
    nickname: "movieFan01",
    createdAt: "2025.05.05. 17:50",
    rating: 7.5,
    content: "정말 감동적인 영화였어요.",
  },
  {
    id: 2,
    nickname: "filmLover",
    createdAt: "2025.05.06. 09:20",
    rating: 9,
    content: "연출이 아주 훌륭했어요!",
  },
];

const Reviews = () => {
    const [rating, setRating] = useState(3.5);
    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    // 리뷰 평점
    const ranges = ['9-10', '7-8', '5-6', '3-4', '1-2'];

    // 리뷰 입력
    useEffect(() => {
        if (!textareaRef.current) return;
        const ta = textareaRef.current;
        ta.style.height = "53px";
        const newHeight = Math.max(ta.scrollHeight, 53);
        ta.style.height = `${newHeight}px`;
    }, [value]);
    
    return(
        <>
            <p className="pt-[58px] pb-[21px] text-[24px] font-semibold">감상평</p>

            <div className="flex flex-col items-center">
                {/* 리뷰 등록란 */}
                <div className="w-[657px] h-[165px] flex flex-col items-center">
                    <p className="text-[22px] font-medium pt-[20px] pb-[6px]">평가하기</p>
                    <RatingStars rating={rating} onChange={(r) => setRating(r)} />
                    <div className="w-[568px] mt-[23px] border rounded-[5px] flex">
                        <textarea 
                            ref={textareaRef}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="감상평을 남겨주세요."
                            className="pl-[17px] pt-[14px] max-h-[150px] overflow-y-auto
                                        w-full resize-none focus:outline-none leading-[1.5] bg-transparent
                                        placeholder-[#707070] placeholder:text-[14px]"
                            style={{ height: "53px" }}
                        />
                        <div className="bg-white text-black w-[75px] text-[14px] flex items-center justify-center rounded-r-[3px] cursor-pointer">등록</div>
                    </div>
                </div>
                <div className="mt-[30px] w-[657px] h-[1px] bg-white"></div>

                {/* 리뷰 통계 */}
                <div className="pt-[20px] flex flex-row justify-center gap-[72px]">
                    {/* 총 평점 */}
                    <div className="w-[163px] h-[145px] flex flex-col justify-center items-center gap-[11px]">
                        <p className="text-[32px] font-bold">{rating}/10</p>
                        <RatingStars rating={rating} readOnly/>
                        <p className="text-[11px]">평균 평점 (0000명)</p>
                    </div>
                    {/* 평점별 수 집계 */}
                    <div className="w-[329px] h-[145px] flex flex-col justify-center pl-[18px] space-y-[3px]">
                    {ranges.map((range, index) => (
                        <div key={index} className="flex items-center w-full">
                            <span className="text-[14px] font-medium w-[30px] text-right">{range}</span>
                            <div className="w-[230px] h-[11px] bg-[#D9D9D9] rounded-[10px] ml-[11px]"></div>
                            <span className="text-[#636363] text-[10px] font-light pl-[6px]">00</span>
                        </div>
                    ))}
                    </div>
                </div>

                {/* 리뷰 목록 보기 */}
                <div className="w-[657px] pt-[16px]">
                    <p className="text-right pb-[6px] text-[14px]">최신순 | 별점 높은 순 | 별점 낮은 순</p>
                    {/* 리뷰 리스트 */}
                    <div>
                        {reviews.map((review) => (
                            <div 
                                key={review.id}
                                className="bg-[#2f2f2f] w-full h-[138px] text-white pt-[14px] pl-[30px] border-t"
                            >
                                <div className="flex flex-row justify-between pb-[5px]">
                                    <p className="text-[16px] font-medium">{review.nickname}</p>
                                    <p className="text-[14px] pr-[30px] text-[#636363]">{review.createdAt}</p>
                                </div>
                                <RatingStars rating={rating} readOnly size={16} />
                                <div className="w-[598px] h-[50px] pt-[14px] pb-[19px]">{review.content}</div>
                            </div>
                        ))}

                        
                    </div>

                </div>
            </div>
        </>
    );
};

export default Reviews;