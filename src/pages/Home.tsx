import React, { useEffect, useState } from 'react';
import Banner from '@/components/Home/Banner';
import MovieList from '@/components/Home/MovieList';
import ReviewCountBanner from '@/components/Home/ReviewCount';
import HotMoviesList from '@/components/Home/HotMoviesList';
import PopularReviewsList from '@/components/Home/PopularReviewsList';

import {
  getMainBanner,
  getHotMovies,
  getHotTalks,
  getRecentWatchHistory,
  getRecommendedMovies,
  getReviewCount,
} from '@/services/api/HomePage/homeApi';
import { fetchMyUser } from '@/services/api/common/userApi';
import { getMovieById } from '@/services/api/MovieDetailsPage/movie';
import { MovieSummary } from '@/types/movieSummary';
import { WatchHistory } from '@/types/watchHistory';
import { Review } from '@/types/review';
import { Movie } from '@/types/movie';
import { User } from '@/types/user';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const [bannerMovie, setBannerMovie] = useState<Movie | null>(null);
  const [hotMovies, setHotMovies] = useState<MovieSummary[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<MovieSummary[]>([]);
  const [recentWatched, setRecentWatched] = useState<WatchHistory[]>([]);
  const [popularReviews, setPopularReviews] = useState<Review[]>([]);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  // 북마크 변경 콜백
  const handleBookmarkUpdate = (movieId: string, newState: boolean) => {
    setHotMovies(prev =>
      prev.map(m =>
        m.movieId === movieId ? { ...m, isBookmarked: newState } : m
      )
    );
    setRecommendedMovies(prev =>
      prev.map(m =>
        m.movieId === movieId
          ? { ...m, isBookmarked: newState }
          : m
      )
    );
    setRecentWatched(prev =>
      prev.map(item =>
        item.movie.id === movieId
          ? { ...item, movie: { ...item.movie, isBookmarked: newState } }
          : item
      )
    );
  };

  const handleLikeUpdate = (movieId: string, newState: boolean) => {
    setHotMovies(prev =>
      prev.map(m =>
        m.movieId === movieId ? { ...m, isLiked: newState } : m
      )
    );
    setRecommendedMovies(prev =>
      prev.map(m =>
        m.movieId === movieId ? { ...m, isLiked: newState } : m
      )
    );
    setRecentWatched(prev =>
      prev.map(item =>
        item.movie.id === movieId
          ? { ...item, movie: { ...item.movie, isLiked: newState } }
          : item
      )
    );
  };

  useEffect(() => {
    getMainBanner()
      .then((summary) => {
        if (!summary?.movieId) return;

        // 상세 정보 요청
        getMovieById(summary.movieId).then((movieDetail) => {
          setBannerMovie(movieDetail);
        });
      })
      .catch(console.error);

    getHotMovies().then(setHotMovies).catch(console.error);
    getHotTalks().then(setPopularReviews).catch(console.error);
    getRecommendedMovies().then(setRecommendedMovies).catch(console.error);
    getRecentWatchHistory().then(setRecentWatched).catch(console.error);
    getReviewCount().then(setReviewCount).catch(console.error);
    fetchMyUser().then(setUser).catch(console.error);
  }, []);

  const convertSummaryToMovie = (summary: MovieSummary): Movie => ({
    id: summary.movieId,
    title: summary.title,
    posterUrl: summary.posterUrl,
    bookmarked: summary.bookmarked,
    liked: summary.liked,
    ageRating: summary.ageRating,
    durationMinutes: summary.durationMinutes,
    genres: summary.genres,
  });

  const convertedRecommended: Movie[] = recommendedMovies.map(convertSummaryToMovie);
  const convertedRecentWatched: Movie[] = recentWatched.map((item) => {
    const raw = item.movie;

    return {
      id: raw.id || raw.movieId || "", // ✅ 무조건 id 채우기
      title: raw.title,
      posterUrl: raw.posterUrl,
      bookmarked: raw.bookmarked,
      liked: raw.liked,
      ageRating: raw.ageRating,
      durationMinutes: raw.durationMinutes,
      genres: raw.genres,
    };
  });

  return (
    <div className="bg-black min-h-screen -mt-[68px]">
      {/* 1. 배너 */}
      {bannerMovie && (
        <Banner
          title={bannerMovie.title}
          rankText="이어서 감상해보세요" // 고정 문구 or 상태로 설정
          overview={bannerMovie.description}
          backdropUrl={bannerMovie.mainImg}
          onPlay={() => console.log('재생')}
          movie={bannerMovie}
        />
      )}

      {/* 2. 최근 본 콘텐츠 */}
      {convertedRecentWatched.length > 0 && (
        <MovieList
          title="최근 본 콘텐츠"
          movies={convertedRecentWatched}
          useCustomSlider
          backgroundLocation={location}
          onToggleBookmark={handleBookmarkUpdate}
          onToggleLike={handleLikeUpdate}
        />
      )}

      {/* 3. 인기 콘텐츠 */}
      <HotMoviesList 
        title="WONX 인기 콘텐츠" 
        movies={hotMovies} 
        onToggleBookmark={handleBookmarkUpdate}
        onToggleLike={handleLikeUpdate}
      />

      {/* 4. 추천 콘텐츠 */}
      <MovieList
        title={`${user?.nickname || '당신'}님이 좋아할 만한 콘텐츠`}
        movies={convertedRecommended}
        useCustomSlider
        onToggleBookmark={handleBookmarkUpdate}
        onToggleLike={handleLikeUpdate}
      />

      {/* 5. 인기 리뷰 */}
      <PopularReviewsList 
        title="지금 인기 있는 리뷰" 
        reviews={popularReviews}
      />

      {/* 6. 리뷰 카운트 */}
      <ReviewCountBanner reviewCount={reviewCount} />
    </div>
  );
};

export default Home;
