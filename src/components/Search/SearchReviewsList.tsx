import React from 'react';
import { Review } from '@/types/review';
import MovieTag from '@/components/common/MovieTag';
import ReviewSlider from '@/components/common/ReviewSlider';

type Props = {
  reviews: Review[];
  title?: string;
};

const SearchReviewsList = ({ reviews, title = "리뷰에서 찾은 콘텐츠" }: Props) => {
  if (!reviews || reviews.length === 0) {
    return <div className="text-white px-6">리뷰 결과가 없습니다.</div>;
  }

  return (
    <section>
      <MovieTag title={title} showMore={false} />
      <ReviewSlider reviews={reviews} />
    </section>
  );
};

export default SearchReviewsList;
