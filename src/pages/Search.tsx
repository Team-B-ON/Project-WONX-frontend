import React from "react";
import { useSearchParams } from "react-router-dom";

import TopNaviBar from "@/components/common/TopNavBar";
import SearchMovieGrid from "@/components/Search/SearchMovieGrid";
import SearchResultHeader from "@/components/Search/SearchResultHeader";
import SearchUserGrid from "@/components/Search/SearchUserGrid";
import SearchHotTalkGrid from "@/components/Search/SearchHotTalkGrid";

const Search = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";

  const allMovies = [
    { id: "1", title: "라라랜드", posterUrl: "https://occ-0-3097-993.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABV4CF2PBJ2cLwMao0g2JGonHwyfwofN3t5ue5E8BN8RsgEyzeD09PV4jr5QcmlTdksokq_-yHM9FeNw6e7jhdJZ0ys0ypDsnSpw.webp?r=35c" },
    { id: "2", title: "위대한 쇼맨", posterUrl: "https://occ-0-3097-993.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABV4CF2PBJ2cLwMao0g2JGonHwyfwofN3t5ue5E8BN8RsgEyzeD09PV4jr5QcmlTdksokq_-yHM9FeNw6e7jhdJZ0ys0ypDsnSpw.webp?r=35c" },
    { id: "3", title: "레미제라블", posterUrl: "https://occ-0-3097-993.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABV4CF2PBJ2cLwMao0g2JGonHwyfwofN3t5ue5E8BN8RsgEyzeD09PV4jr5QcmlTdksokq_-yHM9FeNw6e7jhdJZ0ys0ypDsnSpw.webp?r=35c" },
    { id: "4", title: "스타 이즈 본", posterUrl: "https://occ-0-3097-993.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABV4CF2PBJ2cLwMao0g2JGonHwyfwofN3t5ue5E8BN8RsgEyzeD09PV4jr5QcmlTdksokq_-yHM9FeNw6e7jhdJZ0ys0ypDsnSpw.webp?r=35c" },
    { id: "5", title: "인셉션", posterUrl: "https://occ-0-3097-993.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABV4CF2PBJ2cLwMao0g2JGonHwyfwofN3t5ue5E8BN8RsgEyzeD09PV4jr5QcmlTdksokq_-yHM9FeNw6e7jhdJZ0ys0ypDsnSpw.webp?r=35c" },
    { id: "6", title: "인터스텔라", posterUrl: "https://occ-0-3097-993.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABV4CF2PBJ2cLwMao0g2JGonHwyfwofN3t5ue5E8BN8RsgEyzeD09PV4jr5QcmlTdksokq_-yHM9FeNw6e7jhdJZ0ys0ypDsnSpw.webp?r=35c" },
    { id: "7", title: "테넷", posterUrl: "https://occ-0-3097-993.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABV4CF2PBJ2cLwMao0g2JGonHwyfwofN3t5ue5E8BN8RsgEyzeD09PV4jr5QcmlTdksokq_-yHM9FeNw6e7jhdJZ0ys0ypDsnSpw.webp?r=35c" },
    { id: "8", title: "덩케르크", posterUrl: "https://occ-0-3097-993.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABV4CF2PBJ2cLwMao0g2JGonHwyfwofN3t5ue5E8BN8RsgEyzeD09PV4jr5QcmlTdksokq_-yHM9FeNw6e7jhdJZ0ys0ypDsnSpw.webp?r=35c" },
  ];

  const allUsers = [
    { id: "1", nickname: "영화덕후123", avatarUrl: "https://via.placeholder.com/100x100?text=User1https://occ-0-3097-993.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABVy2_XUhT73OmjpVmwUCEHzqmQPr4KCzW2BDHesl4hzaFniV_jmE73qjSMbBnOCtq46IAH4q-QnoeR7k09shYfPQkWoSRfVpxWOA.png?r=962" },
    { id: "2", nickname: "라라랜드팬", avatarUrl: "https://occ-0-3097-993.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABVy2_XUhT73OmjpVmwUCEHzqmQPr4KCzW2BDHesl4hzaFniV_jmE73qjSMbBnOCtq46IAH4q-QnoeR7k09shYfPQkWoSRfVpxWOA.png?r=962" },
    { id: "3", nickname: "라라랜드최고", avatarUrl: "https://occ-0-3097-993.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABVy2_XUhT73OmjpVmwUCEHzqmQPr4KCzW2BDHesl4hzaFniV_jmE73qjSMbBnOCtq46IAH4q-QnoeR7k09shYfPQkWoSRfVpxWOA.png?r=962" },
    { id: "4", nickname: "인터스텔라광팬", avatarUrl: "https://occ-0-3097-993.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABVy2_XUhT73OmjpVmwUCEHzqmQPr4KCzW2BDHesl4hzaFniV_jmE73qjSMbBnOCtq46IAH4q-QnoeR7k09shYfPQkWoSRfVpxWOA.png?r=962" },
    { id: "5", nickname: "라라랜드라광팬", avatarUrl: "https://occ-0-3097-993.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABVy2_XUhT73OmjpVmwUCEHzqmQPr4KCzW2BDHesl4hzaFniV_jmE73qjSMbBnOCtq46IAH4q-QnoeR7k09shYfPQkWoSRfVpxWOA.png?r=962" },
    { id: "6", nickname: "라라랜드아", avatarUrl: "https://occ-0-3097-993.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABVy2_XUhT73OmjpVmwUCEHzqmQPr4KCzW2BDHesl4hzaFniV_jmE73qjSMbBnOCtq46IAH4q-QnoeR7k09shYfPQkWoSRfVpxWOA.png?r=962" },
  ];

  const allHotTalk = [
    { id: "1", movieTitle: "라라랜드", content: "정말 감동적이었어요! 음악이 최고였음.", author: "유저123", rating: 5 },
    { id: "2", movieTitle: "인셉션", content: "역시 놀란 감독. 최고의 연출력!", author: "유저456", rating: 5 },
    { id: "3", movieTitle: "인터스텔라", content: "웅장한 스케일, 눈물남.", author: "유저789", rating: 4 },
  ];

  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = allUsers.filter((user) =>
    user.nickname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHotTalk = allHotTalk.filter((review) =>
    review.movieTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recommendations = filteredMovies.length > 0
    ? allMovies
        .filter((movie) => !filteredMovies.includes(movie))
        .sort(() => Math.random() - 0.5)
        .slice(0, 6)
    : [];

  const similarSuggestions = filteredMovies.length === 0
    ? allMovies
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
    : [];

  return (
    <div className="bg-black min-h-screen">
      <TopNaviBar />

      <div className="px-6 sm:px-10 lg:px-25.5 py-10 space-y-12">
        <SearchResultHeader query={searchQuery} />

        {filteredMovies.length > 0 ? (
          <>
            <SearchMovieGrid title="영화 검색 결과" movies={filteredMovies} />

            <SearchMovieGrid title="이런 건 어떠세요?" movies={recommendations} />
          </>
        ) : (
          <>
            <p className="text-white text-lg font-bold">검색 결과가 없습니다.</p>
            <SearchMovieGrid title="혹시 이런 걸 찾으셨나요?" movies={similarSuggestions} />
          </>
        )}

        {filteredHotTalk.length > 0 && (
          <SearchHotTalkGrid query={searchQuery} reviews={filteredHotTalk} />
        )}

        {filteredUsers.length > 0 && (
          <SearchUserGrid query={searchQuery} users={filteredUsers} />
        )}
      </div>
    </div>
  );
};

export default Search;
