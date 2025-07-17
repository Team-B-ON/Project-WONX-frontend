import React from 'react';
import { MovieSummary } from '@/types/movieSummary';

type HotCardProps = {
  movie: MovieSummary;
  rank: number;
};

const HotCard = ({ movie, rank }: HotCardProps) => {
  return (
    <div className="relative w-[160px] sm:w-[180px] md:w-[200px]">
      {/* 랭킹 숫자 */}
      <div className="absolute -left-[25px] top-1 text-[100px] font-black text-white opacity-10 z-0 select-none leading-[1]">
        {rank}
      </div>

      {/* 포스터 이미지 */}
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full h-auto rounded-md z-10 relative"
      />

      {/* 하단 라벨 (선택) */}
      <div className="absolute bottom-1 left-1 bg-red-600 text-white text-xs px-2 py-0.5 rounded font-bold z-10">
        지금 핫해요
      </div>
    </div>
  );
};

export default HotCard;
