import { useEffect, useState } from 'react';
import { fetchAdminPeople } from '@/services/api/Admin/adminPersonService';
import { AdminPersonDto } from '@/types/admin';

const AdminPeoplePage = () => {
  const [people, setPeople] = useState<AdminPersonDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminPeople()
      .then(data => {
        console.log('🧑‍🤝‍🧑 인물 데이터:', data);
        if (Array.isArray(data)) {
          setPeople(data);
        } else {
          console.error('❌ 예상치 못한 응답 형식:', data);
          setPeople([]);
        }
      })
      .catch(err => {
        console.error('❌ 인물 목록 불러오기 실패:', err);
        setPeople([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">로딩 중...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">출연/감독 인물 목록</h1>
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">이름</th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <tr key={person.id} className="border-t">
              <td className="p-2 border">{person.id}</td>
              <td className="p-2 border">{person.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPeoplePage;
