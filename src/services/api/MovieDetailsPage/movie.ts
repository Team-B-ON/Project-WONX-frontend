import axiosInstance from "../index";
import { Movie } from "@/types/movie";

interface RawMovie {
  movieId: number;
  title: string;
  posterUrl: string;
  releaseDate: string;
  duration: number;
  ageRating: string;
  description: string;
  actors: { id: number; name: string }[];
  genre: { id: number; name: string }[];
  director: { id: number; name: string };
  screenwriters: { id: number; name: string }[];
  isBookmarked: boolean;
  isLiked: boolean;
}

function transformRawMovie(raw: RawMovie): Movie {
  return {
    id: raw.movieId.toString(),
    title: raw.title,
    description: raw.description,
    durationMinutes: raw.duration,
    releaseDate: raw.releaseDate,
    posterUrl: raw.posterUrl,
    ageRating: raw.ageRating,

    genres: raw.genre.map(g => ({ id: g.id.toString(), name: g.name })),
    actors: raw.actors.map(a => ({ id: a.id.toString(), name: a.name })),
    directors: [{ id: raw.director.id.toString(), name: raw.director.name }],
    screenwriters: raw.screenwriters.map(s => ({
      id: s.id.toString(),
      name: s.name,
    })),

    isBookmarked: raw.isBookmarked,
    isLiked: raw.isLiked,
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
