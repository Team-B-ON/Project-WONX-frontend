import axios from 'axios';
import { AdminWatchHistoryDto } from '@/types/admin';

export async function fetchAdminWatchHistories(): Promise<AdminWatchHistoryDto[]> {
  const res = await axios.get('${import.meta.env.VITE_API_URL}/api/admin/watch-histories');
  return res.data;
}
