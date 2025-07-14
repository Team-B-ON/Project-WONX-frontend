// 배너 응답
export interface MovieBanner {
  id: string;
  title: string;
  posterUrl: string;
  description: string;
  rating: number;
  durationMinutes: number;
  releaseDate: string;
  ageRating: string;
  bookmarked: boolean;
  liked: boolean;

  backdropUrl?: string; // 배너 배경 이미지
  rankText?: string; // 배너 콘텐츠 랭킹 텍스트
}
