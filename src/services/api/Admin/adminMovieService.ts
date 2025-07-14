import axios from 'axios';
import { AdminMovieDto } from '@/types/admin';

export async function fetchAdminMovies(): Promise<AdminMovieDto[]> {
  const res = await axios.get('/api/admin/movies');
  return res.data;
}
