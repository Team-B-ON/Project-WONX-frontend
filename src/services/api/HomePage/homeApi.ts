import { RawHotMovie, HotMovie } from "@/types/hotMovie";
// import { Movie } from "@/types/movie";
import axiosInstance from "../index";
import { BoxOfficeMovie } from "@/types/BoxOfficeMovie";
import { HotTalk } from "@/types/HotTalk";
import { MovieBanner } from "@/types/movieBanner";

// 배너용 함수
export const getMainBanner = (): Promise<MovieBanner> => {

  return axiosInstance.get("/home/banner")
    .then((res) => res.data);
}

// 인기 콘텐츠 함수
export const getHotMovies = (count = 18): Promise<HotMovie[]> =>
  axiosInstance
    .get<{ ranking: RawHotMovie[] }>(`/home/hot-movies?count=${count}`)
    .then(res => {
      console.log(res.data); 
      return res.data.ranking.map(item => ({
        id:        item.videoId,
        title:     item.title,
        posterUrl: item.thumbnailUrl,
        viewCount: item.watchCount,
      }));
    });

// 추천 콘텐츠 함수
export const getRecommendedMovies = (): Promise<MovieBanner[]> => {
  return axiosInstance.get("/home/recommend")
    .then(res => res.data);
}

// 박스 오피스 순위 함수
export const getBoxOfficeMovies = (): Promise<BoxOfficeMovie[]> => {
  return axiosInstance.get("/home/box-office")
    .then(res => res.data);
};

// 개봉 예정작 함수
export const getUpcomingMovies = (): Promise<MovieBanner[]> => {
  return axiosInstance.get('/home/upcoming').then(res => res.data);
};

// 지금 뜨는 리뷰 함수
export const getHotTalks = (): Promise<HotTalk[]> => {
  return axiosInstance.get("/home/hot-talks").then(res => res.data);
};