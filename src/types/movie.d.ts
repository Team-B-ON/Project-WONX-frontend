import { Genre } from "./genre";
import { Person } from "./person";

export interface Movie {
    movieId?: string;
    id?: string,
    title: string,
    description?: string,
    rating?: number;
    durationMinutes?: number,
    releaseDate?: string,
    posterUrl?: string,
    mainImg?: string,
    ageRating?: string,

    genres?: Genre[],
    actors?: Person[],
    directors?: Person[],
    screenwriters?: Person[],

    bookmarked?: boolean;
    liked?: boolean;
}