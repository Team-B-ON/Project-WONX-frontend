interface SearchResultHeaderProps {
  query: string;
}

export default function SearchResultHeader({ query }: SearchResultHeaderProps) {
  return (
    <div className="mb-6">
      <h2 className="text-white text-2xl font-bold">
        <span className="text-pink-500">@{query}</span>의 검색 결과
      </h2>
    </div>
  );
}
