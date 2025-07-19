import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '@/components/Home/MovieList';
import { Movie } from '@/types/movie';
import { Review } from '@/types/review';
import { User } from '@/types/user';

import {
  searchMoviesByTitle,
  searchMoviesByGenre,
  searchMoviesByPerson,
  searchReviewsByContent,
} from '@/services/api/SearchPage/SearchApi';
import { fetchMyUser } from '@/services/api/common/userApi';
import SearchReviewsList from '@/components/Search/SearchReviewsList';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [user, setUser] = useState<User | null>(null);
  const [moviesByTitle, setMoviesByTitle] = useState<Movie[]>([]);
  const [moviesByGenre, setMoviesByGenre] = useState<Movie[]>([]);
  const [moviesByPerson, setMoviesByPerson] = useState<Movie[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (!query) return;

    // 검색 실행
    searchMoviesByTitle(query).then(setMoviesByTitle).catch(console.error);
    searchMoviesByGenre(query).then(setMoviesByGenre).catch(console.error);
    searchMoviesByPerson(query).then(setMoviesByPerson).catch(console.error);
    searchReviewsByContent(query).then(setReviews).catch(console.error);
    fetchMyUser().then(setUser).catch(console.error);
  }, [query]);

  return (
    <div className="bg-black min-h-screen text-white pt-[68px] px-6 pb-20 space-y-12">
      <h2 className="text-2xl font-bold">"{query}" 검색 결과</h2>

      {/* 영화 제목으로 검색 */}
      {moviesByTitle.length > 0 && (
        <MovieList
          title="제목으로 찾은 콘텐츠"
          movies={moviesByTitle}
          useCustomSlider
        />
      )}

      {/* 장르로 검색 */}
      {moviesByGenre.length > 0 && (
        <MovieList
          title="장르로 찾은 콘텐츠"
          movies={moviesByGenre}
          useCustomSlider
        />
      )}

      {/* 감독/배우로 검색 */}
      {moviesByPerson.length > 0 && (
        <MovieList
          title="인물로 찾은 콘텐츠"
          movies={moviesByPerson}
          useCustomSlider
        />
      )}

      {/* 리뷰로 검색 */}
      {reviews.length > 0 && (
        <SearchReviewsList
          title="리뷰에서 찾은 콘텐츠"
          reviews={reviews}
        />
      )}
    </div>
  );
};

export default SearchPage;
