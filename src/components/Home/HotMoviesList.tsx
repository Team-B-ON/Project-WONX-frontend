import React, { useState } from 'react';
import { MovieSummary } from '@/types/movieSummary';
import MovieTag from '../common/MovieTag';
import HotCard from '../common/HotCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type HotMoviesListProps = {
  title: string;
  movies: MovieSummary[]; // ✅ 수정
};

const HotMoviesList = ({ title, movies }: HotMoviesListProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);

  const cardsPerPage = 5;
  const totalPages = Math.ceil(movies.length / cardsPerPage);

  const currentMovies = movies.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  const handleNext = () => {
    setDirection(1);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="pt-6 pb-10 overflow-visible">
      <div className="px-6 sm:px-10 lg:px-20 space-y-4">
        <MovieTag title={title} />

        <div
          className="relative w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* 왼쪽 버튼 */}
          {currentPage > 0 && isHovered && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-0 bottom-0 z-[20] bg-black/50 hover:bg-opacity-70 text-white p-2"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
          )}

          <div className="flex gap-x-3 justify-center min-h-[120px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentPage}
                custom={direction}
                initial={{ x: direction > 0 ? 400 : -400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -400 : 400, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 40,
                  duration: 0.83,
                }}
                className="flex gap-x-9 justify-center w-full"
                style={{ position: 'absolute' }}
              >
                {currentMovies.map((movie, idx) => {
                  const globalIndex = currentPage * cardsPerPage + idx;
                  const isFirst = globalIndex % cardsPerPage === 0;
                  const isLast = (globalIndex + 1) % cardsPerPage === 0;

                  return (
                    <div
                      key={movie.movieId}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className={`flex-shrink-0 w-[217.91px] mx-1 ${
                        hoveredIndex === idx ? 'scale-[1.15] z-10' : 'scale-100 z-0'
                      }`}
                    >
                      <div className="relative">
                        <HotCard
                          movie={movie}
                          rank={globalIndex + 1}
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
              className="absolute right-0 top-0 bottom-0 z-[20] bg-black/50 hover:bg-opacity-70 text-white p-2"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotMoviesList;
