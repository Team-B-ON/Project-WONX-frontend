import React from 'react';
import { Movie } from '@/types/movie';
import MovieCard from '../common/MovieCard';

type Props = {
  movies: Movie[];
};

const RecommendedMovie = ({ movies }: Props) => {
  return (
    <section className="px-6 pt-6 pb-10 space-y-4">
      {/* 섹션 제목 */}
      <h2 className="text-white text-2xl font-bold">@@@님이 좋아할만한 작품</h2>

      {/* 슬라이드 */}
      <div className="flex overflow-x-auto gap-4 scroll-smooth scrollbar-hide">
        {movies.map((movie) => (
          <div key={movie.id} className="flex-shrink-0 w-[220px]">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedMovie;
