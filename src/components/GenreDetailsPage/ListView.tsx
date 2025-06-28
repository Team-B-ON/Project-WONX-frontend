import { useNavigate } from 'react-router-dom';
import { GenreListResponse } from '@/types/genreDetailsResponse';
import MovieTag from '@/components/common/MovieTag';
import MovieCard from '@/components/common/MovieCard';

export type ListViewProps = {
  genre: GenreListResponse;
};

const ListView = ({ genre }: ListViewProps) => {
  const navigate = useNavigate();

  return (
    <div className="pt-[48px] px-[60px] flex flex-col gap-[48px] items-center justify-center">
      {genre.groups.map((group) => (
        <div key={group.subgenreId}>
          {/* 서브 장르 이름 */}
          <MovieTag
            title={group.subgenre}
            onClickMore={() => navigate(`/genre/${genre.genreId}`)}
          />

          {/* 서브 장르 영화 리스트 */}
          <div className="grid [grid-template-columns:repeat(5,217.91px)] gap-x-[15.538px] gap-y-[26px] overflow-visible pt-[15.8px]">
            {group.movies.map((movie) => (
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
      ))}
    </div>
  );
};

export default ListView;
