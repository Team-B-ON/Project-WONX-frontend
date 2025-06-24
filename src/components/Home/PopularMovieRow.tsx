import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '@/types/movie';
import PopularMovieCard from './PopularMovieCard';

interface Props {
  title: string;
  movies: Movie[];
}

export default function PopularMovieRow({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

        {/* 스크롤바 숨김용 래퍼 */}
        <div className="relative overflow-hidden">
          <div
            ref={rowRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {movies.map((movie, index) => {
              const start = 0; // 만약 페이지 단위로 관리할 거면 currentPage * cardsPerPage 적용 가능
              const end = movies.length; // 지금은 전체 표시

              const hoverable = index >= start && index < end;

              return (
                <div
                  key={movie.id}
                  className={`flex-shrink-0 w-[217.91px] relative ${hoverable ? '' : 'pointer-events-none'}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className={`relative transition-transform duration-300 ${hoveredIndex === index ? 'scale-[1.15] z-50' : 'scale-100 z-0'
                      }`}
                  >
                    <PopularMovieCard movie={movie} />
                  </div>
                </div>
              );
            })}
          </div>
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
