import axiosInstance from '../index';

export interface RequestLinkDto {
  email: string;
}

export async function requestAuthLink(email: string): Promise<void> {
  await axiosInstance.post<RequestLinkDto>('/api/auth/send-link', { email });
}
