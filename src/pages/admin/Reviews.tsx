import { useEffect, useState } from 'react';
import { fetchAdminReviews } from '@/services/api/Admin/adminReviewService';
import { AdminReviewDto } from '@/types/admin';

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState<AdminReviewDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminReviews()
      .then(data => {
        console.log('⭐ 리뷰 데이터:', data);
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          console.error('❌ 예상치 못한 응답 형식:', data);
          setReviews([]);
        }
      })
      .catch(err => {
        console.error('❌ 리뷰 목록 불러오기 실패:', err);
        setReviews([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4 text-white">로딩 중...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-semibold mb-6">리뷰 목록</h1>
      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-700">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-800 text-white uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left border-b border-gray-700">ID</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">작성자</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">영화 ID</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">평점</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">내용</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">익명 여부</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">삭제 여부</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">작성일</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr
                key={review.id}
                className={`border-b border-gray-700 ${
                  index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'
                } hover:bg-gray-700 transition`}
              >
                <td className="px-4 py-2">{review.id}</td>
                <td className="px-4 py-2">{review.userId}</td>
                <td className="px-4 py-2">{review.movieId}</td>
                <td className="px-4 py-2">{review.rating}</td>
                <td className="px-4 py-2 whitespace-pre-wrap">{review.content}</td>
                <td className="px-4 py-2">{review.isAnonymous ? '예' : '아니오'}</td>
                <td className="px-4 py-2">{review.isDeleted ? '예' : '아니오'}</td>
                <td className="px-4 py-2">
                  {new Date(review.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReviewsPage;
