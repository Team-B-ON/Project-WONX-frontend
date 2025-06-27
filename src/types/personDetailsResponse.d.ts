export interface PersonDetailsResponse {
  personId: string;
  name: string;
  role: ('director' | 'screenwriter' | 'actor')[];
  movies: {
    movieId: number;
    title: string;
    posterUrl: string;
    // isBookmarked: boolean;
    // isLiked: boolean;
    ageRating: string;
    duration: number;
    genre: string[];
  }[];
}
