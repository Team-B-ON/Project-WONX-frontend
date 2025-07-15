import React, { useEffect, useState } from 'react';
import Banner from '@/components/Home/Banner';
import BoxOfficeMovieRow from '@/components/Home/BoxOffice/BoxOfficeMovieRow';
import HotTalkRow from '@/components/Home/HotTalk/HotTalkRow';
import ReviewCountBanner from '@/components/Home/ReviewCount';
import BoxOfficeMovieCard from '@/components/Home/BoxOffice/BoxOfficeMovieCard';
import MovieList from '@/components/Home/MovieList';

import {
  getMainBanner,
  getUpcomingMovies,
  getHotMovies,
  getHotTalks,
  getBoxOfficeMovies,
  getRecentWatchHistory,
  getContinueWatching,
  getRecommendedMovies,
  getReviewCount,
} from '@/services/api/HomePage/homeApi';

import { fetchMyUser } from '@/services/api/common/userApi';

import { MovieBanner } from '@/types/movieBanner';
import { HotMovie } from '@/types/hotMovie';
import { BoxOffice } from '@/types/boxOffice';
import { HotTalk } from '@/types/hotTalk';
import { WatchHistory } from '@/types/watchHistory';
import { User } from '@/types/user';

const Home = () => {
  const [bannerMovie, setBannerMovie] = useState<MovieBanner | null>(null);
  const [hotMovies, setHotMovies] = useState<HotMovie[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<MovieBanner[]>([]);
  const [boxOfficeMovies, setBoxOfficeMovies] = useState<BoxOffice[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<MovieBanner[]>([]);
  const [hotTalks, setHotTalks] = useState<HotTalk[]>([]);
  const [recentWatched, setRecentWatched] = useState<WatchHistory[]>([]);
  const [continueWatching, setContinueWatching] = useState<WatchHistory[]>([]);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getMainBanner().then(setBannerMovie).catch(console.error);
    getHotMovies(18).then(setHotMovies).catch(console.error);
    getRecommendedMovies().then(setRecommendedMovies).catch(console.error);
    getBoxOfficeMovies().then(setBoxOfficeMovies).catch(console.error);
    getUpcomingMovies().then(setUpcomingMovies).catch(console.error);
    getRecentWatchHistory().then(setRecentWatched).catch(console.error);
    getContinueWatching().then(setContinueWatching).catch(console.error);
    getReviewCount().then(setReviewCount).catch(console.error);
    getHotTalks()
      .then((data) => {
        if (Array.isArray(data)) setHotTalks(data);
        else {
          console.error("hotTalks API가 배열을 반환하지 않음:", data);
          setHotTalks([]);
        }
      })
      .catch((err) => {
        console.error("hotTalks API 호출 실패:", err);
        setHotTalks([]);
      });

    fetchMyUser()
      .then(setUser)
      .catch((err) => {
        console.error('사용자 정보 불러오기 실패:', err);
        setUser(null);
      });
  }, []);

  const convertedHotMovies = hotMovies.map((item) => ({
    id: item.id,
    title: item.title,
    posterUrl: item.posterUrl,
    description: "",
    rating: item.viewCount ?? 0,
    durationMinutes: 0,
    releaseDate: "",
    ageRating: "",
    bookmarked: false,
    liked: false,
  }));

  const convertedRecommendedMovies = recommendedMovies.map((item, idx) => ({
    id: item.id || String(idx),
    title: item.title,
    posterUrl: item.posterUrl,
    description: item.description || "",
    rating: item.rating || 0,
    durationMinutes: item.durationMinutes || 0,
    releaseDate: item.releaseDate || "",
    ageRating: item.ageRating || "",
    bookmarked: item.bookmarked || false,
    liked: item.liked || false,
  }));

  const convertedBoxOfficeMovies = boxOfficeMovies.map((item, idx) => ({
    id: item.id ?? String(idx),
    title: item.title,
    posterUrl: item.posterUrl,
    description: "",
    rating: 0,
    durationMinutes: 0,
    releaseDate: "",
    ageRating: "",
    bookmarked: false,
    liked: false,
  }));

  const convertedUpcomingMovies = upcomingMovies.map((item, idx) => ({
    id: item.id ?? String(idx),
    title: item.title,
    posterUrl: item.posterUrl,
    description: item.description || "",
    rating: item.rating || 0,
    durationMinutes: item.durationMinutes || 0,
    releaseDate: item.releaseDate || "",
    ageRating: item.ageRating || "",
    bookmarked: item.bookmarked || false,
    liked: item.liked || false,
  }));

  const convertWatchHistoriesToMovieBanner = (histories: WatchHistory[]): MovieBanner[] =>
    histories.map((item, idx) => ({
      id: item.videoId || String(idx),
      title: item.movie?.title || "제목 없음",
      posterUrl: item.movie?.posterUrl || "",
      description: item.movie?.description || "",
      rating: item.movie?.rating || 0,
      durationMinutes: item.movie?.durationMinutes || 0,
      releaseDate: item.movie?.releaseDate || "",
      ageRating: item.movie?.ageRating || "",
      bookmarked: false,
      liked: false,
    }));

  const handlePlay = () => console.log('재생 버튼 클릭');
  const handleInfo = () => console.log('상세 정보 버튼 클릭');

  return (
    <div className="bg-black min-h-screen -mt-[68px]">
      {bannerMovie && (
        <Banner
          title={bannerMovie.title}
          rankText="오늘 시리즈 순위 2위"
          overview={bannerMovie.description}
          backdropUrl={bannerMovie.backdropUrl || bannerMovie.posterUrl}
          onPlay={handlePlay}
          onInfo={handleInfo}
        />
      )}

      <MovieList
        title="이어보기"
        movies={convertWatchHistoriesToMovieBanner(continueWatching)}
        useCustomSlider
      />

      <MovieList
        title="최근 본 콘텐츠"
        movies={convertWatchHistoriesToMovieBanner(recentWatched)}
        useCustomSlider
      />

      <MovieList title="WONX 인기 콘텐츠" movies={convertedHotMovies} useCustomSlider />

      <MovieList
        title={`${user?.nickname || '당신'}님이 좋아할 만한 콘텐츠`}
        movies={convertedRecommendedMovies}
        useCustomSlider
      />

      <BoxOfficeMovieRow
        title="박스오피스 TOP10"
        movies={convertedBoxOfficeMovies}
        renderItem={(movie) => <BoxOfficeMovieCard key={movie.id} movie={movie} />}
      />

      <BoxOfficeMovieRow
        title="개봉 예정작"
        movies={convertedUpcomingMovies}
        renderItem={(movie) => <BoxOfficeMovieCard key={movie.id} movie={movie} />}
      />

      <HotTalkRow title="지금 뜨는 핫톡🔥" hotTalks={hotTalks} onClickMore={() => {}} />

      <ReviewCountBanner reviewCount={reviewCount} />
    </div>
  );
};

export default Home;
