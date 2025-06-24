export interface Movie {
    id: string,
    title: string,
    description?: string,
    rating?: number;
    durationMinutes?: number,
    releaseDate?: string,
    posterUrl?: string,
    mainImg?: string,
    ageRating?: string,
    ageRatingReason?: string,
    genre?: string[]
}