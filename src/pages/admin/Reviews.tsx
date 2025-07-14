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

  if (loading) return <p className="p-4">로딩 중...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">리뷰 목록</h1>
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">작성자</th>
            <th className="p-2 border">영화 ID</th>
            <th className="p-2 border">평점</th>
            <th className="p-2 border">내용</th>
            <th className="p-2 border">익명 여부</th>
            <th className="p-2 border">삭제 여부</th>
            <th className="p-2 border">작성일</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <tr key={review.id} className="border-t">
              <td className="p-2 border">{review.id}</td>
              <td className="p-2 border">{review.userId}</td>
              <td className="p-2 border">{review.movieId}</td>
              <td className="p-2 border">{review.rating}</td>
              <td className="p-2 border whitespace-pre-wrap">{review.content}</td>
              <td className="p-2 border">{review.isAnonymous ? '예' : '아니오'}</td>
              <td className="p-2 border">{review.isDeleted ? '예' : '아니오'}</td>
              <td className="p-2 border">
                {new Date(review.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReviewsPage;
