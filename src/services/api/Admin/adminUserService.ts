import axios from 'axios';
import { AdminUserDto } from '@/types/admin';

export async function fetchAdminUsers(): Promise<AdminUserDto[]> {
  const res = await axios.get('${import.meta.env.VITE_API_URL}/api/admin/users');
  return res.data;
}
