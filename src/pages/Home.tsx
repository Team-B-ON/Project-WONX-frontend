import React, { useEffect, useState } from 'react';
import Banner from '@/components/Home/Banner';
import BoxOfficeMovieRow from '@/components/Home/BoxOffice/BoxOfficeMovieRow';
import HotTalkRow from '@/components/Home/HotTalk/HotTalkRow';
import ReviewCount from '@/components/Home/ReviewCount';
import { boxOfficeMovies } from '@/mocks/mockMovies';
import TopNaviBar from '@/components/common/TopNavBar';
import BoxOfficeMovieCard from '@/components/Home/BoxOffice/BoxOfficeMovieCard';
import MovieList from '@/components/Home/MovieList';
import { Movie } from '@/types/movie';
import { getMainBanner } from '@/services/Home/homeApi';


const dummyMovies: Movie[] = Array.from({ length: 18 }, (_, idx) => ({
  id: `${idx + 1}`,
  title: `영화 ${idx + 1}`,
  posterUrl:
    'https://occ-0-3097-993.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABV4CF2PBJ2cLwMao0g2JGonHwyfwofN3t5ue5E8BN8RsgEyzeD09PV4jr5QcmlTdksokq_-yHM9FeNw6e7jhdJZ0ys0ypDsnSpw.webp?r=35c',
  description: '테스트용 설명',
  durationMinutes: 120 + idx,
  releaseDate: '2022-01-01',
  ageRating: '15세 이상 관람가',
  genre: ['SF', '액션', '코미디'].slice(0, (idx % 3) + 1),
}))

const Home = () => {

  const [bannerMovie, setBannerMovie] = useState<Movie | null>(null);

  useEffect(() => {
    console.log("API BASE:", import.meta.env.VITE_API_BASE_URL);
    getMainBanner()
      .then((data) => setBannerMovie(data))
      .catch(console.error);
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

      <MovieList title="WONX 인기 콘텐츠" movies={dummyMovies} useCustomSlider />
      <MovieList title="박스오피스" movies={dummyMovies} useCustomSlider />


      <BoxOfficeMovieRow
      title="박스오피스 TOP 10"
      movies={boxOfficeMovies}
      renderItem={(movie) => <BoxOfficeMovieCard key={movie.id} movie={movie} />}
      onClickMore={() => { /* 전체 박스오피스 페이지 이동 등 */ }}
/>

      <BoxOfficeMovieRow
        title="개봉 예정작"
        movies={boxOfficeMovies}
        renderItem={(movie) => <BoxOfficeMovieCard key={movie.id} movie={movie} />}
      />

      <HotTalkRow
        title="지금 뜨는 핫톡🔥"
        movies={dummyMovies}
        onClickMore={() => { /* 전체 핫톡 페이지로 이동 등 */ }}
      />

      <ReviewCount reviewCount={1555555266} />
    </div>
  );
};

export default Home;
