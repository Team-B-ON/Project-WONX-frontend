import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '@/types/movie';
import PopularMovieCard from './PopularMovieCard';

interface Props {
  title: string;
  movies: Movie[];
}

export default function PopularMovieRow({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!rowRef.current) return;
    const { scrollLeft, clientWidth } = rowRef.current;
    const offset = dir === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
    rowRef.current.scrollTo({ left: offset, behavior: 'smooth' });
  };

  return (
    <div className="space-y-2 px-6 sm:px-10 lg:px-20 py-10">
      <h2 className="text-white text-2xl font-bold">{title}</h2>

      <div className="group relative">
        <button
          className="absolute left-0 top-0 bottom-0 z-40 hidden group-hover:block bg-black/50 px-2"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <div
  ref={rowRef}
  className="flex space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth"
>
  {movies.map((movie) => (
  <div
    key={movie.id}
    className="flex-shrink-0 w-[217.91px] relative group/card"
  >
    <div
      className="relative transition-transform duration-300 group-hover/card:scale-100 hover:scale-110 hover:z-50"
    >
      <PopularMovieCard movie={movie} />
    </div>
  </div>
))}
</div>

        <button
          className="absolute right-0 top-0 bottom-0 z-40 hidden group-hover:block bg-black/50 px-2"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
