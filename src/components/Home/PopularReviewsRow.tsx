// src/components/Home/PopularReviewsRow.tsx
import { Review } from '@/types/review';

interface PopularReviewsRowProps {
  title: string;
  reviews: Review[];
}

const PopularReviewsRow = ({ title, reviews }: PopularReviewsRowProps) => {
  return (
    <section className="pt-6 pb-10 space-y-4 overflow-visible text-white">
      <div className="px-6 sm:px-10 lg:px-20 space-y-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div>💬 인기 리뷰 컴포넌트 (총 {reviews.length}개)</div>
      </div>
    </section>
  );
};

export default PopularReviewsRow;
