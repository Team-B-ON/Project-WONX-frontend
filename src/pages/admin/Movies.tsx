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

  if (loading) return <p className="p-4 text-white">로딩 중...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-semibold mb-6">영화 목록</h1>
      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-700">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-800 text-white uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left border-b border-gray-700">ID</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">제목</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">평점</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">러닝타임</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">개봉일</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">조회수</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => (
              <tr
                key={movie.id}
                className={`border-b border-gray-700 ${
                  index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'
                } hover:bg-gray-700 transition`}
              >
                <td className="px-4 py-2">{movie.id}</td>
                <td className="px-4 py-2">{movie.title}</td>
                <td className="px-4 py-2">{movie.rating}</td>
                <td className="px-4 py-2">{movie.durationMinutes}분</td>
                <td className="px-4 py-2">{movie.releaseDate}</td>
                <td className="px-4 py-2">{movie.viewCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMoviesPage;
