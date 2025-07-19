import React, { useState } from "react";
import { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type MovieSliderProps = {
  movies: Movie[];
};

const MovieSlider = ({ movies }: MovieSliderProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const cardsPerPage = 6;
  const totalPages = Math.ceil(movies.length / cardsPerPage);
  const [direction, setDirection] = useState(0);

  const currentMovies = movies.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );
  const shouldCenter = currentMovies.length === cardsPerPage;

  const handleNext = () => {
    setDirection(1);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div
      className="relative w-full min-h-[240px]" // ✅ hover 감지 범위 확보
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 왼쪽 버튼 */}
      {currentPage > 0 && isHovered && (
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-opacity-70 text-white p-2"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
      )}

      {/* 슬라이드 카드 영역 */}
      <div className={`flex gap-x-3 ${shouldCenter ? 'justify-center' : 'justify-start'} min-h-[120px] relative h-[130px]`}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            initial={{ x: direction > 0 ? 400 : -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -400 : 400, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 40,
              duration: 0.83,
            }}
            className="flex gap-x-3"
          >
            {currentMovies.map((movie, idx) => {
              const globalIndex = currentPage * cardsPerPage + idx;
              const isFirst = globalIndex % cardsPerPage === 0;
              const isLast = (globalIndex + 1) % cardsPerPage === 0;

              return (
                <div
                  key={movie.id}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative w-[217.91px] h-[100%]"
                >
                  <div className={`absolute top-0 left-0 w-full h-full transition-transform duration-200 ease-in-out ${
                      hoveredIndex === idx ? "scale-[1.15] z-20" : "scale-100 z-0"
                    }`}
                    style={{ transformOrigin: "center top" }}
                  >
                    <MovieCard
                      movie={movie}
                      isFirst={isFirst}
                      isLast={isLast}
                    />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 오른쪽 버튼 */}
      {currentPage < totalPages - 1 && isHovered && (
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-opacity-70 text-white p-2"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      )}
    </div>
  );
};

export default MovieSlider;
