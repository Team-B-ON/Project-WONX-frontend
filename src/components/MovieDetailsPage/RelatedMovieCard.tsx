import { useState } from "react";
import type { Movie } from "@/types/movie";
import { formatDuration } from "@/utils/timeFormat";
import { getYearFromDate } from "@/utils/getYearFromDate";
import ageRating15 from '@/assets/MovieDetailsPage/15-age-rating.png';
import addButton from '@/assets/common/buttons/add-button.svg';
import addHoveredButton from '@/assets/common/buttons-hovered/add-btn.svg';
import bookmarkButton from '@/assets/MovieDetailsPage/bookmark-check-btn.svg';
import bookmarkHoveredButton from '@/assets/MovieDetailsPage/bookmark-check-hovered.svg';
import playButton from '@/assets/common/buttons/play-btn-on-video.svg';

type RelatedMovieCardProps = {
    movie: Movie;
};

const RelatedMovieCard = ({movie}: RelatedMovieCardProps) => {
    const [isAddHovered, setIsAddHovered] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    return (
        <div className="group w-[237.48px] h-[363.6px] bg-[#2f2f2f] rounded-[4px] overflow-hidden text-white cursor-pointer">
        {/* 포스터 */}
        <div className="relative">
            <img src={movie.posterUrl} alt="영화 썸네일" className="w-full h-[133.7px] object-cover" />
            {/* 그라데이션 오버레이 */}
            <div
                className="absolute top-0 right-0 w-full h-full pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(to left bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0) 30%)`
                }}
            />
            {/* 재생 시간 */}
            <span className="absolute top-[6.684px] right-[11.866px] text-[16px] whitespace-nowrap font-normal">
                {formatDuration(movie.durationMinutes ?? 0)}
            </span>
            {/* 호버링 재생 버튼 */}
            <img
                src={playButton}
                alt="재생"
                className="absolute top-1/2 left-1/2 w-[47px] h-[47px]
                            -translate-x-1/2 -translate-y-1/2
                            opacity-0 group-hover:opacity-100 
                            transition-opacity duration-300 ease-in-out 
                            z-20"
            />
        </div>
        {/* 영화 정보 영역 */}
        <div className="flex items-center p-[16px] justify-between">
            <div className="flex items-center space-x-[14px]">
                <img src={ageRating15} alt="상영 등급" className="h-[32px] w-[32px]" />
                <span className="text-[#bcbcbc]">{getYearFromDate(movie?.releaseDate)}</span>
            </div>
            <img
                src={
                    isBookmarked
                    ? (isAddHovered ? bookmarkHoveredButton : bookmarkButton)
                    : (isAddHovered ? addHoveredButton : addButton)
                } 
                className="cursor-pointer w-[40px] h-[40px] bg-[#2f2f2f]"
                onMouseEnter={() => setIsAddHovered(true)}
                onMouseLeave={() => setIsAddHovered(false)} 
                onClick={() => setIsBookmarked(prev => !prev)}
            />
        </div>
            <p className="px-[14px] pb-[14px] text-[#d2d2d2] text-[14px] whitespace-pre-wrap">
                {movie.description}
            </p>
        </div>
    );
};

export default RelatedMovieCard;