import axios from 'axios';
import { AdminMovieDto } from '@/types/admin';

export async function fetchAdminMovies(): Promise<AdminMovieDto[]> {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/movies`);
  return res.data;
}
