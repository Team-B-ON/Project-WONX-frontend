import axiosInstance from '../index';
import type { Movie } from '@/types/movie';
import type { WatchHistory } from '@/types/watchHistory';
import type { Review } from '@/types/review';
import type { PublicProfileDto } from '@/types/profile';

// ---------- 타입 ----------
export interface UserProfile {
  nickname: string;
  followingCount: number;
  followerCount: number;
  profileImageUrl?: string;
}

export interface ProfileUpdateRequest {
  nickname?: string;
  bio?: string;
  profileImageUrl?: string;
}

// ---------- 프로필 ----------
export const getMyProfile = (): Promise<UserProfile> => {
  return axiosInstance.get('/mypage').then(res => {
    const data = res.data;
    return {
      nickname: data.nickname,
      followingCount: data.followingCount,
      followerCount: data.followerCount,
      profileImageUrl: data.profileImageUrl,
    };
  });
};

export const updateMyProfile = (dto: ProfileUpdateRequest): Promise<{
  userId: string;
  nickname: string;
  profileImageUrl?: string;
  bio?: string;
  followingCount: number;
  followerCount: number;
}> => {
  return axiosInstance.patch('/mypage', dto).then(res => res.data);
};

// ---------- 팔로우 ----------
export const getMyFollowings = (): Promise<PublicProfileDto[]> => {
  return axiosInstance.get('/mypage/followings').then(res => res.data);
};

export const getMyFollowers = (): Promise<PublicProfileDto[]> => {
  return axiosInstance.get('/mypage/followers').then(res => res.data);
};

// ---------- 콘텐츠 ----------

// ✅ 1. 최근 본 콘텐츠 (WatchHistory[])
export const getMypageWatchHistory = (): Promise<WatchHistory[]> => {
  return axiosInstance.get('/mypage/recent').then(res => res.data);
};

// ✅ 2. 찜한 콘텐츠 (Movie[])
export const getBookmarks = (): Promise<Movie[]> => {
  return axiosInstance.get('/mypage/bookmarks').then(res => res.data);
};

// ✅ 3. 좋아요한 콘텐츠 (Movie[])
export const getLiked = (): Promise<Movie[]> => {
  return axiosInstance.get('/mypage/liked').then(res => res.data);
};

// ✅ 4. 내가 쓴 리뷰 (Review[])
export const getReviews = (): Promise<Review[]> => {
  return axiosInstance.get('/mypage/reviews').then(res => res.data);
};

// ---------- 기타 ----------
export const getMoviesByIds = (ids: string[]): Promise<Movie[]> => {
  return axiosInstance.get('/movies', {
    params: { ids: ids.join(',') },
  }).then(res => res.data);
};
