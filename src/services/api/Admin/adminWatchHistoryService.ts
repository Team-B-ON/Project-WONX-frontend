import axios from 'axios';
import { AdminWatchHistoryDto } from '@/types/admin';

export async function fetchAdminWatchHistories(): Promise<AdminWatchHistoryDto[]> {
  const res = await axios.get('/api/admin/watch-histories');
  return res.data;
}
