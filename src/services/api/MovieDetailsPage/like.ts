import axiosInstance from "../index";
import { Like } from "@/types/like";

// 좋아요 추가
export const postLike = async (movieId: string): Promise<Like> => {
    try {
        const { data } = await axiosInstance.post<Like>(
            `/movies/${movieId}/like`, {}
        );
        return data;
    } catch (e) {
        console.error('좋아요 요청 실패: ', e);
        throw e;
    }
};

// 좋아요 삭제
export const deleteLike = async (movieId: string): Promise<Like> => {
    try {
        const { data } = await axiosInstance.delete<Like>(
            `/movies/${movieId}/like`, {}
        );
        return data;
    } catch (e) {
        console.error('좋아요 삭제 실패: ', e);
        throw e;
    }
};