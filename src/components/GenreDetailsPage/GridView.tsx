import { GenreGridResponse } from "@/types/genreDetailsResponse";
import MovieCard from "../common/MovieCard";
import { Genre } from "@/types/genre";
import type { Location } from 'react-router-dom';

export type ListViewProps = {
  genre: GenreGridResponse;
  backgroundLocation: Location;
  onRequestClose: () => void;
};

const GridView = ({ genre, onRequestClose, backgroundLocation }: ListViewProps) => {
    const { results } = genre;

    return (
        <div className="pt-[36px] px-[60px] pb-[14px] flex justify-center">
            <div className="grid [grid-template-columns:repeat(5,217.91px)] gap-x-[15.4px] gap-y-[64px] overflow-visible">
                {results.map((movie) => (
                    <MovieCard
                        key={movie.movieId}
                        movie={{
                            movieId: String(movie.movieId),
                            title: movie.title,
                            posterUrl: movie.posterUrl,
                            durationMinutes: movie.durationMinutes,
                            ageRating: movie.ageRating,
                            genres: movie.genres as Genre[],
                            bookmarked: movie.bookmarked,
                            liked: movie.liked
                        }}
                        onRequestClose={onRequestClose}
                        backgroundLocation={backgroundLocation}
                    />
                ))}
            </div>
        </div>
    );
};

export default GridView;
