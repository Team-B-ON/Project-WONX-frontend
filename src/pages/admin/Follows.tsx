import { useEffect, useState } from 'react';
import { fetchAdminFollows } from '@/services/api/Admin/adminFollowService';
import { AdminFollowDto } from '@/types/admin';

const AdminFollowsPage = () => {
  const [follows, setFollows] = useState<AdminFollowDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminFollows()
      .then(data => {
        console.log('👀 응답 데이터:', data);
        if (Array.isArray(data)) {
          setFollows(data);
        } else {
          console.error('❌ 예상치 못한 응답 형식:', data);
          setFollows([]);
        }
      })
      .catch(err => {
        console.error('❌ 팔로우 목록 불러오기 실패:', err);
        setFollows([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">로딩 중...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">팔로우 목록</h1>
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">팔로워 ID</th>
            <th className="p-2 border">팔로이 ID</th>
            <th className="p-2 border">팔로우 일시</th>
          </tr>
        </thead>
        <tbody>
          {follows.map((follow, index) => (
            <tr key={index} className="border-t">
              <td className="p-2 border">{follow.followerId}</td>
              <td className="p-2 border">{follow.followeeId}</td>
              <td className="p-2 border">{new Date(follow.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFollowsPage;
