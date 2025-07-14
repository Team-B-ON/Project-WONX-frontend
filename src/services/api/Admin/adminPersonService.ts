import axios from 'axios';
import { AdminPersonDto } from '@/types/admin';

export async function fetchAdminPeople(): Promise<AdminPersonDto[]> {
  const res = await axios.get('/api/admin/people');
  return res.data;
}
