export interface GenreListResponse {
  genreId: number;
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
      duration: number;
      genre: string[];
    }[];
  }[];
}

export interface GenreGridResponse {
  genreId: number;
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
    duration: number;
    genre: string[];
  }[];
}
