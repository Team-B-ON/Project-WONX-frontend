import React from 'react';
import Banner from '@/components/Home/Banner';
import BoxOfficeMovieRow from '@/components/Home/BoxOffice/BoxOfficeMovieRow';
import HotTalkRow from '@/components/Home/HotTalk/HotTalkRow';
import ReviewCount from '@/components/Home/ReviewCount';
import { boxOfficeMovies } from '@/mocks/mockMovies';
import BoxOfficeMovieCard from '@/components/Home/BoxOffice/BoxOfficeMovieCard';
import MovieList from '@/components/Home/MovieList';
import { Movie } from '@/types/movie';


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
  const handlePlay = () => {
    console.log('재생 버튼 클릭');
  };

  const handleInfo = () => {
    console.log('상세 정보 버튼 클릭');
  };

  return (
    <div className="bg-black min-h-screen -mt-[68px]">
      <Banner
        title="드래곤 길들이기"
        rankText="오늘 시리즈 순위 2위"
        overview={`바이킹과 드래곤의 싸운이 끊이지 않는 버크섬,
                   바이킹 족장의 아들 히컵은 다친 드래곤 투슬리스를 구해준다.
                  그를 몰래 돌봐주며 드래곤들과 가까워진 히컵은 그들의 위험한 비밀을 알게 된다.
                  `}
        backdropUrl="https://an2-img.amz.wtchn.net/image/v2/N4Le6hDc4riRJ8sBDumrfQ.webp?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1USTRNSGczTWpCeE9EQWlYU3dpY0NJNklpOTJNaTl6ZEc5eVpTOXBiV0ZuWlM4eE1qRTVPREl4TlRFeU16STRNVEkxSW4wLlc0MDd3czNfUmNmaFZhNXpWLWVUcE9XSlBSaS16emc1ODlGd0N1cWhaVk0="
        onPlay={handlePlay}
        onInfo={handleInfo}
      />

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
