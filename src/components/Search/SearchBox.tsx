import React, { useState, useEffect, useRef, JSX } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  autocompleteMovieTitles,
  autocompletePeople,
  autocompleteGenres,
  autocompleteReviews,
} from '@/services/api/SearchPage/SearchApi';

const highlightMatch = (text: string, query: string): JSX.Element => {
  if (!query.trim()) return <>{text}</>;

  const regex = new RegExp(`(${query})`, 'gi'); // 대소문자 무시
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="bg-yellow-300 text-black">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

const SearchBox: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // 자동완성 API 호출
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        Promise.all([
          autocompleteMovieTitles(query),
          autocompletePeople(query),
          autocompleteGenres(query),
          autocompleteReviews(query),
        ])
          .then(([movies, people, genres, reviews]) => {
            const merged = [...movies, ...people, ...genres, ...reviews];
            const unique = Array.from(new Set(merged));
            setSuggestions(unique.slice(0, 8)); // 최대 8개만 표시
          })
          .catch((err) => {
            console.error('Autocomplete error:', err);
            setSuggestions([]);
          });
      } else {
        setSuggestions([]);
      }
    }, 200); // debounce 200ms

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
      setSuggestions([]);
      setIsFocused(false);
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsFocused(false);
    }
  };

  const handleSuggestionClick = (text: string) => {
    navigate(`/search?query=${encodeURIComponent(text)}`);
    setSuggestions([]);
    setIsFocused(false);
  };

  return (
    <div className="relative flex items-center">
      <input
        ref={inputRef}
        type="text"
        placeholder="제목, 사람, 장르, 리뷰"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 100)} // blur 전에 클릭되도록
        onKeyDown={onKeyDown}
        className="h-9 w-[275px] bg-black text-gray-300
                   placeholder:text-sm placeholder-gray-400
                   border border-white
                   py-[7px] pl-10 pr-[6px]
                   transition-all duration-200 ease-in-out
                   rounded-md"
      />
      <Search
        size={20}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 cursor-pointer"
        onClick={handleSearch}
      />

      {isFocused && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 mt-1 w-full bg-black border border-white rounded-md shadow-md z-30 max-h-60 overflow-y-auto">
          {suggestions.map((text, index) => (
            <li
              key={index}
              className="px-3 py-2 hover:bg-white hover:text-black cursor-pointer text-sm"
              onMouseDown={() => handleSuggestionClick(text)}
            >
              {highlightMatch(text, query)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
