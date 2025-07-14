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

  if (loading) return <p className="p-4">로딩 중...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">유저 목록</h1>
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">이메일</th>
            <th className="p-2 border">닉네임</th>
            <th className="p-2 border">요금제</th>
            <th className="p-2 border">가입일</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t">
              <td className="p-2 border">{user.id}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.nickname}</td>
              <td className="p-2 border">{user.planType}</td>
              <td className="p-2 border">
                {new Date(user.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;
