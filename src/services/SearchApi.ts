import { SearchResult } from "@/types/searchResult";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL + "/api";

export const getSearchResults = async (keyword: string): Promise<SearchResult> => {
  const { data } = await axios.get(`${API_BASE_URL}/search`, {
    params: { keyword },
    withCredentials: true, // 인증 필요시
  });
  return data;
};
