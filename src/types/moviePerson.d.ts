export interface MoviePerson {
    id: string,
    videoId: string,
    personId: string,
    role: 'director' | 'screenwriter' | 'actor' | string,
}