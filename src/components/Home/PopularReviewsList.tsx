import React from 'react';
import { Review } from '@/types/review';
import MovieTag from '@/components/common/MovieTag';
import ReviewSlider from '@/components/common/ReviewSlider';
import { useNavigate } from 'react-router-dom';

type Props = {
  reviews: Review[];
  title?: string; // 기본값을 줄 수 있게 옵션
};

const PopularReviewsList = ({ reviews, title = "인기 리뷰 모아보기" }: Props) => {
  const navigate = useNavigate();

  if (!reviews || reviews.length === 0) {
    return <div className="text-white px-6">아직 인기 있는 리뷰가 없습니다.</div>;
  }

  return (
    <section className='px-[80px] pt-[24px] flex flex-col space-y-[16px]'>
      <MovieTag
        title={title}
        onClickMore={() => navigate('/reviews/popular')}
        showMore
      />
      <div className='pt-[16px]'></div>
      <ReviewSlider reviews={reviews} />
    </section>
  );
};

export default PopularReviewsList;
