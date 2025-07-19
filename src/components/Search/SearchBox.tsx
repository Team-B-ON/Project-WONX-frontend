// src/components/common/SearchBox.tsx

import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSearch = () => {
    const q = inputRef.current?.value.trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
    setIsOpen(false);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <div className="relative flex items-center">
      {!isOpen && (
        <button
          aria-label="검색"
          onClick={() => setIsOpen(true)}
          className="z-20 p-2 text-white"
        >
          <Search size={24} />
        </button>
      )}
      <input
        ref={inputRef}
        type="text"
        placeholder="제목, 사람, 장르"
        onBlur={() => setIsOpen(false)}
        onKeyDown={onKeyDown}
        style={{ transformOrigin: 'right center' }}
        className={`
          absolute right-0 top-1/2 -translate-y-1/2
          h-9 bg-black text-gray-300
          placeholder:text-sm placeholder-gray-400
          border border-white
          py-[7px] pl-[43px] pr-[6px]
          transition-all duration-200 ease-in-out
          ${isOpen
            ? 'w-[275px] opacity-100'
            : 'w-0 opacity-0 overflow-hidden'}
        `}
      />
      {isOpen && (
        <Search
          size={21.7}
          className="absolute right-[243px] top-1/2 -translate-y-1/2 text-gray-400 z-10"
        />
      )}
    </div>
  );
};

export default SearchBox;
