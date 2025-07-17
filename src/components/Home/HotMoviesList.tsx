import React from 'react';
import { MovieSummary } from '@/types/movieSummary';
import MovieTag from '../common/MovieTag';
import HotCard from '../common/HotCard';

type HotMoviesListProps = {
  title: string;
  movies: MovieSummary[]; // ✅ 수정
};

const HotMoviesList = ({ title, movies }: HotMoviesListProps) => {
  const topFive = movies.slice(0, 5);

  return (
    <section className="pt-6 pb-10 overflow-visible">
      <div className="px-6 sm:px-10 lg:px-20 space-y-4">
        <MovieTag title={title} />
        <div className="flex gap-6">
          {topFive.map((movie, index) => (
            <HotCard key={movie.movieId} movie={movie} rank={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotMoviesList;
