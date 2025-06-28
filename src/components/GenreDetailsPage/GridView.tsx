import { GenreGridResponse } from "@/types/genreDetailsResponse";
import MovieCard from "../common/MovieCard";

export type ListViewProps = {
  genre: GenreGridResponse;
};

const GridView = ({ genre }: ListViewProps) => {
    const { results } = genre;

    return (
        <div className="pt-[36px] px-[60px] pb-[14px] flex justify-center">
            <div className="grid [grid-template-columns:repeat(5,217.91px)] gap-x-[15.4px] gap-y-[64px] overflow-visible">
                {results.map((movie) => (
                    <MovieCard
                        key={movie.movieId}
                        movie={{
                        id: String(movie.movieId),
                        title: movie.title,
                        posterUrl: movie.posterUrl,
                        durationMinutes: movie.duration,
                        ageRating: movie.ageRating,
                        genres: movie.genre.map((name, idx) => ({ id: String(idx), name })),
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default GridView;
