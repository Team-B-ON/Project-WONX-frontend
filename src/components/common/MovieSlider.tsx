import React, { useState } from "react";
import { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";

type MovieSliderProps = {
  movies: Movie[];
};

const MovieSlider = ({ movies }: MovieSliderProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const cardsPerPage = 6;
  const cardWidth = 217.91;
  const gap = 16;
  const totalPages = Math.ceil(movies.length / cardsPerPage);

  const offsetX = (cardWidth + gap) * cardsPerPage * currentPage;

  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const handlePrev = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 0));

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 왼쪽 버튼 */}
      {currentPage > 0 && isHovered && (
        <button
          onClick={handlePrev}
          className="absolute left-0 top-0 bottom-0 z-[1000] bg-black/50 hover:bg-opacity-70 text-white p-2"
        >
          ◀
        </button>
      )}

      {/* 슬라이더 래퍼 (overflow-visible 유지) */}
      <div className="relative overflow-visible">
        <div
          className="flex gap-x-4 transition-transform duration-500 ease-in-out will-change-transform"
          style={{ transform: `translateX(-${offsetX}px)` }}
        >
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`flex-shrink-0 w-[217.91px] transition-transform duration-300 ${
                hoveredIndex === index ? "scale-[1.15] z-10" : "scale-100 z-0"
              }`}
            >
              <div className="relative">
                <MovieCard movie={movie} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 오른쪽 버튼 */}
      {currentPage < totalPages - 1 && isHovered && (
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
