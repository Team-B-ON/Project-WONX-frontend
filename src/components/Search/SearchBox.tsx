import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  autocompleteMovieTitles,
  autocompletePeople,
  autocompleteGenres,
  autocompleteReviews,
} from '@/services/api/SearchPage/SearchApi';

const SearchBox: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
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
            setSuggestions(unique.slice(0, 8));
          })
          .catch((err) => {
            console.error('Autocomplete error:', err);
            setSuggestions([]);
          });
      } else {
        setSuggestions([]);
      }
    }, 200);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSuggestions([]);
      setIsExpanded(false);
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsExpanded(false);
    }
  };

  const handleSuggestionClick = (text: string) => {
    setQuery(text); // 🔥 선택된 항목으로 상태 업데이트
    navigate(`/search?q=${encodeURIComponent(text.trim())}`);
    setSuggestions([]);
    setIsExpanded(false);
  };

  useEffect(() => {
    if (isExpanded) inputRef.current?.focus();
  }, [isExpanded]);

  return (
    <div className="relative">
      <div className="flex items-center">
        {!isExpanded && (
          <button
            aria-label="검색"
            onClick={() => setIsExpanded(true)}
            className="z-20 py-2 text-white"
          >
            <Search size={24} />
          </button>
        )}

        {/* 입력창 */}
        <input
          ref={inputRef}
          type="text"
          placeholder="제목, 사람, 장르, 리뷰"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={() => setTimeout(() => setIsExpanded(false), 100)}
          onKeyDown={onKeyDown}
          style={{ transformOrigin: 'right center' }}
          className={`
            h-9 bg-black text-gray-300
            placeholder:text-sm placeholder-gray-400
            rounded-md
            transition-all duration-200 ease-in-out
            ${isExpanded ? 'w-[275px] opacity-100 border border-white py-[7px] pl-[43px] pr-[6px]' : 'w-0 opacity-0 border-0 p-0'}
          `}
        />

        {/* 검색 아이콘 */}
        {isExpanded && (
          <Search
            size={21}
            className="absolute right-[6px] top-1/2 -translate-y-1/2 text-gray-400 z-20 cursor-pointer"
            onClick={handleSearch}
          />
        )}
      </div>

      {/* 자동완성 리스트 */}
      {isExpanded && suggestions.length > 0 && (
        <ul className="absolute top-[calc(100%+2px)] right-0 w-[275px] bg-black border border-white rounded-md shadow-md z-30 max-h-60 overflow-y-auto">
          {suggestions.map((text, index) => (
            <li
              key={index}
              className="px-3 py-2 hover:bg-white hover:text-black cursor-pointer text-sm"
              onMouseDown={() => handleSuggestionClick(text)}
            >
              {text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
