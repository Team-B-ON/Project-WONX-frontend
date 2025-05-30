import SearchHotTalkGrid from "@/components/Search/HotTalk/SearchHotTalkGrid";
import SearchMovieGrid from "@/components/Search/SearchMovieGrid";
import SearchRecommendationGrid from "@/components/Search/SearchRecommendationGrid";
import SearchResultHeader from "@/components/Search/SearchResultHeader";
import SearchUserGrid from "@/components/Search/SearchUserGrid";

const Search = () => {
  const searchQuery = '라라랜드';

  // 임시 더미 데이터 → 결과 있음 상태로 만들기
  const searchResults = [
    {
      id: '1',
      title: '라라랜드',
      posterUrl: 'https://via.placeholder.com/300x450?text=라라랜드',
    },
    {
      id: '2',
      title: '위대한 쇼맨',
      posterUrl: 'https://via.placeholder.com/300x450?text=위대한쇼맨',
    },
    {
      id: '3',
      title: '레미제라블',
      posterUrl: 'https://via.placeholder.com/300x450?text=레미제라블',
    },
    {
      id: '4',
      title: '스타 이즈 본',
      posterUrl: 'https://via.placeholder.com/300x450?text=스타이즈본',
    },
    {
      id: '5',
      title: '스타 이즈 본',
      posterUrl: 'https://via.placeholder.com/300x450?text=스타이즈본',
    },
    {
      id: '6',
      title: '스타 이즈 본',
      posterUrl: 'https://via.placeholder.com/300x450?text=스타이즈본',
    },
    {
      id: '7',
      title: '스타 이즈 본',
      posterUrl: 'https://via.placeholder.com/300x450?text=스타이즈본',
    },
    {
      id: '8',
      title: '스타 이즈 본',
      posterUrl: 'https://via.placeholder.com/300x450?text=스타이즈본',
    },
  ];

  const recommendations = [
    {
      id: '5',
      title: '인셉션',
      posterUrl: 'https://via.placeholder.com/300x450?text=인셉션',
    },
    {
      id: '6',
      title: '인터스텔라',
      posterUrl: 'https://via.placeholder.com/300x450?text=인터스텔라',
    },
  ];

  const similarSuggestions = [
    {
      id: '7',
      title: '테넷',
      posterUrl: 'https://via.placeholder.com/300x450?text=테넷',
    },
    {
      id: '8',
      title: '덩케르크',
      posterUrl: 'https://via.placeholder.com/300x450?text=덩케르크',
    },
  ];

  const hasResults = searchResults.length > 0;

const hotTalk = [
  {
    id: '1',
    movieTitle: '라라랜드',
    content: '정말 감동적이었어요! 음악이 최고였음.',
    author: '유저123',
    rating: 5,
  },
  {
    id: '2',
    movieTitle: '라라랜드',
    content: '비주얼도 훌륭하고 배우들도 좋았어요!',
    author: '유저456',
    rating: 4,
  },
  {
    id: '2',
    movieTitle: '라라랜드',
    content: '비주얼도 훌륭하고 배우들도 좋았어요!',
    author: '유저456',
    rating: 4,
  },
  {
    id: '2',
    movieTitle: '라라랜드',
    content: '비주얼도 훌륭하고 배우들도 좋았어요!',
    author: '유저456',
    rating: 4,
  },
];

  const allUsers = [
    { id: '1', nickname: '영화덕후123', avatarUrl: 'https://via.placeholder.com/100x100?text=User1' },
    { id: '2', nickname: '라라랜드팬', avatarUrl: 'https://via.placeholder.com/100x100?text=User2' },
    { id: '3', nickname: '라라랜드최고', avatarUrl: 'https://via.placeholder.com/100x100?text=User3' },
    { id: '4', nickname: '인터스텔라광팬', avatarUrl: 'https://via.placeholder.com/100x100?text=User4' },
      { id: '5', nickname: '라라랜드라광팬', avatarUrl: 'https://via.placeholder.com/100x100?text=User4' },

          { id: '6', nickname: '라라랜드아', avatarUrl: 'https://via.placeholder.com/100x100?text=User4' },

  
  ];

const userResults = allUsers.filter(user =>
    user.nickname.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="bg-black min-h-screen px-6 sm:px-10 lg:px-20 py-10 space-y-12">
      <SearchResultHeader query={searchQuery} />

      {hasResults && (
        <>
          <SearchMovieGrid movies={searchResults} />
          <SearchRecommendationGrid
            title="이런 건 어떠세요?"
            movies={recommendations}
          />
          <SearchHotTalkGrid query={searchQuery} reviews={hotTalk} />
                <SearchUserGrid query={searchQuery} users={userResults} />
  </>
      )}

      {!hasResults && (
        <>
          <p className="text-white text-lg font-bold">
            검색 결과가 없습니다.
          </p>
          <SearchRecommendationGrid
            title="혹시 이런 걸 찾으셨나요?"
            movies={similarSuggestions}
          />
        </>
      )}
    </div>
  );
};

export default Search;
