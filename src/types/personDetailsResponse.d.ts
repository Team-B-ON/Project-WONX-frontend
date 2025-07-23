export interface PersonDetailsResponse {
  personId: string;
  name: string;
  role: ('director' | 'screenwriter' | 'actor')[];
  movies: {
    movieId: number;
    title: string;
    posterUrl: string;
    bookmarked: boolean;
    liked: boolean;
    ageRating: string;
    durationMinutes: number;
    genre: string[];
  }[];
}
