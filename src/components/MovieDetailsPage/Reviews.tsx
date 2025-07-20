import React, { useRef, useState, useEffect } from 'react';
import RatingStars from '@/components/MovieDetailsPage/RatingStars';
import ReviewItem from './ReviewItem';
import { Review } from '@/types/review';
import { getMovieReviews, patchMovieReview, postMovieReview } from '@/services/api/MovieDetailsPage/review';

// 리뷰 평점
const ranges = ['9-10', '7-8', '5-6', '3-4', '1-2'];

const Reviews = ({ movieId }: { movieId: string }) => {
    const [rating, setRating] = useState(5);
    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // 리뷰 목록 상태 관리
    const [reviews, setReviews] = useState<Review[]>([]);
    const [distribution, setDistribution] = useState<{ [key: string]: number }>({});
    const [average, setAverage] = useState<number>(0);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [sort, setSort] = useState<'latest' | 'ratingDesc' | 'ratingAsc'>('ratingDesc');
    const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

    // API - 리뷰 목록 조회
    const fetchData = async () => {
        try {
        const res = await getMovieReviews(movieId, 0, 4, sort);
        setReviews(res.results);
        setDistribution(res.stats.distribution);
        setAverage(res.stats.averageRating);
        setTotalCount(res.stats.totalCount);
        } catch (err) {
        console.error("리뷰 로딩 실패", err);
        }
    };
    useEffect(() => {
        fetchData();
    }, [movieId, sort]);

    // API - 리뷰 등록
    const handleSubmit = async () => {
        const trimmed = value.trim();
        if (!trimmed) {
            alert("리뷰 내용을 입력해주세요.");
            return;
        }

        try {
            if (editingReviewId) {
                await patchMovieReview(editingReviewId, rating, trimmed);
            } else {
                await postMovieReview(movieId, rating, trimmed);
            }
            
            // 새로고침
            const res = await getMovieReviews(movieId, 0, 4, sort);
            setReviews(res.results);
            setDistribution(res.stats.distribution);
            setAverage(res.stats.averageRating);
            setTotalCount(res.stats.totalCount);

            // 초기화
            setValue("");
            setRating(5);
            setEditingReviewId(null);
        } catch (err) {
            console.error("리뷰 등록 실패", err);
            alert("리뷰 등록에 실패했습니다.");
        }
    };

    // API - 리뷰 수정
    const handleEditClick = (review: Review) => {
        setEditingReviewId(review.reviewId);
        setValue(review.content);
        setRating(review.rating);

        setTimeout(() => {
            textareaRef.current?.focus();
            textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

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
                        <div 
                            className="bg-white text-black w-[75px] text-[14px] flex items-center justify-center rounded-r-[3px] cursor-pointer"
                            onClick={handleSubmit}
                        >
                            {editingReviewId ? '수정' : '등록'}
                        </div>
                    </div>
                </div>
                <div className="my-[30px] w-[754px] h-[1px] bg-white"></div>

                {/* 리뷰 통계 */}
                <div className="pt-[20px] flex flex-row justify-center gap-[72px]">
                    {/* 총 평점 */}
                    <div className="w-[163px] h-[145px] flex flex-col justify-center items-center gap-[11px]">
                        <p className="text-[32px] font-bold">{average.toFixed(1)}/10</p>
                        <RatingStars rating={average} readOnly/>
                        <p className="text-[11px]">평균 평점 ({totalCount}개)</p>
                    </div>
                    {/* 평점별 수 집계 */}
                    <div className="w-[329px] h-[145px] flex flex-col justify-center pl-[18px] space-y-[3px]">
                    {ranges.map((range, index) => (
                        <div key={index} className="flex items-center w-full">
                            <span className="text-[14px] font-medium w-[30px] text-right">{range}</span>
                            <div className="w-[230px] h-[11px] bg-[#D9D9D9] rounded-[10px] ml-[11px]"></div>
                            <span className="text-[#636363] text-[10px] font-light pl-[6px]">{distribution[range] ?? 0}</span>
                        </div>
                    ))}
                    </div>
                </div>

                {/* 리뷰 목록 보기 */}
                <div className="w-[657px] pt-[16px]">
                    <p className="text-right pb-[6px] text-[14px]">
                        <span onClick={() => setSort('latest')} className="cursor-pointer hover:underline">최신순</span> 
                        <span className="text-[#636363] px-[6px] cursor-default">|</span> 
                        <span onClick={() => setSort('ratingDesc')} className="cursor-pointer hover:underline">별점 높은 순</span>
                        <span className="text-[#636363] px-[6px] cursor-default">|</span> 
                        <span onClick={() => setSort('ratingAsc')} className="cursor-pointer hover:underline">별점 낮은 순</span>
                    </p>
                    {/* 리뷰 리스트 */}
                    {reviews.length === 0 ? (
                        <p className="text-center py-10 text-gray-400 mt-[40px] border-t-white-1">아직 작성된 리뷰가 없습니다.</p>
                    ) : (
                        reviews.map((review) => (
                            <ReviewItem 
                                key={review.reviewId} 
                                review={review} 
                                onEditClick={() => handleEditClick(review)}
                                onDelete={fetchData}
                            />
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Reviews;