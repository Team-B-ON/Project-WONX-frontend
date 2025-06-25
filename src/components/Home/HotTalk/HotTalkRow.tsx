import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '@/types/movie';
import HotTalkCard from './HotTalkCard';

interface Props {
  title: string;
  movies: Movie[];
}

export default function HotTalkRow({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!rowRef.current) return;
    const { scrollLeft, clientWidth } = rowRef.current;
    const offset = dir === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
    rowRef.current.scrollTo({ left: offset, behavior: 'smooth' });
  };

  return (
    <div className="space-y-2 px-6 sm:px-10 lg:px-20 py-10 relative min-h-[250px]">
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
      style={{
        flex: '0 0 calc((100% - (16px * 2)) / 3)', // 3등분
      }}
      className="relative transition-transform duration-300 hover:scale-105 z-0"
    >
      <HotTalkCard movie={movie} />
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
