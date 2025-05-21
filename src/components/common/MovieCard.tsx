import type { Movie } from "@/types/movie";
import playButton from '@/assets/common/buttons/play-button.svg'
import addButton from '@/assets/common/buttons/add-button.svg'
import thumbUpButton from '@/assets/common/buttons/thumbup-button.svg'
import detailsButton from '@/assets/common/buttons/arrowdown-button.svg'
import ageRating15 from '@/assets/common/15-age-rating.png'
import { formatDuration } from "@/utils/timeFormat";

type MovieCardProps = {
    movie: Movie;
};

const MovieCard = ({movie}: MovieCardProps) => {
    return (
        <div className="
            group relative flex-shrink-0 overflow-hidden
            w-[209.089px] h-auto
            rounded-[2.88px]
            transition-all duration-250 ease-in-out
            hover:w-[336px] hover:h-[350.828px] hover:rounded-[6px]
        ">
            <img 
                src={movie.posterUrl}
                alt={movie.title}
                className="
                    w-full h-[117.609px] object-cover
                    transition-all duration-300 ease-in-out
                    group-hover:h-[189.477px]
                "
            />
            <div className="
                h-0 group-hover:h-[161.351px]
                overflow-hidden
                transition-all duration-300 ease-in-out
                bg-[#181818] bg-opacity-75
                "
            >
                <div className="p-4 flex flex-col gap-y-[13px]">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-x-2">
                            <img src={playButton} className="cursor-pointer"/>
                            <img src={addButton} className="cursor-pointer"/>
                            <img src={thumbUpButton} className="cursor-pointer"/>
                        </div>
                        <img src={detailsButton} className="cursor-pointer"/>
                    </div>
                    <div className="flex flex-col gap-y-[13px] text-[16px]">
                        <div className="flex flex-row gap-x-1 items-center">
                            <img src={ageRating15} className="w-[32px] h-[32px]"/>
                            <p className="text-[#bcbcbc] pl-[14.4px]">
                                {formatDuration(movie.durationMinutes ?? 0)}
                            </p>
                        </div>
                        <p className="text-white">
                            {movie.genre?.join(' · ') ?? '정보 없음'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;