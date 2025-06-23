import React from 'react';
import Banner from '@/components/Home/Banner';
import PopularMovieRow from '@/components/Home/PopularMovieRow';
import BoxOfficeMovieRow from '@/components/Home/BoxOffice/BoxOfficeMovieRow';
import HotTalkRow from '@/components/Home/HotTalk/HotTalkRow';
import ReviewCount from '@/components/Home/ReviewCount';
import { popularMovies, boxOfficeMovies } from '@/mocks/mockMovies';

const Home = () => {
  const handlePlay = () => {
    console.log('🔁 재생 버튼 클릭됨!');
    // 실제 재생 로직 또는 이동 구현
  };

  const handleInfo = () => {
    console.log('ℹ️ 상세 정보 버튼 클릭됨!');
    // 상세 페이지 이동 or 모달 띄우기
  };

  return (
    <div className="bg-black">
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

      <PopularMovieRow title="WONX 인기 콘텐츠" movies={popularMovies} />

      {/* TODO: 실제 사용자 맞춤 추천이 들어오면 해당 데이터로 교체 */}
      <PopularMovieRow title="@@@님이 좋아할만한 작품" movies={popularMovies} />

      <BoxOfficeMovieRow title="박스오피스 TOP 10" movies={boxOfficeMovies} />
      <BoxOfficeMovieRow title="개봉 예정작" movies={boxOfficeMovies} />

      <HotTalkRow title="지금 뜨는 핫톡🔥" movies={popularMovies} />

      <ReviewCount reviewCount={1555555266} />
    </div>
  );
};

export default Home;
