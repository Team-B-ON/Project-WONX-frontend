import axiosInstance from "../index";
import { MovieBanner } from "@/types/movieBanner";
import { HotMovie } from "@/types/hotMovie";
import { BoxOffice } from "@/types/boxOffice";
import { HotTalk } from "@/types/hotTalk";
import { WatchHistory } from "@/types/watchHistory";
import { RecommendMovie } from "@/types/recommend";

// ✅ 1. 인기 콘텐츠 메인 배너
export const getMainBanner = (): Promise<MovieBanner> => {
  return axiosInstance.get("/home/banner").then(res => res.data);
};

// ✅ 2. 개봉 예정작 뷰
export const getUpcomingMovies = (): Promise<MovieBanner[]> => {
  return axiosInstance.get("/home/upcoming").then(res => res.data);
};

// ✅ 3. WONX 인기 콘텐츠 뷰
export const getHotMovies = (count = 18): Promise<HotMovie[]> =>
  axiosInstance
    .get<HotMovie[]>(`/home/hot-movies?count=${count}`)
    .then(res => res.data.map(item => ({
      id:        item.id,
      title:     item.title,
      posterUrl: item.posterUrl,
      viewCount: item.viewCount,
    })));

// ✅ 4. 지금 뜨는 리뷰 뷰
export const getHotTalks = (): Promise<HotTalk[]> => {
  return axiosInstance.get("/home/hot-talk").then(res => res.data);
};

// ✅ 5. 박스오피스 콘텐츠 뷰
export const getBoxOfficeMovies = (): Promise<BoxOffice[]> => {
  return axiosInstance.get("/home/box-office").then(res => res.data);
};

// ✅ 6. 최근 본 콘텐츠 뷰
export const getRecentWatchHistory = (): Promise<WatchHistory[]> => {
  return axiosInstance.get("/home/recent").then(res => res.data);
};

// ✅ 7. 이어보기 콘텐츠 뷰
export const getContinueWatching = (): Promise<WatchHistory[]> => {
  return axiosInstance.get("/home/continue").then(res => res.data);
};

// ✅ 8. 사용자 맞춤 추천 뷰
export const getRecommendedMovies = (): Promise<RecommendMovie[]> => {
  return axiosInstance.get("/home/recommend").then(res => res.data);
};

// ✅ 9. 누적 리뷰 수 안내 뷰
export const getReviewCount = (): Promise<number> => {
  return axiosInstance.get("/home/review-count").then(res => res.data);
};
