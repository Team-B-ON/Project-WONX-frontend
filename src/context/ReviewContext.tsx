import React, { createContext, useContext } from 'react';
import type { Review } from '@/types/review';

type ReviewMap = Record<string, Review>;

const ReviewContext = createContext<ReviewMap>({});

export const ReviewProvider: React.FC<{
  reviews: Review[];
  children: React.ReactNode;
}> = ({ reviews, children }) => {
  const map: ReviewMap = {};
  reviews.forEach(r => {
    map[r.videoId] = r;
  });
  return (
    <ReviewContext.Provider value={map}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviewMap = () => useContext(ReviewContext);
