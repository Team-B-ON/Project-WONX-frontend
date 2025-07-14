import { useEffect, useState } from 'react';
import { fetchAdminUsers } from '@/services/api/Admin/adminUserService';
import { AdminUserDto } from '@/types/admin';

const AdminUsersPage = () => {
  const [users, setUsers] = useState<AdminUserDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminUsers()
      .then(data => {
        console.log('👀 응답 데이터:', data);
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('❌ 예상치 못한 응답 형식:', data);
          setUsers([]); // fallback to empty array
        }
      })
      .catch(err => {
        console.error('❌ 사용자 목록 불러오기 실패:', err);
        setUsers([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4 text-white">로딩 중...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-semibold mb-6">유저 목록</h1>
      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-700">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-800 text-white uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left border-b border-gray-700">ID</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">이메일</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">닉네임</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">요금제</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">가입일</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`border-b border-gray-700 ${
                  index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'
                } hover:bg-gray-700 transition`}
              >
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.nickname}</td>
                <td className="px-4 py-2">{user.planType}</td>
                <td className="px-4 py-2">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersPage;
