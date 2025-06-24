import React, { useRef, useState, useEffect } from "react";
import { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";

type MovieSliderProps = {
  movies: Movie[];
};

const MovieSlider = ({ movies }: MovieSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const cardsPerPage = 6;
  const cardWidth = 217.91;
  const gap = 16;
  const totalPages = Math.ceil(movies.length / cardsPerPage);

  const scrollToPage = (page: number) => {
    if (!sliderRef.current) return;
    const scrollLeft = (cardWidth + gap) * cardsPerPage * page;
    sliderRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
  };

  const handleNext = () => {
    const nextPage = Math.min(currentPage + 1, totalPages - 1);
    setCurrentPage(nextPage);
  };

  const handlePrev = () => {
    const prevPage = Math.max(currentPage - 1, 0);
    setCurrentPage(prevPage);
  };

  useEffect(() => {
    scrollToPage(currentPage);
  }, [currentPage]);

  return (
    <div className="relative w-full">
      {/* 왼쪽 버튼 */}
      {currentPage > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30
            bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded transition"
        >
          ◀
        </button>
      )}

      {/* 카드 리스트 */}
      <div
        ref={sliderRef}
        className="flex gap-x-4 overflow-x-auto scroll-smooth px-6 sm:px-8 md:px-12 [&::-webkit-scrollbar]:hidden"
      >
        {movies.map((movie, idx) => {
          const start = currentPage * cardsPerPage;
          const end = start + cardsPerPage;
          const hoverable = idx >= start && idx < end;

          return (
            <div
              key={movie.id}
              className={`flex-shrink-0 w-[217.91px] relative transition-all duration-300 ${
                hoverable ? "" : "pointer-events-none"
              }`}
            >
              <div className="relative z-0 hover:z-[999] transition-all duration-300">
                <MovieCard movie={movie} />
              </div>
            </div>
          );
        })}
      </div>

      {/* 오른쪽 버튼 */}
      {currentPage < totalPages - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30
            bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded transition"
        >
          ▶
        </button>
      )}
    </div>
  );
};

export default MovieSlider;
