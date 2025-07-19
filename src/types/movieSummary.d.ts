import { Genre } from './genre';

export interface MovieSummary {
  movieId: string;  
  title: string;
  posterUrl: string;
  isBookmarked: boolean;
  isLiked: boolean;
  ageRating: string;
  durationMinutes: number;
  genres: Genre[];
}
