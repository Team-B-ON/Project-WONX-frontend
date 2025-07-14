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

  if (loading) return <p className="p-4 text-white">로딩 중...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-semibold mb-6">출연/감독 인물 목록</h1>
      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-700">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-800 text-white uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left border-b border-gray-700">ID</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">이름</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person, index) => (
              <tr
                key={person.id}
                className={`border-b border-gray-700 ${
                  index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'
                } hover:bg-gray-700 transition`}
              >
                <td className="px-4 py-2">{person.id}</td>
                <td className="px-4 py-2">{person.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPeoplePage;
