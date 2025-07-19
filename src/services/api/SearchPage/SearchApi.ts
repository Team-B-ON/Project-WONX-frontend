// src/services/api/SearchPage/SearchApi.ts

import axiosInstance from '../index';
import type { Movie } from '@/types/movie';
import type { Review } from '@/types/review';

// ---------- 영화 검색 ----------

// 1. 제목으로 영화 검색 (정렬 옵션: relevance | rating | release)
export const searchMoviesByTitle = (
  query: string,
  sort: 'relevance' | 'rating' | 'release' = 'relevance'
): Promise<Movie[]> => {
  return axiosInstance.get('/search/movies', {
    params: { query, sort },
  }).then(res => res.data);
};

// 2. 장르로 영화 검색 (정렬 포함)
export const searchMoviesByGenre = (
  query: string,
  sort: 'relevance' | 'rating' | 'release' = 'relevance'
): Promise<Movie[]> => {
  return axiosInstance.get('/search/genres', {
    params: { query, sort },
  }).then(res => res.data);
};

// 3. 인물로 영화 검색 (정렬 포함)
export const searchMoviesByPerson = (
  query: string,
  sort: 'relevance' | 'rating' | 'release' = 'relevance'
): Promise<Movie[]> => {
  return axiosInstance.get('/search/people', {
    params: { query, sort },
  }).then(res => res.data);
};

// ---------- 리뷰 검색 ----------

// 4. 리뷰 내용 검색 (초성 대응 포함)
export const searchReviewsByContent = (
  query: string
): Promise<Review[]> => {
  return axiosInstance.get('/search/reviews', {
    params: { query },
  }).then(res => res.data);
};

// ---------- 자동완성 ----------

// 5. 제목 자동완성
export const autocompleteMovieTitles = (
  query: string
): Promise<string[]> => {
  return axiosInstance.get('/search/autocomplete/movies', {
    params: { query },
  }).then(res => res.data);
};

// 6. 인물 자동완성
export const autocompletePeople = (
  query: string
): Promise<string[]> => {
  return axiosInstance.get('/search/autocomplete/people', {
    params: { query },
  }).then(res => res.data);
};

// 7. 장르 자동완성
export const autocompleteGenres = (
  query: string
): Promise<string[]> => {
  return axiosInstance.get('/search/autocomplete/genres', {
    params: { query },
  }).then(res => res.data);
};

// 8. 리뷰 자동완성
export const autocompleteReviews = (
  query: string
): Promise<string[]> => {
  return axiosInstance.get('/search/autocomplete/reviews', {
    params: { query },
  }).then(res => res.data);
};
