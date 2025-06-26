import { Link } from 'react-router-dom';
import { Movie } from '@/types/movie';

interface HotTalkCardProps {
  movie: Movie;
}

export default function HotTalkCard({ movie }: HotTalkCardProps) {
  const releaseYear = movie.releaseDate
    ? new Date(movie.releaseDate).getFullYear()
    : 'N/A';

  return (
    <Link
      to={`/movies/${movie.id}`}
      className="w-full h-[220px] sm:h-[230px] md:h-[240px] flex-shrink-0 transition-transform duration-200 hover:scale-105 rounded-lg overflow-hidden shadow-md bg-zinc-900 relative"
    >
      {/* 왼쪽 이미지 */}
      <div className="absolute inset-y-0 left-0 w-[100px] sm:w-[120px] md:w-[140px]">
        <img
          src={movie.posterUrl || '/fallback.jpg'}
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* 오른쪽 텍스트 */}
      <div className="ml-[100px] sm:ml-[120px] md:ml-[140px] p-2 sm:p-2.5 md:p-3 flex flex-col justify-between h-full">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-[11px] sm:text-xs text-gray-300">{releaseYear}</p>
        <p className="text-[11px] sm:text-xs text-gray-400 mt-1 line-clamp-2">
          리뷰 내용 미리보기...
        </p>
      </div>
    </Link>
  );
}
