export interface Movie {
    id: string,
    title: string,
    description?: string,
    rating?: number;
    durationMinutes?: number,
    releaseDate?: string,
    posterUrl?: string,
    ageRating?: string,
    ageRatingReason?: string,
    genre?: string[]
}