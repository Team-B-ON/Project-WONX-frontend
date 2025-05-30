import React from 'react';
import Banner from '@/components/Home/Banner';
import { Movie } from '@/types/movie';
import PopularMovieRow from '@/components/Home/PopularMovieRow';
import BoxOfficeMovieRow from '@/components/Home/BoxOffice/BoxOfficeMovieRow';
import HotTalkRow from '@/components/Home/HotTalk/HotTalkRow';
import ReviewCount from '@/components/Home/ReviewCount';

// 인기 콘텐츠 + 사용자 추천 임시 더미
const popularMovies: Movie[] = [
  {
    id: '1',
    title: '이터널 선샤인',
    releaseDate: '2004-03-19',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  },
  {
    id: '2',
    title: '인셉션',
    releaseDate: '2010-07-16',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  },
  {
    id: '3',
    title: '라라랜드',
    releaseDate: '2016-12-09',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  },
  {
    id: '4',
    title: '라라랜드',
    releaseDate: '2016-12-09',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  },
  {
    id: '5',
    title: '라라랜드',
    releaseDate: '2016-12-09',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  },
  {
    id: '6',
    title: '라라랜드',
    releaseDate: '2016-12-09',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  },
  {
    id: '7',
    title: '라라랜드',
    releaseDate: '2016-12-09',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  },
  {
    id: '8',
    title: '라라랜드',
    releaseDate: '2016-12-09',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  },
  {
    id: '9',
    title: '라라랜드',
    releaseDate: '2016-12-09',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  },
  {
    id: '10',
    title: '라라랜드',
    releaseDate: '2016-12-09',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  },
  {
    id: '11',
    title: '라라랜드',
    releaseDate: '2016-12-09',
    posterUrl: 'https://via.placeholder.com/300x450?text=La+La+Land',
  },
  {
    id: '12',
    title: '라라랜드',
    releaseDate: '2016-12-09',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  },
];

// 박스 오피스 + 개봉 예정작 임시 더미
const boxOfficeMovies: Movie[] = [
  {
    id: '1',
    title: '범죄도시4',
    posterUrl: 'https://via.placeholder.com/300x450?text=범죄도시4',
    releaseDate: '2024-04-15',
    durationMinutes: 120,
    genre: ['액션', '범죄'],
  },
  {
    id: '2',
    title: '쿵푸팬더4',
    posterUrl: 'https://via.placeholder.com/300x450?text=쿵푸팬더4',
    releaseDate: '2024-03-01',
    durationMinutes: 95,
    genre: ['애니메이션', '모험'],
  },
  {
    id: '3',
    title: '파묘',
    posterUrl: 'https://via.placeholder.com/300x450?text=파묘',
    releaseDate: '2024-02-22',
    durationMinutes: 110,
    genre: ['공포', '미스터리'],
  },
  {
    id: '4',
    title: '파묘',
    posterUrl: 'https://via.placeholder.com/300x450?text=파묘',
    releaseDate: '2024-02-22',
    durationMinutes: 110,
    genre: ['공포', '미스터리'],
  },
  {
    id: '5',
    title: '파묘',
    posterUrl: 'https://via.placeholder.com/300x450?text=파묘',
    releaseDate: '2024-02-22',
    durationMinutes: 110,
    genre: ['공포', '미스터리'],
  },
  {
    id: '6',
    title: '파묘',
    posterUrl: 'https://via.placeholder.com/300x450?text=파묘',
    releaseDate: '2024-02-22',
    durationMinutes: 110,
    genre: ['공포', '미스터리'],
  },
  {
    id: '7',
    title: '파묘',
    posterUrl: 'https://via.placeholder.com/300x450?text=파묘',
    releaseDate: '2024-02-22',
    durationMinutes: 110,
    genre: ['공포', '미스터리'],
  },
  {
    id: '8',
    title: '파묘',
    posterUrl: 'https://via.placeholder.com/300x450?text=파묘',
    releaseDate: '2024-02-22',
    durationMinutes: 110,
    genre: ['공포', '미스터리'],
  },
  {
    id: '9',
    title: '파묘',
    posterUrl: 'https://via.placeholder.com/300x450?text=파묘',
    releaseDate: '2024-02-22',
    durationMinutes: 110,
    genre: ['공포', '미스터리'],
  },
  {
    id: '10',
    title: '파묘',
    posterUrl: 'https://via.placeholder.com/300x450?text=파묘',
    releaseDate: '2024-02-22',
    durationMinutes: 110,
    genre: ['공포', '미스터리'],
  },
  {
    id: '11',
    title: '파묘',
    posterUrl: 'https://via.placeholder.com/300x450?text=파묘',
    releaseDate: '2024-02-22',
    durationMinutes: 110,
    genre: ['공포', '미스터리'],
  },
  {
    id: '12',
    title: '파묘',
    posterUrl: 'https://via.placeholder.com/300x450?text=파묘',
    releaseDate: '2024-02-22',
    durationMinutes: 110,
    genre: ['공포', '미스터리'],
  },
];

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
      <PopularMovieRow title="WONX 인기 콘텐츠" movies={popularMovies} />
      <PopularMovieRow title="@@@님이 좋아할만한 작품"movies={popularMovies} />
      <BoxOfficeMovieRow title="박스오피스 TOP 10" movies={boxOfficeMovies} />
      <BoxOfficeMovieRow title="개봉 예정작" movies={boxOfficeMovies} />
      <HotTalkRow title="지금 뜨는 핫톡🔥" movies={popularMovies} />
      <ReviewCount reviewCount={1555555266} />
    </div>
  );
};

export default Home;
