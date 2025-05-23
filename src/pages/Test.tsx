import React from 'react';
import MovieSlider from '@/components/common/MovieSlider';
import type { Movie } from '@/types/movie';

// 더미 데이터
const dummyMovies: Movie[] = Array.from({ length: 18 }, (_, idx) => ({
  id: `${idx + 1}`,
  title: `영화 ${idx + 1}`,
  posterUrl: 'https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfrALyW4q-DVLqTxd1qWZIZfPhfvw6guHYjIOSvqRay5m2Il44bXxdI7UAsvyT81k9c6ICW5W4N6_HGPLxKAH_bASxaledc-szU.webp?r=e3c',
  description: '이것은 테스트용 더미 영화 설명입니다.',
  durationMinutes: 120 + idx,
  releaseDate: `2022-01-${(idx % 30 + 1).toString().padStart(2, '0')}`,
  ageRating: '15세 이상 관람가',
  genre: ['SF', '액션', '코미디'].slice(0, (idx % 3) + 1)
}));

const TestPage = () => {
  return (
    <div className="bg-white min-h-screen overflow-visible">
      <MovieSlider movies={dummyMovies} />
    </div>
  );
};

export default TestPage;