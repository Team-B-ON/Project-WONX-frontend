import axiosInstance from "../index";
import { GenreGridResponse } from "@/types/genreDetailsResponse";
import { GenreListResponse } from "@/types/genreDetailsResponse";

// 장르별 영화 목록 조회 - 정렬
export const getSortedGenres = async (
    genreId: string,
    offset = 0,
    limit = 100,
    sort: 'default' | 'releaseDateDesc' | 'releaseDateAsc' | 'titleAsc' | 'titleDesc' = 'default',
): Promise<GenreGridResponse> => {
    const res = await axiosInstance.get(`/genres/${genreId}/movies`, {
        params: { offset, limit, sort }
    })

    return res.data;
}

// 장르별 영화 목록 조회 - 그룹
export const getGenresGroupedBy = async (
    genreId: string,
    subgenreId?: string,
    limit = 40
): Promise<GenreListResponse> => {
    const params: Record<string, any> = {
        groupBy: 'subgenre',
        limit
    };
    
    if (subgenreId) {
        params.subgenreId = subgenreId;
    }

    const res = await axiosInstance.get(`genres/${genreId}/movies?`, {
        params
    })
    return res.data;
}