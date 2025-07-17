import React, { useEffect, useState } from 'react';
import Banner from '@/components/Home/Banner';
import MovieList from '@/components/Home/MovieList';
import ReviewCountBanner from '@/components/Home/ReviewCount';
import HotMoviesRow from '@/components/Home/HotMoviesRow';
import PopularReviewsRow from '@/components/Home/PopularReviewsRow';

import {
  getMainBanner,
  getHotMovies,
  getRecentWatchHistory,
  getRecommendedMovies,
  getReviewCount,
} from '@/services/api/HomePage/homeApi';
import { fetchMyUser } from '@/services/api/common/userApi';

import { MovieSummary } from '@/types/movieSummary';
import { WatchHistory } from '@/types/watchHistory';
import { Review } from '@/types/review';
import { Movie } from '@/types/movie';
import { User } from '@/types/user';

const Home = () => {
  const [bannerMovie, setBannerMovie] = useState<Movie | null>(null);
  const [hotMovies, setHotMovies] = useState<MovieSummary[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<MovieSummary[]>([]);
  const [recentWatched, setRecentWatched] = useState<WatchHistory[]>([]);
  const [popularReviews, setPopularReviews] = useState<Review[]>([]);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getMainBanner().then(setBannerMovie).catch(console.error);
    getHotMovies().then(setHotMovies).catch(console.error);
    getRecommendedMovies().then(setRecommendedMovies).catch(console.error);
    getRecentWatchHistory().then(setRecentWatched).catch(console.error);
    getReviewCount().then(setReviewCount).catch(console.error);
    fetchMyUser().then(setUser).catch(console.error);
  }, []);

  const convertSummaryToMovie = (summary: MovieSummary): Movie => ({
    id: summary.movieId,
    title: summary.title,
    posterUrl: summary.posterUrl,
    isBookmarked: summary.isBookmarked,
    isLiked: summary.isLiked,
    ageRating: summary.ageRating,
    durationMinutes: summary.durationMinutes,
    genres: summary.genres,
  });

  const convertedHotMovies: Movie[] = hotMovies.map(convertSummaryToMovie);
  const convertedRecommended: Movie[] = recommendedMovies.map(convertSummaryToMovie);
  const convertedRecentWatched: Movie[] = recentWatched.map((item) => ({
    ...item.movie,
    id: item.movie.id,
    title: item.movie.title,
    posterUrl: item.movie.posterUrl,
    mainImg: item.movie.mainImg,
    isBookmarked: item.movie.isBookmarked,
    isLiked: item.movie.isLiked,
    ageRating: item.movie.ageRating,
    durationMinutes: item.movie.durationMinutes,
  }));

  return (
    <div className="bg-black min-h-screen -mt-[68px]">
      {/* 1. 배너 */}
      {bannerMovie && (
        <Banner
          title={bannerMovie.title}
          rankText="오늘 시리즈 순위 2위"
          overview={''}
          backdropUrl={bannerMovie.mainImg}
          onPlay={() => console.log('재생')}
          movie={bannerMovie}
        />
      )}

      {/* 2. 최근 본 콘텐츠 */}
      <MovieList
        title="최근 본 콘텐츠"
        movies={convertedRecentWatched}
        useCustomSlider
      />

      {/* 3. 인기 콘텐츠 */}
      <HotMoviesRow title="WONX 인기 콘텐츠" movies={convertedHotMovies} />

      {/* 4. 인기 리뷰 */}
      <PopularReviewsRow title="지금 인기 있는 리뷰" reviews={popularReviews} />

      {/* 5. 추천 콘텐츠 */}
      <MovieList
        title={`${user?.nickname || '당신'}님이 좋아할 만한 콘텐츠`}
        movies={convertedRecommended}
        useCustomSlider
      />

      {/* 6. 리뷰 카운트 */}
      <ReviewCountBanner reviewCount={reviewCount} />
    </div>
  );
};

export default Home;
