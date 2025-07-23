import { Movie } from '@/types/movie';
import MovieCard from '../common/MovieCard';
import MovieSlider from '../common/MovieSlider';
import MovieTag from '../common/MovieTag';
import type { Location } from 'react-router-dom';

interface MovieListProps {
  title: string;
  movies: Movie[];
  useCustomSlider?: boolean; // true면 MovieSlider, false면 직접 슬라이드
  onClickMore?: () => void; // "모두 보기" 버튼 클릭 시 동작
  showMore?: boolean;       // 버튼 노출 여부 (기본 true)
  onToggleBookmark?: (movieId: string, newState: boolean) => void;
  onToggleLike?: (movieId: string, newState: boolean) => void;
  backgroundLocation?: Location;
}

export default function MovieList({
  title,
  movies,
  useCustomSlider,
  onClickMore,
  showMore = true,
  onToggleBookmark, onToggleLike,
  backgroundLocation,
}: MovieListProps) {
  return (
    <section className="pt-6 pb-10 space-y-4 overflow-visible">
      {/* 섹션 제목 + "모두 보기" 버튼 */}
      <div className="px-6 sm:px-10 lg:px-20 space-y-4">
        <MovieTag title={title} onClickMore={onClickMore} showMore={showMore} />

        {/* 슬라이드 영역 */}
        {useCustomSlider ? (
          // MovieSlider 컴포넌트 사용 (좌우 버튼 등)
          <MovieSlider movies={movies} backgroundLocation={backgroundLocation} />
        ) : (
          // 기본 수평 스크롤 방식
          <div className="flex gap-4 scroll-smooth scrollbar-hide">
            {movies.map((movie) => (
              <div key={movie.id} className="flex-shrink-0 w-[220px]">
                <MovieCard 
                  movie={movie}
                  onToggleBookmark={onToggleBookmark}
                  onToggleLike={onToggleLike} 
                  backgroundLocation={backgroundLocation} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
