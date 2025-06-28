import { Movie } from "@/types/movie";
import MovieCard from "../common/MovieCard";

interface SearchMovieGridProps {
  title: string;
  movies: Movie[];
}

export default function SearchMovieGrid({ title, movies }: SearchMovieGridProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-white text-xl font-bold">{title}</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-3">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
