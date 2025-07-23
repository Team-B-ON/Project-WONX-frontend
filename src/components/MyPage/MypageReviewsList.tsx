import React from 'react';
import { Review } from '@/types/review';
import MovieTag from '@/components/common/MovieTag';
import ReviewSlider from '@/components/common/ReviewSlider';
import { useNavigate } from 'react-router-dom';

type Props = {
  reviews: Review[];
};

const MypageReviewsList = ({ reviews }: Props) => {
  const navigate = useNavigate();

  if (!reviews || reviews.length === 0) {
    return <div className="text-white px-6">아직 작성한 리뷰가 없습니다.</div>;
  }

  return (
    <section className='flex flex-col space-y-[16px] '>
      <MovieTag
        title="내가 쓴 리뷰 모아보기"
        onClickMore={() => navigate('/mypage/reviews')}
        showMore
      />
      <ReviewSlider reviews={reviews} />
    </section>
  );
};

export default MypageReviewsList;
