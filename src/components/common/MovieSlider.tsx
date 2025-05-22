import React, { useRef } from 'react';
import type { Movie } from '@/types/movie';
import MovieCard from './MovieCard';

type MovieSliderProps = {
  movies: Movie[];
};

const MovieSlider = ({ movies }: MovieSliderProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const cardsPerPage = 6;
  const cardWidth = 217.91 + 8; // 카드 너비 + gap
  const sneakPeekRatio = 0.2;
  const maxVisibleCards = cardsPerPage + sneakPeekRatio * 2;
  const scrollAmount = cardWidth * cardsPerPage;

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-white py-8">
      <div
        className="mx-auto relative"
        style={{ maxWidth: `${cardWidth * maxVisibleCards}px` }}
      >
        {/* 왼쪽 버튼 */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-[40px] z-20
             bg-black bg-opacity-60 text-white px-3 py-2 
             hover:bg-opacity-80 rounded-full
             text-xl font-bold"
        >
          ◀
        </button>

        {/* 오른쪽 버튼 */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-[40px] z-20
             bg-black bg-opacity-60 text-white px-3 py-2 
             hover:bg-opacity-80 rounded-full
             text-xl font-bold"
        >
          ▶
        </button>

        {/* 슬라이더 트랙 */}
        <div
          ref={scrollRef}
          className="relative flex gap-x-2 overflow-x-auto scrollbar-hide scroll-smooth px-0"
        >
          {movies.map((movie, index) => {
            const isFirst = index === 0;
            const isLast = index === movies.length - 1;

            return (
              <div
                key={movie.id}
                className="relative flex-shrink-0 w-[217.91px] h-[351px] pointer-events-none"
              >
                <div
                  className={`
                    absolute top-0 left-0
                    w-fit h-fit
                    transition-transform duration-300
                    hover:scale-115 hover:z-10
                    pointer-events-auto
                    ${isFirst ? 'origin-left' : isLast ? 'origin-right' : 'origin-center'}
                  `}
                >
                  <MovieCard movie={movie} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieSlider;
