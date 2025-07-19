import { Movie } from './movie';

export interface RelatedMoviesResponse {
  total: number;
  offset: number;
  limit: number;
  results: Movie[];
}