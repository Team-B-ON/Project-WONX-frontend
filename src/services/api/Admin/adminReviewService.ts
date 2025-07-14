import axios from 'axios';
import { AdminReviewDto } from '@/types/admin';

export async function fetchAdminReviews(): Promise<AdminReviewDto[]> {
  const res = await axios.get('${import.meta.env.VITE_API_URL}/api/admin/reviews');
  return res.data;
}
