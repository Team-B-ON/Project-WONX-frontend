import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { Movie } from "@/types/movie";
import { formatDuration } from "@/utils/timeFormat";
import { getAgeRatingImage } from '@/utils/getAgeRatingImage';
import playButton from '@/assets/common/buttons/play-button.svg';
import addButton from '@/assets/common/buttons/add-button.svg';
import thumbUpButton from '@/assets/common/buttons/thumbup-button.svg';
import detailsButton from '@/assets/common/buttons/arrowdown-button.svg';
import playHoveredButton from '@/assets/common/buttons-hovered/play-btn-hover.svg'
import addHoveredButton from '@/assets/common/buttons-hovered/add-btn.svg';
import thumbUpHoveredButton from '@/assets/common/buttons-hovered/thumbup-btn.svg';
import detailsHoveredButton from '@/assets/common/buttons-hovered/arrowdown-btn.svg';
import bookmarkButton from '@/assets/MovieDetailsPage/bookmark-check-btn.svg';
import bookmarkHoveredButton from '@/assets/MovieDetailsPage/bookmark-check-hovered.svg';
import likeButton from '@/assets/MovieDetailsPage/thumbup-fill-btn.svg';
import likeHoveredButton from '@/assets/MovieDetailsPage/thumbup-fill-hovered.svg';
import { MovieSummary } from '@/types/movieSummary';
import { postBookmark, deleteBookmark } from '@/services/api/MovieDetailsPage/bookmark';
import { postLike, deleteLike } from '@/services/api/MovieDetailsPage/like';
import type { Location } from 'react-router-dom';

type MovieCardProps = {
    movie: Movie | MovieSummary;
    isFirst?: boolean;
    isLast?: boolean;
    onToggleBookmark?: (movieId: string, newState: boolean) => void;
    onToggleLike?: (movieId: string, newState: boolean) => void;
    onRequestClose?: () => void;
    backgroundLocation?: Location;
};

