import { HotMovie } from "@/types/hotMovie";
import { Movie } from "@/types/movie";
import axiosInstance from "../api";
import { BoxOfficeMovie } from "@/types/BoxOfficeMovie";
import { HotTalk } from "@/types/HotTalk";

// 배너용 함수
export const getMainBanner = (): Promise<Movie> => {

  return axiosInstance.get("/home/banner")
    .then((res) => res.data);
}

// 인기 콘텐츠 함수
export const getHotMovies = (count: number = 18): Promise<HotMovie[]> => {

  return axiosInstance.get(`/home/hot-movies?count=${count}`)
    .then((res) => res.data);
}

// 추천 콘텐츠 함수
export const getRecommendedMovies = (): Promise<Movie[]> => {
  return axiosInstance.get("/home/recommend")
    .then(res => res.data);
}

// 박스 오피스 순위 함수
export const getBoxOfficeMovies = (): Promise<BoxOfficeMovie[]> => {
  return axiosInstance.get("/home/box-office")
    .then(res => res.data);
};

// 개봉 예정작 함수
export const getUpcomingMovies = (): Promise<Movie[]> => {
  return axiosInstance.get('/home/upcoming').then(res => res.data);
};

// 지금 뜨는 리뷰 함수
export const getHotTalks = (): Promise<HotTalk[]> => {
  return axiosInstance.get("/home/hot-talks").then(res => res.data);
};