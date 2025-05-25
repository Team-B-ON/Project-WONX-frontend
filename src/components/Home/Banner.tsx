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
      className="relative w-full h-[100vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${backdropUrl})` }}
    >
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* 텍스트 콘텐츠 */}
      <div className="absolute top-[28%] left-0 right-0 px-18 space-y-6 text-white max-w-2xl">
        
        {/* 제목 */}
        <h2 className="text-6xl font-bold mb-10">{title}</h2>

        {/* 랭킹 뱃지 (선택) */}
        {rankText && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 text-xs font-extrabold text-white rounded flex flex-col items-center justify-center leading-tight">
              <span>TOP</span>
              <span>10</span>
            </div>
            <span className="text-2xl font-semibold">{rankText}</span>
          </div>
        )}

        {/* 개요 */}
        <p className="text-lg mt-8 line-clamp-3">{overview}</p>

        {/* 버튼 */}
        <div className="flex space-x-4 py-4">
          <button className="flex items-center px-4 py-2 bg-white text-black font-semibold rounded">
            <img src={playIcon} alt="Play" className="w-5 h-5 mr-2" />
            재생
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-700 bg-opacity-70 text-white font-semibold rounded">
            <img src={infoIcon} alt="Info" className="w-5 h-5 mr-2" />
            상세 정보
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
