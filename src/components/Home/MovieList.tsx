import { Movie } from '@/types/movie';
import MovieCard from '../common/MovieCard';
import MovieSlider from '../common/MovieSlider';

interface MovieListRowProps {
  title: string;
  movies: Movie[];
  useCustomSlider?: boolean; // true면 MovieSlider, false면 직접 슬라이드
}

export default function MovieListRow({ title, movies, useCustomSlider }: MovieListRowProps) {
  return (
    <section className="pt-6 pb-10 space-y-4 overflow-visible">
      {/* 섹션 제목 + 콘텐츠 감싸는 영역 */}
      <div className="px-6 sm:px-10 lg:px-20 space-y-4">
        <h2 className="text-white text-2xl font-bold">{title}</h2>

        {/* 슬라이드 영역 */}
        {useCustomSlider ? (
          // MovieSlider 컴포넌트 사용 (커스텀 전용)
          <MovieSlider movies={movies} />
        ) : (
          // 기본 수평 스크롤 방식
          <div className="flex gap-4 scroll-smooth scrollbar-hide">
            {movies.map((movie) => (
              <div key={movie.id} className="flex-shrink-0 w-[220px]">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
