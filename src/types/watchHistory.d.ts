import { Movie } from './movie';

export interface WatchHistory {
  movie: Movie;   
  lastPosition: number;
  watchedSeconds: number;
  isCompleted: boolean;
}
