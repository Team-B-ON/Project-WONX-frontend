import { useNavigate } from 'react-router-dom';
import { GenreListResponse } from '@/types/genreDetailsResponse';
import MovieTag from '@/components/common/MovieTag';
import MovieCard from '@/components/common/MovieCard';
import { Genre } from '@/types/genre';
import type { Location } from 'react-router-dom';

export type ListViewProps = {
  genre: GenreListResponse;
  backgroundLocation: Location;
  onRequestClose: () => void;
};

const ListView = ({ genre, onRequestClose, backgroundLocation }: ListViewProps) => {
  const navigate = useNavigate();

  return (
    <div className="pt-[48px] px-[60px] flex flex-col gap-[48px] items-center justify-center">
      {genre.groups.map((group) => (
        <div key={group.subgenreId}>
          {/* 서브 장르 이름 */}
          <MovieTag
            title={group.subgenre}
            onClickMore={() => 
              navigate(`/genre/${group.subgenreId}`, { 
                state: { 
                  backgroundLocation: {
                    pathname: location.pathname + location.search
                  }
                 } 
              })}
          />

          {/* 서브 장르 영화 리스트 */}
          <div className="grid [grid-template-columns:repeat(5,217.91px)] gap-x-[15.538px] gap-y-[26px] overflow-visible pt-[15.8px]">
            {group.movies.map((movie) => (
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
      ))}
    </div>
  );
};

export default ListView;
