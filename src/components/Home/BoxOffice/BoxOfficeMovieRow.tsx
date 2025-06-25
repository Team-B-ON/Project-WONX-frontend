import { JSX, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '@/types/movie';

interface Props {
  title: string;                     // 섹션 제목
  movies: Movie[];                  // 표시할 영화 리스트
  renderItem: (movie: Movie) => JSX.Element; // 각 영화마다 렌더링할 카드 컴포넌트
}

export default function BoxOfficeMovieRow({ title, movies, renderItem }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);

  // 좌우 스크롤 함수
  const scroll = (dir: 'left' | 'right') => {
    if (!rowRef.current) return;
    const { scrollLeft, clientWidth } = rowRef.current;
    const offset = dir === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
    rowRef.current.scrollTo({ left: offset, behavior: 'smooth' });
  };

  return (
    <div className="space-y-2 px-6 sm:px-10 lg:px-20 py-10 relative min-h-[360px]">
      {/* 제목 */}
      <h2 className="text-white text-2xl font-bold">{title}</h2>

      {/* 슬라이드 영역 */}
      <div className="group relative">
        {/* 왼쪽 화살표 */}
        <button
          className="absolute left-0 top-0 bottom-0 z-40 hidden group-hover:block bg-black/50 px-2"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* 영화 카드 리스트 */}
        <div
          ref={rowRef}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth items-start relative min-h-[360px]"
        >
          {movies.map((movie) => renderItem(movie))}
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
