import { Movie } from "@/types/movie";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export const getMainBanner = (): Promise<Movie> => {
  const token = localStorage.getItem("accessToken");

  return api.get("api/home/banner", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data);
}