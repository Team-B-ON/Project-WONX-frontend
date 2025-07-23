import { Genre } from './genre';

export interface MovieSummary {
  movieId: string;  
  title: string;
  posterUrl: string;
  bookmarked: boolean;
  liked: boolean;
  ageRating: string;
  durationMinutes: number;
  genres: Genre[];
}
