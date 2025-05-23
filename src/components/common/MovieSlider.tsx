import React, { useRef, useState, useEffect } from "react";
import { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";

type MovieSliderProps = {
  movies: Movie[];
};

const MovieSlider = ({ movies }: MovieSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isCardHovered, setIsCardHovered] = useState(false);

  const cardsPerPage = 6;
  const totalPages = Math.ceil(movies.length / cardsPerPage);

  const scrollToPage = (page: number) => {
    if (!sliderRef.current) return;

    const cardWidth = 217.91 + 16; // 카드 너비 + gap (px 단위 조정 가능)
    const scrollLeft = cardWidth * cardsPerPage * page;
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
          className={`absolute left-4 top-[35px] z-20
           bg-black bg-opacity-50
           text-white p-2
           transition-opacity duration-100 ${
             isCardHovered ? "opacity-0" : "opacity-100"
           }`}
        >
          ◀
        </button>
      )}

      {/* 카드 리스트 */}
      <div
        ref={sliderRef}
        className="flex gap-x-4 overflow-x-auto scroll-smooth px-19 [&::-webkit-scrollbar]:hidden"
      >
        {movies.map((movie, idx) => {
          const start = currentPage * cardsPerPage;
          const end = start + cardsPerPage;
          const hoverable = idx >= start && idx < end;
          return (
            <div
              key={movie.id}
              className={`flex-shrink-0 w-[217.91px] relative ${hoverable ? "" : "pointer-events-none"}`}
              onMouseEnter={() => setIsCardHovered(true)}
              onMouseLeave={() => setIsCardHovered(false)}
            >
              <div className="hover:z-50 relative transition-all duration-300 hover:delay-0 delay-300">
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
          className={`absolute right-4 top-[35px] z-20
           bg-black bg-opacity-50
           text-white p-2
           transition-opacity duration-100 ${
             isCardHovered ? "opacity-0" : "opacity-100"
           }`}
        >
          ▶
        </button>
      )}
    </div>
  );
};

export default MovieSlider;