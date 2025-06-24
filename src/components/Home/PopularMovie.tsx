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
      {/* 좌우 여백 통일 */}
      <div className="px-6 sm:px-10 lg:px-20 space-y-4">
        <h2 className="text-white text-2xl font-bold">{title}</h2>
        <MovieSlider movies={movies} />
      </div>
    </section>
  );
};

export default PopularMovie;
