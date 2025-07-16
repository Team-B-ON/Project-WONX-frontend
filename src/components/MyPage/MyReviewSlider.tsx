// src/components/MyPage/MyReviewSlider.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MyReviewCard from "./MyReviewCard";
import type { Movie } from "@/types/movie";
import type { Review } from "@/types/review";

type MyReviewSliderProps = {
  movies: Movie[];
  reviews: Review[];
};

export default function MyReviewSlider({
                                         movies,
                                         reviews,
                                       }: MyReviewSliderProps) {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(0);
  const [hovered, setHovered] = useState(false);

  const perPage = 6;
  const total = Math.ceil(movies.length / perPage);
  const cur = movies.slice(page * perPage, (page + 1) * perPage);

  // id 기준으로 리뷰 찾기
  const reviewMap = Object.fromEntries(
    reviews.map(r => [r.movieId, r])
  );

  const next = () => {
    setDir(1);
    setPage(p => Math.min(p + 1, total - 1));
  };
  const prev = () => {
    setDir(-1);
    setPage(p => Math.max(p - 1, 0));
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {page > 0 && hovered && (
        <button onClick={prev} className="...">{/* ChevronLeft */}</button>
      )}
      <div className="flex overflow-hidden">
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={page}
            custom={dir}
            initial={{ x: dir > 0 ? 400 : -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: dir > 0 ? -400 : 400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="flex gap-x-3"
            style={{ position: "absolute" }}
          >
            {cur.map((m, idx) => {
              const first = page * perPage + idx === 0;
              const last = (page + 1) * perPage === movies.length;
              return (
                <MyReviewCard
                  key={m.id}
                  movie={m}
                  review={reviewMap[m.id]}
                  isFirst={first}
                  isLast={last}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
      {page < total - 1 && hovered && (
        <button onClick={next} className="...">{/* ChevronRight */}</button>
      )}
    </div>
  );
}
