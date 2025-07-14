import axios from 'axios';
import { AdminPersonDto } from '@/types/admin';

export async function fetchAdminPeople(): Promise<AdminPersonDto[]> {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/people`);
  return res.data;
}
