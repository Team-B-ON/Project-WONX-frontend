// types/recommend.d.ts

export interface RecommendMovie {
  id: string;
  title: string;
  posterUrl: string;
  boxOfficeRank: number | null; // null 허용할 경우
}
