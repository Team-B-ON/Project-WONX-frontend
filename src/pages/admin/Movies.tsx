import { useEffect, useState } from 'react';
import { fetchAdminMovies } from '@/services/api/Admin/adminMovieService';
import { AdminMovieDto } from '@/types/admin';

const AdminMoviesPage = () => {
  const [movies, setMovies] = useState<AdminMovieDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminMovies()
      .then(data => {
        console.log('🎬 영화 데이터:', data);
        if (Array.isArray(data)) {
          setMovies(data);
        } else {
          console.error('❌ 예기치 않은 데이터 형식:', data);
          setMovies([]);
        }
      })
      .catch(err => {
        console.error('❌ 영화 목록 불러오기 실패:', err);
        setMovies([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">로딩 중...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">영화 목록</h1>
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">제목</th>
            <th className="p-2 border">평점</th>
            <th className="p-2 border">러닝타임</th>
            <th className="p-2 border">개봉일</th>
            <th className="p-2 border">조회수</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie.id} className="border-t">
              <td className="p-2 border">{movie.id}</td>
              <td className="p-2 border">{movie.title}</td>
              <td className="p-2 border">{movie.rating}</td>
              <td className="p-2 border">{movie.durationMinutes}분</td>
              <td className="p-2 border">{movie.releaseDate}</td>
              <td className="p-2 border">{movie.viewCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMoviesPage;
