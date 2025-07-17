// src/services/api/HomePage/homeApi.ts

import axiosInstance from "../index";
import { MovieSummary } from "@/types/movieSummary";
import { WatchHistory } from "@/types/watchHistory";
import { Review } from "@/types/review";
import { Movie } from "@/types/movie";

// ✅ 1. 메인 배너 (MovieSummary 하나)
export async function getMainBanner(): Promise<Movie> {
  return axiosInstance.get("/home/banner").then(res => res.data);
}

// ✅ 2. 인기 콘텐츠 (MovieSummary 리스트)
export const getHotMovies = (): Promise<MovieSummary[]> => {
  return axiosInstance.get("/home/hot-movies").then(res => res.data);
};

// ✅ 3. 지금 뜨는 리뷰 (Review 리스트)
export const getHotTalks = (): Promise<Review[]> => {
  return axiosInstance.get("/home/popular-reviews").then(res => res.data);
};

// ✅ 4. 최근 본 콘텐츠 (WatchHistory 리스트)
export const getRecentWatchHistory = (): Promise<WatchHistory[]> => {
  return axiosInstance.get("/home/recent").then(res => res.data);
};

// ✅ 5. 사용자 맞춤 추천 (MovieSummary 리스트)
export const getRecommendedMovies = (): Promise<MovieSummary[]> => {
  return axiosInstance.get("/home/recommend").then(res => res.data);
};

// ✅ 6. 누적 리뷰 수 (숫자)
export const getReviewCount = (): Promise<number> => {
  return axiosInstance.get("/home/review-count").then(res => res.data);
};
