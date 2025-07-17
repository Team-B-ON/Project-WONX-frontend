import React, { useState } from "react";
import { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";
import { motion, AnimatePresence } from "framer-motion"; // 슬라이드 효과 구현을 위해
import { ChevronLeft, ChevronRight } from "lucide-react";

// 영화 리스트를 슬라이드처럼 페이지별로 보여줌
type MovieSliderProps = {
  movies: Movie[];
};

const MovieSlider = ({ movies }: MovieSliderProps) => {
  // 현재 페이지 번호 (0부터 시작)
  const [currentPage, setCurrentPage] = useState(0);
  // 마우스 올린 카드 인덱스 (호버된 카드만 커지도록)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  
  // 한 페이지에 보여줄 카드 수 (여기선 6장)
  const cardsPerPage = 6;
  // 전체 페이지 수 (영화 수에 따라 자동 계산)
  const totalPages = Math.ceil(movies.length / cardsPerPage);

  // 왼쪽, 오른쪽 구분을 위한 방향값 추가
  const [direction, setDirection] = useState(0);

  // 현재 페이지에 보여줄 영화만 잘라내기 (0-5, 6-11 이런식으로)
  const currentMovies = movies.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  // 오른쪽(다음) 버튼 눌렀을 때 - 마지막 페이지를 넘지 않게
  const handleNext = () => {
    setDirection(1);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  // 왼쪽(이전) 버튼 눌렀을 때 - 0페이지보다 더 앞으로 못 가게
  const handlePrev = () => {
    setDirection(-1);
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };
    
  return (
    
    <div className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* 왼쪽(이전) 버튼 - 첫 페이지(0)일 땐 숨김 */}
      {currentPage > 0 && isHovered &&(
        <button
          onClick={handlePrev}
          className="absolute left-0 top-0 bottom-0 z-[1100] bg-black/50 hover:bg-opacity-70 text-white p-2"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
      )}

      {/* 카드 슬라이드 영역 - 한 페이지 분량만 보임 */}
      <div className="flex gap-x-3 justify-center min-h-[120px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            initial={{ x: direction > 0 ? 400 : -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -400 : 400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 40, duration: 0.83 }}
            className="flex gap-x-3 justify-center w-full"
            style={{ position: "absolute" }}
          >
            {currentMovies.map((movie, idx) => {
              const globalIndex = currentPage * cardsPerPage + idx;
              const isFirst = globalIndex % cardsPerPage === 0;
              const isLast = (globalIndex + 1) % cardsPerPage === 0;
              return (
                <div
                key={movie.id}
                onMouseEnter={() => setHoveredIndex(idx)} // 호버 시 현재 인덱스 기록
                onMouseLeave={() => setHoveredIndex(null)} // 호버 해제 시 초기화
                className={`flex-shrink-0 w-[217.91px]${ // 호버된 카드만 확대 & z-index 높임
                  hoveredIndex === idx ? 'scale-[1.15] z-1000' : 'scale-100 z-0' // 아니면 기본 크기
                  }`}
                >
                  {/* 카드 실제 컨텐츠 */}
                <div className="relative">
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

      {/* 오른쪽(다음) 버튼 - 마지막 페이지면 숨김 */}
      {currentPage < totalPages - 1 && isHovered &&(
        <button
          onClick={handleNext}
          className="absolute right-0 top-0 bottom-0 z-[1100] bg-black/50 hover:bg-opacity-70 text-white p-2"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      )}
    </div>
  );
};

export default MovieSlider;