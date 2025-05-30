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
  className="w-full h-[280px] flex-shrink-0 transition-transform duration-200 hover:scale-105 rounded-lg overflow-hidden shadow-lg bg-zinc-900 relative"
>
  {/* 왼쪽 이미지 */}
  <div className="absolute inset-y-0 left-0 w-[180px]">
    <img
      src={movie.posterUrl || '/fallback.jpg'}
      alt={movie.title}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  </div>

  {/* 오른쪽 텍스트 */}
  <div className="ml-[180px] p-4 flex flex-col justify-between h-full">
    <h3 className="text-lg font-bold text-white line-clamp-2">{movie.title}</h3>
    <p className="text-sm text-gray-300">{releaseYear}</p>
    <p className="text-sm text-gray-400 mt-2 line-clamp-3">
      리뷰 내용 미리보기 넣을 자리...
    </p>
  </div>
</Link>

  );
}
