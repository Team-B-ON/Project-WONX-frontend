// components/common/ReviewSlider.tsx
import React, { useState } from "react";
import { Review } from "@/types/review";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReviewCard from "./ReviewCard";

type ReviewSliderProps = {
  reviews: Review[];
};

const ReviewSlider = ({ reviews }: ReviewSliderProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);

  const cardsPerPage = 4;
  const totalPages = Math.ceil(reviews.length / cardsPerPage);

  const currentReviews = reviews.slice(
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
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {currentPage > 0 && isHovered && (
        <button
          onClick={handlePrev}
          className="absolute left-0 top-0 bottom-0 z-[20] bg-black/50 hover:bg-opacity-70 text-white p-2"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
      )}

      <div className="flex gap-x-3 justify-center min-h-[200px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            initial={{ x: direction > 0 ? 400 : -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -400 : 400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="flex gap-x-4 justify-center w-full"
            style={{ position: "absolute" }}
          >
            {currentReviews.map((review, idx) => (
              <div
                key={review.reviewId}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`flex-shrink-0 w-[300px] transition-transform duration-200 ${
                  hoveredIndex === idx ? "scale-[1.03] z-10" : "scale-100 z-0"
                }`}
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {currentPage < totalPages - 1 && isHovered && (
        <button
          onClick={handleNext}
          className="absolute right-0 top-0 bottom-0 z-[20] bg-black/50 hover:bg-opacity-70 text-white p-2"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      )}
    </div>
  );
};

export default ReviewSlider;
