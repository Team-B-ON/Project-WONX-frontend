import React from 'react';
import { MovieSummary } from '@/types/movieSummary';
import MovieCard from './MovieCard';

type HotCardProps = {
  movie: MovieSummary;
  rank: number;
  isFirst?: boolean;
  isLast?: boolean;
};

const HotCard = ({ movie, rank, isFirst, isLast }: HotCardProps) => {
  return (
    <div className="relative w-[217.91px]">
      {/* 랭킹 숫자 */}
      <div className="absolute -left-[20px] top-1 text-[90px] font-black text-white opacity-10 z-0 select-none leading-[1]">
        {rank}
      </div>

      {/* 포스터 이미지 */}
      <MovieCard 
        movie={movie} 
        isFirst={isFirst}
        isLast={isLast}
      />

      {/* 하단 라벨 (선택) */}
      <div className="absolute bottom-1 left-1 bg-red-600 text-white text-xs px-2 py-0.5 rounded font-bold z-10">
        지금 핫해요
      </div>
    </div>
  );
};

export default HotCard;
