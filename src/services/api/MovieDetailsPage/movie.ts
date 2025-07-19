import { RelatedMoviesResponse } from "@/types/relatedMoviesResponse";
import axiosInstance from "../index";
import { Movie } from "@/types/movie";

interface RawMovie {
  id?: number;
  movieId?: number;
  title: string;
  posterUrl: string;
  mainImg: string;
  releaseDate: string;
  durationMinutes: number;
  ageRating: string;
  description: string;

  genres: { id: number; name: string }[];
  actors: { id: number; name: string }[];
  directors: { id: number; name: string }[];
  screenwriters: { id: number; name: string }[];

  bookmarked: boolean;
  liked: boolean;
}

function transformRawMovie(raw: RawMovie): Movie {
  return {
    id: (raw.movieId ?? raw.id).toString(),
    title: raw.title,
    description: raw.description,
    durationMinutes: raw.durationMinutes,
    releaseDate: raw.releaseDate,
    posterUrl: raw.posterUrl,
    mainImg: raw.mainImg,
    ageRating: raw.ageRating,

    genres: raw.genres.map(g => ({ id: g.id.toString(), name: g.name })),
    actors: raw.actors.map(a => ({ id: a.id.toString(), name: a.name })),
    directors: raw.directors.map(d => ({ id: d.id.toString(), name: d.name })),
    screenwriters: raw.screenwriters.map(s => ({
      id: s.id.toString(),
      name: s.name,
    })),

    isBookmarked: raw.bookmarked,
    isLiked: raw.liked,
  };
}

// 영화 상세 정보 조회
export const getMovieById = async (id: string): Promise<Movie> => {
    try {
        const { data } = await axiosInstance.get<RawMovie>(`/movies/${id}`);
        return transformRawMovie(data);
    } catch(e) {
        console.error("영화 상세 정보 조회 실패: ", e);
        throw e;
    }
};

// 함께 시청된 콘텐츠 조회
export const getRelatedMovies = async (
  movieId: string,
  offset = 0,
  limit = 6
): Promise<RelatedMoviesResponse> => {
  try {
    const res = await axiosInstance.get(`/movies/${movieId}/related`, {
      params: { offset, limit },
    });

    const { total, offset: o, limit: l, results } = res.data;

    return {
      total,
      offset: o,
      limit: l,
      results: results.map(transformRawMovie),
    };
  } catch (error) {
    console.error('함께 시청된 콘텐츠 조회 실패: ', error);
    throw error;
  }
}