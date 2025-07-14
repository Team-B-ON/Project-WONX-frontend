import { useEffect, useState } from 'react';
import { fetchAdminWatchHistories } from '@/services/api/Admin/adminWatchHistoryService';
import { AdminWatchHistoryDto } from '@/types/admin';

const AdminWatchHistoriesPage = () => {
  const [histories, setHistories] = useState<AdminWatchHistoryDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminWatchHistories()
      .then(data => {
        console.log('👀 응답 데이터:', data);
        if (Array.isArray(data)) {
          setHistories(data);
        } else {
          console.error('❌ 예상치 못한 응답 형식:', data);
          setHistories([]);
        }
      })
      .catch(err => {
        console.error('❌ 시청 기록 불러오기 실패:', err);
        setHistories([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4 text-white">로딩 중...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-semibold mb-6">시청 기록</h1>
      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-700">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-800 text-white uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left border-b border-gray-700">ID</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">유저 ID</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">영상 ID</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">시청일시</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">마지막 위치</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">시청 시간(초)</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">업데이트일시</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">완료 여부</th>
            </tr>
          </thead>
          <tbody>
            {histories.map((history, index) => (
              <tr
                key={history.id}
                className={`border-b border-gray-700 ${
                  index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'
                } hover:bg-gray-700 transition`}
              >
                <td className="px-4 py-2">{history.id}</td>
                <td className="px-4 py-2">{history.userId}</td>
                <td className="px-4 py-2">{history.videoId}</td>
                <td className="px-4 py-2">{new Date(history.watchedAt).toLocaleString()}</td>
                <td className="px-4 py-2">{history.lastPosition}</td>
                <td className="px-4 py-2">{history.watchedSeconds}</td>
                <td className="px-4 py-2">{new Date(history.updatedAt).toLocaleString()}</td>
                <td className="px-4 py-2">{history.isCompleted ? '✅' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminWatchHistoriesPage;
