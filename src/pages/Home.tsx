import React from 'react';
import Banner from '@/components/Home/Banner';

// 지금은 임시로 하드코딩한 배너 콘텐츠를 보여줌
// 나중에 박스오피스 1위 영화 데이터를 백엔드에서 받아와서 아래 props에 넣을 예정
const Home = () => {
  return (
    <div className="bg-black">
      {/* 현재는 더미(임시) 데이터로 배너 표시 */}
      <Banner
        title="아바타: 물의 길"
        rankText="오늘 시리즈 순위 2위"
        overview="<아바타: 물의 길>은 판도라 행성에서
                    '제이크 설리'와 '네이티리'가 이룬 가족이 겪게 되는 무자비한 위협과
                    살아남기 위해 떠나야 하는 긴 여정과 전투,
                    그리고 견뎌내야 할 상처에 대한 이야기"
        backdropUrl="https://image.tmdb.org/t/p/original/8rpDcsfLJypbO6vREc0547VKqEv.jpg"
      />
    </div>
  );
};

export default Home;
