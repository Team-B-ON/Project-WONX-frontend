import { Genre } from "./genre";

export interface GenreListResponse {
  genreId: string;
  genreName: string;
  offset: number;
  limit: number;
  hasNext: boolean;
  groupBy: 'subgenre';
  groups: {
    subgenre: string;
    subgenreId: number;
    movies: {
      movieId: number;
      title: string;
      posterUrl: string;
      bookmarked: boolean;
      liked: boolean;
      ageRating: string;
      durationMinutes: number;
      genres: Genre[];
    }[];
  }[];
}

export interface GenreGridResponse {
  genreId: string;
  genreName: string;
  offset: number;
  limit: number;
  sort: string;
  hasNext: boolean;
  results: {
    movieId: number;
    title: string;
    posterUrl: string;
    bookmarked: boolean;
    liked: boolean;
    ageRating: string;
    durationMinutes: number;
    genres: Genre[];
  }[];
}
