import { JSX, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '@/types/movie';

interface Props {
  title: string;
  movies: Movie[];
  renderItem: (movie: Movie) => JSX.Element;
}

export default function BoxOfficeMovieRow({ title, movies, renderItem }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!rowRef.current) return;
    const { scrollLeft, clientWidth } = rowRef.current;
    const offset = dir === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
    rowRef.current.scrollTo({ left: offset, behavior: 'smooth' });
  };

  return (
    <div className="space-y-2 px-6 sm:px-10 lg:px-20 py-10 relative min-h-[360px]">
      <h2 className="text-white text-2xl font-bold">{title}</h2>

      <div className="group relative">
        {/* 왼쪽 화살표 */}
        <button
          className="absolute left-0 top-0 bottom-0 z-40 hidden group-hover:block bg-black/50 px-2"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* 카드 슬라이더 */}
        <div
          ref={rowRef}
          className="flex overflow-x-scroll scrollbar-hide scroll-smooth items-start space-x-4 "
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="
                flex-shrink-0
                w-[calc((100%-1rem)/2)]
                sm:w-[calc((100%-2rem)/3)]
                lg:w-[calc((100%-5rem)/6)]
              "
            >
              {renderItem(movie)}
            </div>
          ))}
        </div>

        {/* 오른쪽 화살표 */}
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
