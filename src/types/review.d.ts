export interface Review {
    id: string,
    userId: string,
    videoId: string,
    rating: number,
    content: string,
    isAnonymous: boolean,
    createdAt: Date,
}