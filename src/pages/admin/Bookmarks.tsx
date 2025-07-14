import { useEffect, useState } from 'react';
import { fetchAdminBookmarks } from '@/services/api/Admin/adminBookmarkService';
import { AdminBookmarkDto } from '@/types/admin';

const AdminBookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState<AdminBookmarkDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminBookmarks()
      .then(data => {
        console.log('🔖 북마크 데이터:', data);
        if (Array.isArray(data)) {
          setBookmarks(data);
        } else {
          console.error('❌ 예상치 못한 응답 형식:', data);
          setBookmarks([]);
        }
      })
      .catch(err => {
        console.error('❌ 북마크 목록 불러오기 실패:', err);
        setBookmarks([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">로딩 중...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">북마크 목록</h1>
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">사용자</th>
            <th className="p-2 border">영화 ID</th>
            <th className="p-2 border">생성일</th>
          </tr>
        </thead>
        <tbody>
          {bookmarks.map(bookmark => (
            <tr key={bookmark.id} className="border-t">
              <td className="p-2 border">{bookmark.id}</td>
              <td className="p-2 border">{bookmark.userId}</td>
              <td className="p-2 border">{bookmark.movieId}</td>
              <td className="p-2 border">
                {new Date(bookmark.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookmarksPage;
