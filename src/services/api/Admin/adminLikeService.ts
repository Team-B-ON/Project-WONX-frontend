import axios from 'axios';
import { AdminLikeDto } from '@/types/admin';

export async function fetchAdminLikes(): Promise<AdminLikeDto[]> {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/likes`);
  return res.data;
}
