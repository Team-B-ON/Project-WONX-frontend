import { Link } from 'react-router-dom';
import { Movie } from '@/types/movie';

interface BoxOfficeMovieCardProps {
  movie: Movie;
}

export default function BoxOfficeMovieCard({ movie }: BoxOfficeMovieCardProps) {
  const releaseYear = movie.releaseDate
    ? new Date(movie.releaseDate).getFullYear()
    : 'N/A';

  return (
    <Link
      to={`/movies/${movie.id}`}
      className="w-[200px] flex-shrink-0 transition-transform duration-200 hover:scale-105"
    >
      <div className="relative aspect-[2/3] rounded-md overflow-hidden shadow-lg">
        <img
          src={movie.posterUrl || '/fallback.jpg'}
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* hover 시 등장하는 정보 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 p-4">
            <h3 className="text-sm font-semibold text-white line-clamp-2">{movie.title}</h3>
            <p className="text-xs text-gray-300">{releaseYear}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
