export interface User {
  id: string;
  nickname: string;
  email?: string;
  bio?: string;
  planType?: 'FREE' | 'STANDARD' | 'PREMIUM';
  avatarUrl?: string;            // SearchUserGrid에서 사용
  profileImageUrl?: string;      // 마이페이지 등 다른 곳에서 쓸 수 있음
  createdAt?: string;
}
