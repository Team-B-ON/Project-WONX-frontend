import MovieSlider from '@/components/common/MovieSlider';

const dummyMovies = [
  {
    id: '1', title: '영화1',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  },
  {
    id: '2', title: '영화2',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
 },
  {
    id: '3', title: '영화3',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
 },
  {
    id: '4', title: '영화4',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
 },
  {
    id: '5', title: '영화5',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  },
  {
    id: '6', title: '영화6',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  },
  {
    id: '7', title: '영화7',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  },
  {
    id: '8', title: '영화8',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  },
  {
    id: '9', title: '영화9',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  },
  {
    id: '10', title: '영화10',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  },
  {
    id: '11', title: '영화11',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  },
  {
    id: '12', title: '영12',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  },
  {
    id: '13', title: '영13',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  },
  {
    id: '14', title: '영14',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  },
  {
    id: '15', title: '영15',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  },
  {
    id: '16', title: '영16',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  },
  {
    id: '17', title: '영17',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  },
  {
    id: '18', title: '영18',
    posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
 },
];

const TestPage = () => {
  return (
    <div className="bg-white min-h-screen overflow-visible">
      <MovieSlider movies={dummyMovies} />
    </div>
  );
};

export default TestPage;
