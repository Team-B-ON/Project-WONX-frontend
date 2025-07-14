import { useEffect, useState } from 'react';
import { fetchAdminLikes } from '@/services/api/Admin/adminLikeService';
import { AdminLikeDto } from '@/types/admin';

const AdminLikesPage = () => {
  const [likes, setLikes] = useState<AdminLikeDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminLikes()
      .then(data => {
        console.log('❤️ 좋아요 데이터:', data);
        if (Array.isArray(data)) {
          setLikes(data);
        } else {
          console.error('❌ 예상치 못한 응답 형식:', data);
          setLikes([]);
        }
      })
      .catch(err => {
        console.error('❌ 좋아요 목록 불러오기 실패:', err);
        setLikes([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4 text-white">로딩 중...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-semibold mb-6">좋아요 목록</h1>
      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-700">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-800 text-white uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left border-b border-gray-700">ID</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">사용자</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">영화 ID</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">생성일</th>
            </tr>
          </thead>
          <tbody>
            {likes.map((like, index) => (
              <tr
                key={like.id}
                className={`border-b border-gray-700 ${
                  index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'
                } hover:bg-gray-700 transition`}
              >
                <td className="px-4 py-2">{like.id}</td>
                <td className="px-4 py-2">{like.userId}</td>
                <td className="px-4 py-2">{like.movieId}</td>
                <td className="px-4 py-2">{new Date(like.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLikesPage;
