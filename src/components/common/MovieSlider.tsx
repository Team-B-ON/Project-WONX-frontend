import React, { useRef, useState, useEffect } from "react";
import { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";

type MovieSliderProps = {
  movies: Movie[];
};

const MovieSlider = ({ movies }: MovieSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const cardsPerPage = 6;
  const cardWidth = 217.91;
  const gap = 16;
  const totalPages = Math.ceil(movies.length / cardsPerPage);

  const scrollToPage = (page: number) => {
    if (!sliderRef.current) return;
    const scrollLeft = (cardWidth + gap) * cardsPerPage * page;
    sliderRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
  };

  const handleNext = () => setCurrentPage(Math.min(currentPage + 1, totalPages - 1));
  const handlePrev = () => setCurrentPage(Math.max(currentPage - 1, 0));

  useEffect(() => {
    scrollToPage(currentPage);
  }, [currentPage]);

  return (
    <div className="relative w-full">
      {/* 왼쪽 버튼 */}
      {currentPage > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-0 top-0 bottom-0 z-[1000] bg-black/50 hover:bg-opacity-70 text-white p-2"
        >
          ◀
        </button>
      )}

      {/* 슬라이더 래퍼 */}
      <div className="relative overflow-visible">
        <div
          ref={sliderRef}
          className="flex gap-x-4 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden"
        >
          {movies.map((movie, index) => {

            return (
              <div
                key={movie.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`flex-shrink-0 w-[217.91px] transition-transform duration-300 ${
                  hoveredIndex === index ? 'scale-[1.15] z-10' : 'scale-100 z-0'
                }`}
              >
                <div className="relative">
                  <MovieCard movie={movie} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 오른쪽 버튼 */}
      {currentPage < totalPages - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-0 top-0 bottom-0 z-[1000] bg-black/50 hover:bg-opacity-70 text-white p-2"
        >
          ▶
        </button>
      )}
    </div>
  );
};

export default MovieSlider;
