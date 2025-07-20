import axiosInstance from "../index";
import { userReview } from '@/types/userReview';

export interface ReviewStats {
  averageRating: number;
  totalCount: number;
  distribution: {
    [key: string]: number;
  };
}

export interface GetReviewsResponse {
  stats: ReviewStats;
  offset: number;
  limit: number;
  sort: string;
  results: userReview[];
}

// 리뷰 목록 조회
export const getMovieReviews = async (
  movieId: string,
  offset = 0,
  limit = 4,
  sort: 'latest' | 'ratingDesc' | 'ratingAsc' = 'ratingDesc',
): Promise<GetReviewsResponse> => {
  const res = await axiosInstance.get<GetReviewsResponse>(`/api/movies/${movieId}/reviews`, {
    params: { offset, limit, sort }
  });

  return res.data;
};
