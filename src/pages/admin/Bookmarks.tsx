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

  if (loading) return <p className="p-4 text-white">로딩 중...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-semibold mb-6">북마크 목록</h1>
      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-700">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-800 text-white uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left border-b border-gray-700">ID</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">사용자</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">영화 ID</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">생성일</th>
            </tr>
          </thead>
          <tbody>
            {bookmarks.map((bookmark, index) => (
              <tr
                key={bookmark.id}
                className={`border-b border-gray-700 ${
                  index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'
                } hover:bg-gray-700 transition`}
              >
                <td className="px-4 py-2">{bookmark.id}</td>
                <td className="px-4 py-2">{bookmark.userId}</td>
                <td className="px-4 py-2">{bookmark.movieId}</td>
                <td className="px-4 py-2">
                  {new Date(bookmark.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookmarksPage;
