// src/services/api/common/userApi.ts

import axiosInstance from '@/services/api';
import { User } from '@/types/user';

export const fetchMyUser = async (): Promise<User> => {
  const res = await axiosInstance.get('/user/me');
  return res.data;
};

