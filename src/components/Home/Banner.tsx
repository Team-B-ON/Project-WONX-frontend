import React from 'react';
import infoIcon from '@/assets/common/buttons/arrowdown-button.svg';
import PlayVideoBtn from '../common/PlayVideoBtn';
import InfoBtn from '../common/InfoBtn';
import { Movie } from '@/types/movie';

type BannerProps = {
  title: string;
  overview: string;
  backdropUrl: string;
  rankText?: string;
  onPlay?: () => void;
  onInfo?: () => void;
  movie: Movie;
};

const Banner = ({
  title,
  overview,
  backdropUrl,
  rankText,
  onPlay,
  onInfo,
  movie,
}: BannerProps) => {
  return (
    <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-[100vh] overflow-hidden">
      {/* 배경 이미지 */}
      <img
        src={backdropUrl}
        alt={title}
        className="absolute inset-0 object-cover w-full h-full z-0"
      />

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* 콘텐츠 */}
      <div className="absolute top-[36%] sm:top-[20%] md:top-[28%] left-4 right-0 px-4 sm:px-6 md:px-12 lg:px-20 max-w-[90%] md:max-w-3xl space-y-3 sm:space-y-4 md:space-y-6 text-white">
        {/* 제목 */}
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold leading-tight">
          {title}
        </h2>

        {/* 랭킹 뱃지 */}
        {rankText && (
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-red-600 text-[10px] sm:text-xs font-extrabold text-white rounded flex flex-col items-center justify-center leading-tight">
              <span>TIME</span>
              <span>TO</span>
            </div>
            <span className="text-sm sm:text-base md:text-xl font-semibold">{rankText}</span>
          </div>
        )}

        {/* 설명 */}
        <p className="text-xs sm:text-sm md:text-lg whitespace-pre-line line-clamp-4">
          {overview}
        </p>

        {/* 버튼 */}
          <div className="flex flex-wrap gap-2 sm:gap-3 pt-2 sm:pt-4">
            <PlayVideoBtn />
            <InfoBtn movie={movie} />
          </div>
      </div>
    </div>
  );
};

export default Banner;
