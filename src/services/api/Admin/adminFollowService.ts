import axios from 'axios';
import { AdminFollowDto } from '@/types/admin';

export async function fetchAdminFollows(): Promise<AdminFollowDto[]> {
  const res = await axios.get('/api/admin/follows');
  return res.data;
}
