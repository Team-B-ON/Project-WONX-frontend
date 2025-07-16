export interface Review {
  reviewId: string;          // ✅ 백에서 reviewId로 내려옴
  userId: string;
  userNickname: string;      // ✅ 익명 여부 따라 닉네임 포함됨
  movieId: string;           // ✅ videoId → movieId
  rating: number;
  content: string;
  isAnonymous: boolean;
  createdAt: string;         // ✅ ISO 문자열 (Date 아님)
  isMine: boolean;           // ✅ 현재 사용자 여부
}
