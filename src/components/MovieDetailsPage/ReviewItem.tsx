import React, { useState } from 'react';
import RatingStars from '@/components/MovieDetailsPage/RatingStars';
import { userReview } from '@/types/userReview';

type ReviewItemProps = {
  review: userReview;
};

const ReviewItem = ({ review }: ReviewItemProps) => {
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
                <p className="text-[16px] font-medium">{review.nickname}</p>
                <p className="text-[14px] pr-[30px] text-[#636363]">{formattedDate}</p>
            </div>

            <RatingStars rating={review.rating} readOnly size={16} />

            <div className="w-[598px] pt-[14px] pb-[19px] text-[14px] relative">
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
            </div>
        </div>                    
    );
};

export default ReviewItem;
