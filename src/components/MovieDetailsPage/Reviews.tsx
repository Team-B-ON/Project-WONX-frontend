import React, { useRef, useState, useEffect } from 'react';
import RatingStars from '@/components/MovieDetailsPage/RatingStars';
import ReviewItem from './ReviewItem';
import { userReview } from '@/types/userReview';

const reviews: userReview[] = [
  {
    id: "1",
    userId: "u1",
    videoId: "v1",
    rating: 7.5,
    content: "우리만의 따뜻한 불 영원한 꿈 영혼과 삶 난 난 오늘 떠날 거라고 생각했어 날 미워하지 마 no pain no where 음악이 없는 세상 no where no fear 바다 같은 색깔 no cap no cry 이미 죽은 사람 아냐 사실 태양에 맡겨뒀던 가족과 모든 분들의 사랑 물안개 짙어진 뒤 훔치려고 모인 자경단",
    isAnonymous: false,
    createdAt: new Date("2025-05-05T17:50:00"),
    nickname: "movieFan01",
  },
  {
    id: "2",
    userId: "u2",
    videoId: "v1",
    rating: 9,
    content: "연출이 아주 훌륭했어요!",
    isAnonymous: false,
    createdAt: new Date("2025-05-06T09:20:00"),
    nickname: "filmLover",
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
            <p className="pt-[78px] pb-[21px] text-[24px] font-semibold">감상평</p>

            <div className="flex flex-col items-center">
                <div className="mt-[10px] w-[754px] h-[1px] bg-white"></div>
                {/* 리뷰 등록란 */}
                <div className="w-[657px] flex flex-col items-center">
                    <p className="text-[22px] font-medium pt-[20px] pb-[6px]">평가하기</p>
                    <RatingStars rating={rating} onChange={(r) => setRating(r)} />
                    <div className="w-[568px] mt-[23px] border rounded-[5px] flex">
                        <textarea 
                            ref={textareaRef}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="감상평을 남겨주세요."
                            className="pl-[17px] pt-[14px] max-h-[250px] overflow-y-auto
                                        w-full resize-none focus:outline-none leading-[1.5] bg-transparent
                                        placeholder-[#707070] placeholder:text-[14px]"
                            style={{ height: "53px" }}
                        />
                        <div className="bg-white text-black w-[75px] text-[14px] flex items-center justify-center rounded-r-[3px] cursor-pointer">등록</div>
                    </div>
                </div>
                <div className="my-[30px] w-[754px] h-[1px] bg-white"></div>

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
                    <p className="text-right pb-[6px] text-[14px] cursor-pointer">
                        최신순 
                        <span className="text-[#636363] px-[6px] cursor-default">|</span> 
                        별점 높은 순 
                        <span className="text-[#636363] px-[6px] cursor-default">|</span> 
                        별점 낮은 순
                    </p>
                    {/* 리뷰 리스트 */}
                    {reviews.map((review) => (
                        <ReviewItem key={review.id} review={review} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Reviews;