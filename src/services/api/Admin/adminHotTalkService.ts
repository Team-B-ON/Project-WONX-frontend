import axios from 'axios';
import { AdminHotTalkDto } from '@/types/admin';

export async function fetchAdminHotTalks(): Promise<AdminHotTalkDto[]> {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/hot-talks`);
  return res.data;
}
