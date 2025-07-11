import React from "react";
import MovieCard from "@/components/common/MovieCard";
import type { Movie } from "@/types/movie";
import type { Review } from "@/types/review";

export type MyReviewCardProps = {
  movie: Movie;
  review?: Review;
  isFirst?: boolean;
  isLast?: boolean;
};

export default function MyReviewCard({
                                       movie,
                                       review,
                                       isFirst = false,
                                       isLast = false,
                                     }: MyReviewCardProps) {
  return (
    <div className="relative group">
      {/* 원래 MovieCard */}
      <MovieCard movie={movie} isFirst={isFirst} isLast={isLast} />

      {/* 내 리뷰가 있으면 hover 시 오버레이 */}
      {review && (
        <div
          className="
            absolute inset-0
            bg-black bg-opacity-75
            text-white p-2
            opacity-0 group-hover:opacity-100
            transition-opacity duration-200
            flex items-center justify-center text-center
          "
        >
          <p className="text-sm line-clamp-3">{review.content}</p>
        </div>
      )}
    </div>
  );
}