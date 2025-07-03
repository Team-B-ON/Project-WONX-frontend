import React, { useEffect, useState } from 'react';
import Banner from '@/components/Home/Banner';
import BoxOfficeMovieRow from '@/components/Home/BoxOffice/BoxOfficeMovieRow';
import HotTalkRow from '@/components/Home/HotTalk/HotTalkRow';
import ReviewCount from '@/components/Home/ReviewCount';
import TopNaviBar from '@/components/common/TopNavBar';
import BoxOfficeMovieCard from '@/components/Home/BoxOffice/BoxOfficeMovieCard';
import MovieList from '@/components/Home/MovieList';
import { Movie } from '@/types/movie';
import { getBoxOfficeMovies, getHotMovies, getHotTalks, getMainBanner, getRecommendedMovies, getUpcomingMovies } from '@/services/Home/homeApi';
import { HotMovie } from '@/types/hotMovie';
import { BoxOfficeMovie } from '@/types/BoxOfficeMovie';
import { HotTalk } from '@/types/HotTalk';




const Home = () => {

  // 배너 연동
  const [bannerMovie, setBannerMovie] = useState<Movie | null>(null);

  useEffect(() => {
    console.log("API BASE:", import.meta.env.VITE_API_BASE_URL);
    getMainBanner()
      .then((data) => setBannerMovie(data))
      .catch(console.error);
  }, []);

  // 인기 콘텐츠 연동
  const [hotMovies, setHotMovies] = useState<HotMovie[]>([]);
  
  useEffect(() => {
    getHotMovies(18)
      .then(setHotMovies)
      .catch(console.error);
  }, []);

  const convertedHotMovies: Movie[] = Array.isArray(hotMovies)
  ? hotMovies.map((item, idx) => ({
      id: String(idx),
      title: item.title,
      posterUrl: item.posterUrl,
      description: "",
      rating: 0,
      durationMinutes: 0,
      releaseDate: "",
      ageRating: "",
      bookmarked: false,
      liked: false,
    }))
  : [];


  // 추천 콘텐츠 연동
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getRecommendedMovies()
      .then(setRecommendedMovies)
      .catch(console.error);
  }, []);

  // 배열 변환해서 넘김 -> map()은 배열에만 쓸 수 있지만, 보장이 없음
  const convertedRecommendedMovies: Movie[] = Array.isArray(recommendedMovies)
  ? recommendedMovies.map((item, idx) => ({
      id: item.id || String(idx),   // 혹시 id 없을 경우 idx로 대체
      title: item.title,
      posterUrl: item.posterUrl,
      description: item.description || "",
      rating: item.rating || 0,
      durationMinutes: item.durationMinutes || 0,
      releaseDate: item.releaseDate || "",
      ageRating: item.ageRating || "",
      bookmarked: item.bookmarked || false,
      liked: item.liked || false,
    }))
    : [];
  
  // 박스오피스 연동
  const [boxOfficeMovies, setBoxOfficeMovies] = useState<BoxOfficeMovie[]>([]);
  
  useEffect(() => {
    getBoxOfficeMovies()
      .then(setBoxOfficeMovies)
      .catch(console.error);
  }, []);

  // 박스오피스 Movie[]로 변환
  const convertedBoxOfficeMovies: Movie[] = Array.isArray(boxOfficeMovies)
    ? boxOfficeMovies.map((item, idx) => ({
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
      }))
  : [];

  // 개봉 예정작 연동 
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
    useEffect(() => {
      getUpcomingMovies().then(setUpcomingMovies).catch(console.error);
  }, []);

  const convertedUpcomingMovies: Movie[] = Array.isArray(upcomingMovies)
  ? upcomingMovies.map((item, idx) => ({
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
    }))
  : [];

  // 지금 뜨는 리뷰 연동
  const [hotTalks, setHotTalks] = useState<HotTalk[]>([]);

    useEffect(() => {
    getHotTalks()
      .then((data) => {
        if (Array.isArray(data)) {
          setHotTalks(data);
        } else {
          console.error("hotTalks API가 배열을 반환하지 않음:", data);
          setHotTalks([]);
        }
      })
      .catch((err) => {
        console.error("hotTalks API 호출 실패:", err);
        setHotTalks([]); // 에러 시에도 안전하게 빈 배열
      });
  }, []);
  
  const handlePlay = () => {
    console.log('재생 버튼 클릭');
  };

  const handleInfo = () => {
    console.log('상세 정보 버튼 클릭');
  };

  return (
    <div className="bg-black min-h-screen">
      <TopNaviBar />

      {bannerMovie && (
      <Banner
        title={bannerMovie.title}
        rankText="오늘 시리즈 순위 2위"
        overview={bannerMovie.description}
        backdropUrl={bannerMovie.posterUrl}
        onPlay={handlePlay}
        onInfo={handleInfo}
      />
      )}

      <MovieList
        title="WONX 인기 콘텐츠"
        movies={convertedHotMovies}
        useCustomSlider
      />

      <MovieList
        title="@@@님이 좋아할 만한 콘텐츠"
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

      <HotTalkRow
        title="지금 뜨는 핫톡🔥"
        hotTalks={hotTalks}
        onClickMore={() => { /* 전체 핫톡 페이지로 이동 */ }}
      />

      <ReviewCount reviewCount={1555555266} />
    </div>
  );
};

export default Home;
