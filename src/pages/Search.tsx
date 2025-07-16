import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import SearchMovieGrid from "@/components/Search/SearchMovieGrid";
import SearchResultHeader from "@/components/Search/SearchResultHeader";
import SearchUserGrid from "@/components/Search/SearchUserGrid";
import SearchHotTalkGrid from "@/components/Search/SearchHotTalkGrid";

import { getSearchResults } from "@/services/api/SearchPage/SearchApi";
import { MovieSearchDto, ReviewSearchDto, UserSearchDto } from "@/types/searchResult";

const Search = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";

  const [movies, setMovies] = useState<MovieSearchDto[]>([]);
  const [users, setUsers] = useState<UserSearchDto[]>([]);
  const [reviews, setReviews] = useState<ReviewSearchDto[]>([]);

  useEffect(() => {
    if (!searchQuery) return;

    getSearchResults(searchQuery)
      .then((data) => {
        setMovies(data.movies || []);
        setUsers(data.users || []);
        setReviews(data.reviews || []);
      })
      .catch((err) => {
        console.error("검색 API 오류:", err);
        setMovies([]);
        setUsers([]);
        setReviews([]);
      });
  }, [searchQuery]);

  return (
    <div className="bg-black min-h-screen">
      <div className="px-6 sm:px-10 lg:px-25.5 py-10 space-y-12">
        <SearchResultHeader query={searchQuery} />

        {movies.length > 0 ? (
          <>
            <SearchMovieGrid title="영화 검색 결과" movies={movies} />
          </>
        ) : (
          <p className="text-white text-lg font-bold">검색 결과가 없습니다.</p>
        )}

        {reviews.length > 0 && (
          <SearchHotTalkGrid query={searchQuery} reviews={reviews} />
        )}

        {users.length > 0 && (
          <SearchUserGrid query={searchQuery} users={users} />
        )}
      </div>
    </div>
  );
};

export default Search;
