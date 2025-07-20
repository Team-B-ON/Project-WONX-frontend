import React, { useState } from 'react';
import RatingStars from '@/components/MovieDetailsPage/RatingStars';
import { Review } from '@/types/review';

type ReviewItemProps = {
  review: Review;
  onEditClick?: () => void;
};

const ReviewItem = ({ review, onEditClick }: ReviewItemProps) => {
    const [expanded, setExpanded] = useState(false);
    const contentLimit = 100;
    const isLong = review.content.length > contentLimit;
    const previewText = review.content.slice(0, contentLimit);

    // 날짜 포맷
    const date = new Date(review.createdAt);
    const year   = date.getFullYear();
    const month  = String(date.getMonth() + 1).padStart(2, '0');
    const day    = String(date.getDate()).padStart(2, '0');
    const hour   = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const formattedDate = `${year}.${month}.${day}. ${hour}:${minute}`;

    return (
        <div className="bg-[#2f2f2f] w-full min-h-[138px] text-white pt-[14px] pl-[30px] border-t">
            <div className="flex flex-row justify-between pb-[5px]">
                <p className="text-[16px] font-medium">{review.userNickname}</p>
                <p className="text-[14px] pr-[30px] text-[#636363]">{formattedDate}</p>
            </div>

            <RatingStars rating={review.rating} readOnly size={16} />

            <div className="w-[598px] pt-[14px] pb-[9px] text-[14px] relative">
                {expanded ? (
                    <p
                        className="cursor-pointer whitespace-pre-wrap"
                        onClick={() => setExpanded(false)}
                    >
                        {review.content}
                    </p>
                ) : (
                    <p>
                        {isLong ? `${previewText}...` : review.content}
                        {isLong && (
                            <button
                                onClick={() => setExpanded(true)}
                                className="text-[#636363] cursor-pointer ml-[6px]"
                            >
                                더보기
                            </button>
                        )}
                    </p>
                )}

                {/* 수정, 삭제 버튼 */}
                {review.isMine && (
                    <div className="flex justify-end gap-[8px] pb-[10px]">
                    <button
                        className="hover:text-white text-[#ffffffb0] text-[15px] cursor-pointer"
                        onClick={onEditClick}
                    >
                        수정
                    </button>
                    <span className="text-[#ffffff80]"> | </span>
                    <button
                        className="hover:text-white text-[#ffffffb0] text-[15px] cursor-pointer"
                        onClick={() => console.log('삭제 클릭')}
                    >
                        삭제
                    </button>
                    </div>
                )}
            </div>
        </div>                    
    );
};

export default ReviewItem;
