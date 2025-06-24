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
    people?: {
        person: Person,
        role: 'director' | 'screenwriter' | 'actor';
    }[];
}