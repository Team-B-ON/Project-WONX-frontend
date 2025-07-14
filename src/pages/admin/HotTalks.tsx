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

  if (loading) return <p className="p-4">로딩 중...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hot Talk 목록</h1>
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">내용</th>
            <th className="p-2 border">조회수</th>
            <th className="p-2 border">등록일</th>
            <th className="p-2 border">연결된 영상 ID</th>
          </tr>
        </thead>
        <tbody>
          {hotTalks.map(talk => (
            <tr key={talk.id} className="border-t">
              <td className="p-2 border">{talk.id}</td>
              <td className="p-2 border whitespace-pre-wrap">{talk.content}</td>
              <td className="p-2 border">{talk.viewCount}</td>
              <td className="p-2 border">{new Date(talk.createdAt).toLocaleString()}</td>
              <td className="p-2 border">{talk.movieId ?? '없음'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHotTalksPage;
