import axios from 'axios';
import { AdminReviewDto } from '@/types/admin';

export async function fetchAdminReviews(): Promise<AdminReviewDto[]> {
  const res = await axios.get('/api/admin/reviews');
  return res.data;
}
