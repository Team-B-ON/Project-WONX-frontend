import { useEffect, useState } from 'react';
import { fetchAdminHotTalks } from '@/services/api/Admin/adminHotTalkService';
import { AdminHotTalkDto } from '@/types/admin';

const AdminHotTalksPage = () => {
  const [hotTalks, setHotTalks] = useState<AdminHotTalkDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminHotTalks()
      .then(data => {
        console.log('🔥 핫톡 데이터:', data);
        if (Array.isArray(data)) {
          setHotTalks(data);
        } else {
          console.error('❌ 예상치 못한 응답 형식:', data);
          setHotTalks([]);
        }
      })
      .catch(err => {
        console.error('❌ 핫톡 목록 불러오기 실패:', err);
        setHotTalks([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4 text-white">로딩 중...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-semibold mb-6">Hot Talk 목록</h1>
      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-700">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-800 text-white uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left border-b border-gray-700">ID</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">내용</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">조회수</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">등록일</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">연결된 영상 ID</th>
            </tr>
          </thead>
          <tbody>
            {hotTalks.map((talk, index) => (
              <tr
                key={talk.id}
                className={`border-b border-gray-700 ${
                  index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'
                } hover:bg-gray-700 transition`}
              >
                <td className="px-4 py-2">{talk.id}</td>
                <td className="px-4 py-2 whitespace-pre-wrap">{talk.content}</td>
                <td className="px-4 py-2">{talk.viewCount}</td>
                <td className="px-4 py-2">{new Date(talk.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2">{talk.movieId ?? '없음'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHotTalksPage;
