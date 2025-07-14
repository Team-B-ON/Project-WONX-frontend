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

  if (loading) return <p className="p-4">로딩 중...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">좋아요 목록</h1>
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">사용자</th>
            <th className="p-2 border">영화 ID</th>
            <th className="p-2 border">생성일</th>
          </tr>
        </thead>
        <tbody>
          {likes.map(like => (
            <tr key={like.id} className="border-t">
              <td className="p-2 border">{like.id}</td>
              <td className="p-2 border">{like.userId}</td>
              <td className="p-2 border">{like.movieId}</td>
              <td className="p-2 border">
                {new Date(like.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLikesPage;
