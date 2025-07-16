export interface MovieSearchDto {
  id: string;
  title: string;
  posterUrl: string;
}
export interface UserSearchDto {
  id: string;
  nickname: string;
  avatarUrl: string;
}
export interface ReviewSearchDto {
  id: string;
  movieTitle: string;
  posterUrl: string;
  content: string;
  author: string;
  rating: number;
}
export interface SuggestionDto {
  keyword: string;
}

export interface SearchResult {
  movies: MovieSearchDto[];
  users: UserSearchDto[];
  reviews: ReviewSearchDto[];
  suggestions?: SuggestionDto[];
}
