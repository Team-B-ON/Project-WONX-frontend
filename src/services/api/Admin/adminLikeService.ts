import axios from 'axios';
import { AdminLikeDto } from '@/types/admin';

export async function fetchAdminLikes(): Promise<AdminLikeDto[]> {
  const res = await axios.get('/api/admin/likes');
  return res.data;
}
