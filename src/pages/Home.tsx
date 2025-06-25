import React from 'react';
import Banner from '@/components/Home/Banner';
import BoxOfficeMovieRow from '@/components/Home/BoxOffice/BoxOfficeMovieRow';
import HotTalkRow from '@/components/Home/HotTalk/HotTalkRow';
import ReviewCount from '@/components/Home/ReviewCount';
import { popularMovies, boxOfficeMovies } from '@/mocks/mockMovies';
import TopNaviBar from '@/components/common/TopNavBar';
import BoxOfficeMovieCard from '@/components/Home/BoxOffice/BoxOfficeMovieCard';
import MovieListRow from '@/components/Home/MovieList';

const Home = () => {
  const handlePlay = () => {
    console.log('재생 버튼 클릭');
  };

  const handleInfo = () => {
    console.log('상세 정보 버튼 클릭');
  };

  return (
    <div className="bg-black min-h-screen">
      <TopNaviBar />

      <Banner
        title="아바타: 물의 길"
        rankText="오늘 시리즈 순위 2위"
        overview={`<아바타: 물의 길>은 판도라 행성에서
'제이크 설리'와 '네이티리'가 이룬 가족이 겪게 되는 무자비한 위협과
살아남기 위해 떠나야 하는 긴 여정과 전투,
그리고 견뎌내야 할 상처에 대한 이야기`}
        backdropUrl="https://image.tmdb.org/t/p/original/8rpDcsfLJypbO6vREc0547VKqEv.jpg"
        onPlay={handlePlay}
        onInfo={handleInfo}
      />

      <MovieListRow title="WONX 인기 콘텐츠" movies={popularMovies} useCustomSlider />
<MovieListRow title="@@@님이 좋아할만한 작품" movies={popularMovies} useCustomSlider />


      <BoxOfficeMovieRow
        title="박스오피스 TOP 10"
        movies={boxOfficeMovies}
        renderItem={(movie) => <BoxOfficeMovieCard key={movie.id} movie={movie} />}
      />
      <BoxOfficeMovieRow
        title="개봉 예정작"
        movies={boxOfficeMovies}
        renderItem={(movie) => <BoxOfficeMovieCard key={movie.id} movie={movie} />}
      />

      <HotTalkRow title="지금 뜨는 핫톡🔥" movies={popularMovies} />

      <ReviewCount reviewCount={1555555266} />
    </div>
  );
};

export default Home;
