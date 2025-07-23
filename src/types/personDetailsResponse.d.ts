import { Genre } from "./genre";

export interface PersonDetailsResponse {
  personId: string;
  name: string;
  role: ('director' | 'screenwriter' | 'actor')[];
  movies: {
    movieId: string;
    title: string;
    posterUrl: string;
    bookmarked: boolean;
    liked: boolean;
    ageRating: string;
    durationMinutes: number;
    genres: Genre[];
  }[];
}
