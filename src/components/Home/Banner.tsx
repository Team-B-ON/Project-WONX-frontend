import React from 'react';
import playIcon from '@/assets/common/buttons/play-button.svg';
import infoIcon from '@/assets/common/buttons/arrowdown-button.svg';

type BannerProps = {
  title: string;
  overview: string;
  backdropUrl: string;
  rankText?: string; // 옵션: 오늘 시리즈 순위 등
};

const Banner = ({ title, overview, backdropUrl, rankText }: BannerProps) => {
  return (
    <div
      className="relative w-full h-[80vh] md:h-[100vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${backdropUrl})` }}
    >
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* 텍스트 콘텐츠 */}
      <div className="absolute top-[20%] md:top-[28%] left-4 right-0 px-6 md:px-18 space-y-4 md:space-y-6 text-white max-w-2xl">
        {/* 제목 */}
        <h2 className="text-3xl md:text-6xl font-bold mb-4 md:mb-10">{title}</h2>

        {/* 랭킹 뱃지 (선택) */}
        {rankText && (
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-red-600 text-[10px] md:text-xs font-extrabold text-white rounded flex flex-col items-center justify-center leading-tight">
              <span>TOP</span>
              <span>10</span>
            </div>
            <span className="text-lg md:text-2xl font-semibold">{rankText}</span>
          </div>
        )}

        {/* 개요 */}
        <p className="text-sm md:text-lg mt-4 md:mt-8 line-clamp-3">{overview}</p>

        {/* 버튼 */}
        <div className="flex flex-wrap gap-3 md:space-x-4 py-4">
          <button className="flex items-center px-3 md:px-4 py-2 bg-white text-black font-semibold rounded">
            <img src={playIcon} alt="Play" className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            재생
          </button>
          <button className="flex items-center px-3 md:px-4 py-2 bg-gray-700 bg-opacity-70 text-white font-semibold rounded">
            <img src={infoIcon} alt="Info" className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            상세 정보
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
