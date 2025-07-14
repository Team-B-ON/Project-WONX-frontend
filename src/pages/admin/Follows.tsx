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

  if (loading) return <p className="p-4 text-white">로딩 중...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-semibold mb-6">팔로우 목록</h1>
      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-700">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-800 text-white uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left border-b border-gray-700">팔로워 ID</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">팔로이 ID</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">팔로우 일시</th>
            </tr>
          </thead>
          <tbody>
            {follows.map((follow, index) => (
              <tr
                key={index}
                className={`border-b border-gray-700 ${
                  index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'
                } hover:bg-gray-700 transition`}
              >
                <td className="px-4 py-2">{follow.followerId}</td>
                <td className="px-4 py-2">{follow.followeeId}</td>
                <td className="px-4 py-2">{new Date(follow.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminFollowsPage;
