import React, { useState, useEffect, useRef } from 'react'
import { Bell, Search } from 'lucide-react'

// 하드코딩한 로고 및 프사 추후 변경
import Logo from '../../assets/common/images/logo.svg'

const SCROLL_THRESHOLD = 2
const DEFAULT_PROFILE =
  'https://occ-0-3097-993.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABaSDR-kTPhPYcVVGSsV0jC3D-Q5HZSFE6fjzAM-4cMpltx1Gw9AV7OTnL8sYnC6CBxOBZQEAJLjStt822uD2lctOvNR05qM.png?r=962'

const TopNavBar: React.FC = () => {
  const [solid, setSolid] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // 스크롤 배경
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > SCROLL_THRESHOLD)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus()
    }
  }, [isSearchOpen])

  const handleSearch = () => {
      const q = inputRef.current?.value.trim()
      if (q) window.location.href = `/search?query=${encodeURIComponent(q)}`
      setIsSearchOpen(false)
  }

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleSearch()
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        setIsSearchOpen(false)
        inputRef.current?.blur()
      }
    }

  return (
    <header
      className={`
        sticky top-0 inset-x-0 z-50
        transition-colors duration-300 ease-in-out
        backdrop-blur-sm
        ${solid
          ? 'bg-black text-white'
          : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent text-white'}
      `}
    >
      <div className="mx-auto max-w-[1440px] flex items-center px-0 py-0 h-[68px]">
        {/* 로고 */}
        <a href="/" className="block pl-[47.5547px]">
          <img
            src={Logo}
            alt="NETFLIX Logo"
            className="w-20 sm:w-23 md:w-26 lg:w-30 h-auto object-contain"
          />
        </a>

        {/* 메뉴 */}
        <nav className="ml-8">
          <ul className="flex items-center space-x-6 text-[0.625rem] sm:text-xs md:text-sm">
            <li>
              <a href="/" className="hover:text-gray-300">
                홈
              </a>
            </li>
            <li>
              <a href="/movies/list" className="hover:text-gray-300">
                영화
              </a>
            </li>
          </ul>
        </nav>

        {/* 오른쪽 아이콘 그룹 */}
        <div className="ml-auto flex items-center space-x-4 relative">
          {/* 검색 버튼 & 입력창 래퍼 */}
          <div className="relative flex items-center">
            {!isSearchOpen && (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="z-20 p-2 text-white"
            >
              <Search size={24} />
            </button>
            )}

            <input
              ref={inputRef}
              type="text"
              placeholder="제목, 사람, 장르"
              onBlur={() => setIsSearchOpen(false)}
              onKeyDown={onKeyDown}
              style={{ transformOrigin: 'right center' }}
              className={`
                absolute right-0 top-1/2 -translate-y-1/2
                h-9 bg-black text-gray-300
                placeholder:text-sm placeholder-gray-400
                border border-white rounded-none
                focus:outline-none focus:ring-0.4 focus:ring-white
                py-[7px] pl-[43px] pr-[6px]
                transition-all duration-200 ease-in-out
                ${isSearchOpen
                  ? 'w-[275px] opacity-100'
                  : 'w-0 opacity-0 overflow-hidden'}
              `}
            />

            {isSearchOpen && (
              <Search
                size={21.71}
                className="
                  absolute right-[243px] top-1/2 -translate-y-1/2
                  text-white-400 z-10
                "
              />
            )}
          </div>

          {/* 알림 버튼 */}
          <button aria-label="알림" className="z-20 p-2 text-white">
            <Bell size={24} />
          </button>

          {/* 프로필 버튼 */}
          <a href="/mypage" className="block pr-[47.5547px] z-20">
            <img
              src={DEFAULT_PROFILE}
              alt="User profile"
              className="h-8 w-8 rounded-md object-cover"
            />
          </a>
        </div>
      </div>
    </header>
  )
}

export default TopNavBar