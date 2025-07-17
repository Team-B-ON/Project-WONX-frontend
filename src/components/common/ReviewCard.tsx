// components/Home/ReviewCard.tsx
import React, { useState } from 'react';
import RatingStars from '@/components/MovieDetailsPage/RatingStars';
import { Review } from '@/types/review'; // 홈에서는 userReview 대신 review.ts 쓸 것으로 가정

type ReviewCardProps = {
  review: Review;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const MAX_LENGTH = 80;
  const content =
    review.content.length > MAX_LENGTH && !expanded
      ? review.content.slice(0, MAX_LENGTH) + '...'
      : review.content;

  const handleToggle = () => setExpanded(!expanded);

  // 날짜 포맷
  const date = new Date(review.createdAt);
  const formatted = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;

  return (
    <div className="w-[300px] h-[200px] bg-[#2f2f2f] rounded-lg p-4 text-white flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold">
          {review.isAnonymous ? '익명' : review.userNickname}
        </p>
        <p className="text-xs text-[#888]">{formatted}</p>
      </div>
      <RatingStars rating={review.rating} readOnly size={14} />
      <p className="text-sm mt-2 leading-snug whitespace-pre-wrap">
        {content}
        {review.content.length > MAX_LENGTH && (
          <button
            onClick={handleToggle}
            className="ml-1 text-[#888] text-xs underline"
          >
            {expanded ? '접기' : '더보기'}
          </button>
        )}
      </p>
    </div>
  );
};

export default ReviewCard;
