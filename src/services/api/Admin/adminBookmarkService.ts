import axios from 'axios';
import { AdminBookmarkDto } from '@/types/admin';

export async function fetchAdminBookmarks(): Promise<AdminBookmarkDto[]> {
  const res = await axios.get('/api/admin/bookmarks');
  return res.data;
}
