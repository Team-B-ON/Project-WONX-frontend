export interface HotTalk {
  id: string;                // 리뷰 ID
  movieTitle: string;        // 영화 제목
  posterUrl: string;         // 영화 포스터 URL
  content: string;           // 리뷰 내용
  author: string;            // ✅ 작성자
  rating: number;            // ✅ 평점
  createdAt?: Date;
}
