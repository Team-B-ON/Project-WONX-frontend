import axiosInstance from "../index";
import { Bookmark } from "@/types/bookmark";

// 북마크 추가
export const postBookmark = async (movieId: string): Promise<Bookmark> => {
    try {
        const { data } = await axiosInstance.post<Bookmark>(
            `/movies/${movieId}/bookmark`, {}
        );
        return data;
    } catch (e) {
        console.error('북마크 요청 실패: ', e);
        throw e;
    }
};

// 북마크 삭제
export const deleteBookmark = async (movieId: string): Promise<Bookmark> => {
    try {
        const { data } = await axiosInstance.delete<Bookmark>(
            `/movies/${movieId}/bookmark`, {}
        );
        return data;
    } catch (e) {
        console.error('북마크 삭제 실패: ', e);
        throw e;
    }
};