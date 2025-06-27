import { Genre } from "./genre";
import { Person } from "./person";

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

    genres?: Genre[],
    actors?: Person[],
    directors?: Person[],
    screenwriters?: Person[],
}