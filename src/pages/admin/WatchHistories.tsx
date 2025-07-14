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

  if (loading) return <p className="p-4">로딩 중...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">시청 기록</h1>
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">유저 ID</th>
            <th className="p-2 border">영상 ID</th>
            <th className="p-2 border">시청일시</th>
            <th className="p-2 border">마지막 위치</th>
            <th className="p-2 border">시청 시간(초)</th>
            <th className="p-2 border">업데이트일시</th>
            <th className="p-2 border">완료 여부</th>
          </tr>
        </thead>
        <tbody>
          {histories.map(history => (
            <tr key={history.id} className="border-t">
              <td className="p-2 border">{history.id}</td>
              <td className="p-2 border">{history.userId}</td>
              <td className="p-2 border">{history.videoId}</td>
              <td className="p-2 border">{new Date(history.watchedAt).toLocaleString()}</td>
              <td className="p-2 border">{history.lastPosition}</td>
              <td className="p-2 border">{history.watchedSeconds}</td>
              <td className="p-2 border">{new Date(history.updatedAt).toLocaleString()}</td>
              <td className="p-2 border">{history.isCompleted ? '✅' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminWatchHistoriesPage;
