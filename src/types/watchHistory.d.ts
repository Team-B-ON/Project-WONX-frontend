// types/watchHistory.d.ts
export interface WatchHistory {
  movieId: string;
  title: string;
  posterUrl: string;
  lastPosition: number;       // 이어보기 위치 (초 단위)
  watchedSeconds: number;     // 누적 시청 시간 (초 단위)
  isCompleted: boolean;       // 시청 완료 여부
}
