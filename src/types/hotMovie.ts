export interface RawHotMovie {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  likes: number;
  averageRating: number;
  watchCount: number;
}

export interface HotMovie {
  id: string,
  title: string;
  posterUrl: string;
  viewCount: number;
}
