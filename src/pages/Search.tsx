import SearchMovieGrid from "@/components/Search/SearchMovieGrid";
import SearchRecommendationGrid from "@/components/Search/SearchRecommendationGrid";
import SearchResultHeader from "@/components/Search/SearchResultHeader";

const Search = () => {
  const searchQuery = '라라랜드';

  // ⭐️ 임시 더미 데이터 → 결과 있음 상태로 만들기
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
