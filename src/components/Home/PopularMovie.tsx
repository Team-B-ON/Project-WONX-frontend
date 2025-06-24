import React from 'react';
import { Movie } from '@/types/movie';
import MovieSlider from '../common/MovieSlider';

type Props = {
  movies: Movie[];
  title: string;
};

const PopularMovie = ({ movies, title }: Props) => {
  return (
    <section className="pt-6 pb-10 space-y-4 overflow-visible">
      {/* 제목에 카드 여백과 같은 padding 적용 */}
      <h2 className="text-white text-2xl font-bold px-6 sm:px-8 md:px-12">
        {title}
      </h2>

      {/* 슬라이더 */}
      <MovieSlider movies={movies} />
    </section>
  );
};

export default PopularMovie;
