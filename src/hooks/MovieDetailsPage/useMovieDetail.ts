import { useState, useEffect } from 'react';
import type { Movie } from '@/types/movie';
import { getMovieById } from '@/services/api/MovieDetailsPage/movie';

export function useMovieDetail(id?: string) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getMovieById(id)
      .then(setMovie)
      .catch(() => setError('영화 정보를 불러오는 중 오류가 발생했습니다.'))
      .finally(() => setLoading(false));
  }, [id]);

  return { movie, loading, error };
}