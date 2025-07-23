import axiosInstance from "../index";
import { PersonDetailsResponse } from "@/types/personDetailsResponse";

export const getMoviePeople = async (personId: string): Promise<PersonDetailsResponse> => {
    const { data } = await axiosInstance.get(`/people/${personId}/movies`);
    return data;
}