const MovieCard = ({ movie, isFirst = false, isLast = false, onToggleBookmark, onToggleLike, onRequestClose, backgroundLocation }: MovieCardProps) => {
    const [isPlayHovered, setIsPlayHovered] = useState(false);
    const [isAddHovered, setIsAddHovered] = useState(false);
    const [isThumbHovered, setIsThumbHovered] = useState(false);
    const [isDetailsHovered, setIsDetailsHovered] = useState(false);

    const [isBookmarked, setIsBookmarked] = useState(movie.bookmarked ?? false);
    const [isLiked, setIsLiked] = useState(movie.liked ?? false);

    const navigate = useNavigate();
    const location = useLocation();
    const fallbackLocation = backgroundLocation || location;

    const movieId = useMemo(() => {
        if('movieId' in movie) return movie.movieId?.toString() ?? '';
        return movie.id?.toString() ?? '';
    }, [movie]);

    const handleClick = () => {
        if (!movieId || movieId === 'undefined') return;

        onRequestClose?.();

        setTimeout(() => {
            const params = new URLSearchParams(location.search);
            params.set('id', movieId);
            navigate(
                {
                    pathname: fallbackLocation.pathname,
                    search: `?${params.toString()}`
                },
                { state: { backgroundLocation: fallbackLocation } }
            );
        }, 200);
    };

    // API 호출 - 북마크 처리
    const handleBookmarkClick = async (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation();
        try {
            if (isBookmarked) {
                await deleteBookmark(movieId);
                setIsBookmarked(false);
                onToggleBookmark?.(movieId, false);
            } else {
                await postBookmark(movieId);
                setIsBookmarked(true);
                onToggleBookmark?.(movieId, true);
            }
        } catch (error) {
            console.error("북마크 처리 실패", error);
        }
    };

    // API 호출 - 좋아요 처리
    const handleLikeClick = async (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation();
        try {
            if (isLiked) {
                await deleteLike(movieId);
                setIsLiked(false);
                onToggleLike?.(movieId, false);
            } else {
                await postLike(movieId);
                setIsLiked(true);
                onToggleLike?.(movieId, true);
            }
        } catch (error) {
            console.error("좋아요 처리 실패", error);
        }
    };

    useEffect(() => {
        setIsBookmarked(movie.bookmarked ?? false);
        setIsLiked(movie.liked ?? false);
    }, [movie.bookmarked, movie.liked]);


    return (
        <div className="
            group relative hover:z-50 flex-shrink-0 overflow-visible
            w-[217.91px] h-[117.609px]
        ">
            <div className={`
                absolute left-1/2 top-1/2
                w-[217.91px] h-[117.609px]
                rounded-[3.2px]
                overflow-hidden
                transform 
                -translate-x-1/2 -translate-y-1/2
                transition-[width,height,max-height] duration-200 ease-in-out origin-center

                group-hover:w-[336px] group-hover:h-auto
                group-hover:min-h-[350.828px]
                group-hover:max-h-[394.028px]
                group-hover:rounded-[6px]
                group-hover:z-50
                group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.75)]
                
                // MovieSlider의 첫 번째 카드인 경우
                ${isFirst
                    ? "group-hover:left-0 group-hover:-translate-x-0 group-hover:origin-left"
                    : ""
                }

                // MovieSlider의 마지막 카드인 경우
                ${isLast
                    ? "group-hover:left-auto group-hover:right-0 group-hover:translate-x-0 group-hover:origin-right"
                    : ""
                }
                `}
            >
                <img 
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="
                        w-full h-[117.609px] object-cover
                        transition-all duration-200 ease-in-out
                        group-hover:h-[189.477px]
                    "
                />
                <div className="
                    h-0 group-hover:h-auto
                    group-hover:min-h-[161.351px] group-hover:max-h-[203.429px]
                    overflow-hidden
                    transition-all ease-in-out
                    bg-[#181818] bg-opacity-75
                    "
                >
                    <div className="p-4 flex flex-col gap-y-[13px]">
                        <div className="flex justify-between items-center w-full">
                            <div className="flex items-center gap-x-2">
                                <img 
                                    src={isPlayHovered ? playHoveredButton : playButton} 
                                    className="cursor-pointer w-[40px] h-[40px]"
                                    onMouseEnter={() => setIsPlayHovered(true)}
                                    onMouseLeave={() => setIsPlayHovered(false)}
                                />
                                <img 
                                    src={
                                        isBookmarked
                                        ? (isAddHovered ? bookmarkHoveredButton : bookmarkButton)
                                        : (isAddHovered ? addHoveredButton : addButton)
                                    } 
                                    className="cursor-pointer w-[40px] h-[40px]"
                                    onMouseEnter={() => setIsAddHovered(true)}
                                    onMouseLeave={() => setIsAddHovered(false)}
                                    onClick={handleBookmarkClick}
                                />
                                <img 
                                    src={
                                        isLiked
                                        ? (isThumbHovered ? likeHoveredButton : likeButton)
                                        : (isThumbHovered ? thumbUpHoveredButton : thumbUpButton)
                                    } 
                                    className="cursor-pointer w-[40px] h-[40px]"
                                    onMouseEnter={() => setIsThumbHovered(true)}
                                    onMouseLeave={() => setIsThumbHovered(false)}
                                    onClick={handleLikeClick}
                                />
                            </div>
                            <img 
                                src={isDetailsHovered ? detailsHoveredButton : detailsButton} 
                                className="cursor-pointer w-[40px] h-[40px]"
                                onMouseEnter={() => setIsDetailsHovered(true)}
                                onMouseLeave={() => setIsDetailsHovered(false)}
                                onClick={handleClick}
                            />
                        </div>
                        <div className="flex flex-col gap-y-[13px] text-[16px]">
                            <div className="flex flex-row gap-x-1 items-center">
                                <img src={getAgeRatingImage(movie?.ageRating ?? '')} className="w-[32px] h-[32px]"/>
                                <p className="text-[#bcbcbc] pl-[14.4px]">
                                    {formatDuration(movie.durationMinutes ?? 0)}
                                </p>
                            </div>
                            <p className="text-white">
                                {movie.genres?.map(g => g.name).join(' · ') ?? '정보 없음'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;