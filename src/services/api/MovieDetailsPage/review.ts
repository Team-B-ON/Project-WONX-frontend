import axiosInstance from "../index";
import { Review } from "@/types/review";

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
  results: Review[];
}

// 리뷰 목록 조회
export const getMovieReviews = async (
  movieId: string,
  offset = 0,
  limit = 4,
  sort: 'latest' | 'ratingDesc' | 'ratingAsc' = 'ratingDesc',
): Promise<GetReviewsResponse> => {
  const res = await axiosInstance.get<GetReviewsResponse>(`/movies/${movieId}/reviews`, {
    params: { offset, limit, sort }
  });

  console.log("리뷰 목록:", res.data);
  return res.data;
};

// 리뷰 등록
export const postMovieReview = async (
  movieId: string,
  rating: number,
  content: string
): Promise<Review> => {
  const res = await axiosInstance.post<Review>(`/movies/${movieId}/reviews`, {
    rating,
    content,
  });

  console.log("리뷰 등록 결과:", res.data);
  return res.data;
};

// 리뷰 수정
export const patchMovieReview = async (
  reviewId: string,
  rating: number,
  content: string
): Promise<Review> => {
  const res = await axiosInstance.patch<{ review: Review }>(`/reviews/${reviewId}`, {
    rating,
    content,
  });

  console.log("리뷰 수정 결과:", res.data);
  return res.data.review;
};

// 리뷰 삭제
export const deleteMovieReview = async (reviewId: string): Promise<void> => {
  const res = await axiosInstance.delete(`/reviews/${reviewId}`);
  console.log("리뷰 삭제 결과:", res.data);
};