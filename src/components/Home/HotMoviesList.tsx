import { Movie } from '@/types/movie';

interface HotMoviesListProps {
  title: string;
  movies: Movie[];
}

const HotMoviesList = ({ title, movies }: HotMoviesListProps) => {
  return (
    <section className="pt-6 pb-10 space-y-4 overflow-visible text-white">
      <div className="px-6 sm:px-10 lg:px-20 space-y-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div>🔥 인기 순위 컴포넌트 (총 {movies.length}편)</div>
      </div>
    </section>
  );
};

export default HotMoviesList;
