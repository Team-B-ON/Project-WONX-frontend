export interface AdminUserDto {
  id: string;
  email: string;
  nickname: string;
  planType: string;
  createdAt: string;
}

export interface AdminFollowDto {
  followerId: string;
  followeeId: string;
  createdAt: string;
}

export interface AdminWatchHistoryDto {
  id: string;
  userId: string;
  videoId: string;
  watchedAt: string;
  lastPosition: number;
  watchedSeconds: number;
  updatedAt: string;
  isCompleted: boolean;
}

export interface AdminHotTalkDto {
  id: string;
  content: string;
  viewCount: number;
  createdAt: string;
  movieId: string | null;
}

export interface AdminPersonDto {
  id: string;
  name: string;
}

export interface AdminReviewDto {
  id: string;
  userId: string;
  movieId: string;
  rating: number;
  content: string;
  isAnonymous: boolean;
  isDeleted: boolean;
  createdAt: string;
}

export interface AdminBookmarkDto {
  id: string;
  userId: string;
  movieId: string;
  createdAt: string;
}

export interface AdminLikeDto {
  id: string;
  userId: string;
  movieId: string;
  createdAt: string;
}

export interface AdminMovieDto {
  id: string;
  title: string;
  rating: number;
  durationMinutes: number;
  releaseDate: string;
  viewCount: number;
}
