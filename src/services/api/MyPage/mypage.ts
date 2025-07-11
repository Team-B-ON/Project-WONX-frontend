// src/services/api/mypage.ts
import api from '../index';
import type { Movie } from '@/types/movie';
import { Review } from '@/types/review';
import type { PublicProfileDto } from '@/types/profile'

export interface UserProfile {
  nickname: string;
  followingCount: number;
  followerCount: number;
  profileImageUrl?: string;
}

export type MovieItem = Movie;

// 내 프로필 조회
export async function getMyProfile(): Promise<UserProfile> {
  const { data } = await api.get('/mypage');
  return {
    nickname: data.nickname,
    followingCount: data.followingCount,
    followerCount: data.followerCount,
  };
}

// ids: UUID[] → Movie[]
export async function getMoviesByIds(ids: string[]): Promise<Movie[]> {
  // 백엔드가 `/api/videos?ids=1,2,3` 형태로 받도록 만들었다면:
  const { data } = await api.get(`/movies`, {
    params: { ids: ids.join(',') }
  });
  return data as Movie[];
}

export async function getMyFollowings(): Promise<PublicProfileDto[]> {
  const { data } = await api.get('/mypage/followings')
  return data
}

export async function getMyFollowers(): Promise<PublicProfileDto[]> {
  const { data } = await api.get('/mypage/followers')
  return data
}

export interface ProfileUpdateRequest {
  nickname?: string
  bio?: string
  profileImageUrl?: string
}
export async function updateMyProfile(dto: ProfileUpdateRequest) {
  const { data } = await api.patch<{
    userId: string
    nickname: string
    profileImageUrl?: string
    bio?: string
    followingCount: number
    followerCount: number
  }>('/mypage', dto)
  return data
}

// 최근 시청
export function getRecent(): Promise<Movie[]> {
  return api.get('/mypage/recent').then(r => r.data);
}

// 이어 보기
export function getProgress(): Promise<Movie[]> {
  return api.get('/mypage/progress').then(r => r.data);
}

// 찜
export function getBookmarks(): Promise<Movie[]> {
  return api.get('/mypage/bookmarks').then(r => r.data);
}

// 좋아요
export function getLiked(): Promise<Movie[]> {
  return api.get('/mypage/liked').then(r => r.data);
}

// 리뷰
export function getReviews(): Promise<Review[]> {
  return api.get('/mypage/reviews').then(r => r.data);
}
