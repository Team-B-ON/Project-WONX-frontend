// components/Home/PopularReviewsList.tsx
import React from "react";
import { Review } from "@/types/review";
import MovieTag from "../common/MovieTag";
import ReviewSlider from "../common/ReviewSlider";

type PopularReviewsListProps = {
  title: string;
  reviews: Review[];
  onClickMore?: () => void;
  showMore?: boolean;
};

const PopularReviewsList = ({
  title,
  reviews,
  onClickMore,
  showMore = true,
}: PopularReviewsListProps) => {
  if (reviews.length === 0) return null;

  return (
    <section className="pt-6 pb-10 space-y-4 overflow-visible">
      <div className="px-6 sm:px-10 lg:px-20 space-y-4">
        <MovieTag title={title} onClickMore={onClickMore} showMore={showMore} />
        <ReviewSlider reviews={reviews} />
      </div>
    </section>
  );
};

export default PopularReviewsList;
