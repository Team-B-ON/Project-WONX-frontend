import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '@/types/movie';
import HotTalkCard from './HotTalkCard';
import MovieTag from '@/components/common/MovieTag';

interface Props {
  title: string;
  movies: Movie[];
  onClickMore?: () => void; // 추가
  showMore?: boolean;       // 추가(선택)
}

export default function HotTalkRow({
  title,
  movies,
  onClickMore,
  showMore = true,
}: Props) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!rowRef.current) return;
    const { scrollLeft, clientWidth } = rowRef.current;
    const offset = dir === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
    rowRef.current.scrollTo({ left: offset, behavior: 'smooth' });
  };

  return (
    <div className="space-y-2 px-6 sm:px-10 lg:px-20 py-10 relative">
      <MovieTag title={title} onClickMore={onClickMore} showMore={showMore} />

      <div className="group relative">
        {/* 왼쪽 화살표 */}
        <button
          className="absolute left-0 top-0 bottom-0 z-50 hidden group-hover:block bg-black/50 px-2"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* 카드 슬라이더 */}
        <div
          ref={rowRef}
          className="flex overflow-x-scroll scrollbar-hide scroll-smooth snap-x snap-mandatory pr-8"
        >
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className={`
                snap-start 
                px-0 
                flex-shrink-0 
                min-w-full 
                sm:min-w-[50%] 
                md:min-w-[33.3333%] 
                relative 
                z-10 
                ${index === movies.length - 1 ? 'mr-0' : 'mr-4'}
              `}
            >
              <div className="transition-transform duration-300 hover:scale-105 hover:z-50 relative">
                <HotTalkCard movie={movie} />
              </div>
            </div>
          ))}
        </div>

        {/* 오른쪽 화살표 */}
        <button
          className="absolute right-0 top-0 bottom-0 z-50 hidden group-hover:block bg-black/50 px-2"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
