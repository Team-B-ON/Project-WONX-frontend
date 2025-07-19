import React, { useState } from 'react';
import RatingStars from '@/components/MovieDetailsPage/RatingStars';
import { Review } from '@/types/review';

type ReviewCardProps = {
  review: Review;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const MAX_LENGTH = 70;

  const isLong = review.content.length > MAX_LENGTH;
  const displayContent = !isLong
    ? review.content
    : expanded
      ? review.content
      : review.content.slice(0, MAX_LENGTH) + '...';

  const handleToggle = () => setExpanded(!expanded);

  const date = new Date(review.createdAt);
  const formatted = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;

  return (
    <div className="w-[280px] bg-[#2f2f2f] rounded-lg px-4 py-3 text-white space-y-2">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold truncate max-w-[180px]">
          {review.isAnonymous ? '익명' : review.userNickname}
        </p>
        <p className="text-xs text-[#888] whitespace-nowrap">{formatted}</p>
      </div>
      <RatingStars rating={review.rating} readOnly size={14} />
      <p className="text-sm leading-snug whitespace-pre-wrap">
        {displayContent}
        {isLong && (
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
