import React, { useState, useEffect } from 'react'
import { Bell, Search } from 'lucide-react'

{/* 하드코딩한 부분들 추후 수정 */}

import Logo from '../../assets/common/images/logo.svg'

const SCROLL_THRESHOLD = 2
const DEFAULT_AVATAR =
  'https://occ-0-3097-993.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABaSDR-kTPhPYcVVGSsV0jC3D-Q5HZSFE6fjzAM-4cMpltx1Gw9AV7OTnL8sYnC6CBxOBZQEAJLjStt822uD2lctOvNR05qM.png?r=962'

const TopNaviBar: React.FC = () => {
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > SCROLL_THRESHOLD)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
      <div className="mx-auto max-w-[1440px] flex items-center justify-start px-11 py-2 h-[68px]">
        <a href="/" className="block">
          <img
            src={Logo}
            alt="NETFLIX Logo"
            className="
              w-20
              sm:w-23
              md:w-26
              lg:w-30
              h-auto
              objection-contain
             "
          />
        </a>

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

        <div className="ml-auto flex items-center space-x-4">
          <button aria-label="검색" className="mr-5">
            <Search size={24} />
          </button>
          <button aria-label="알림" className="mr-5">
            <Bell size={24} />
          </button>
          <a href="/mypage" className="mr-9">
            <img
              src={DEFAULT_AVATAR}
              alt="User avatar"
              className="h-8 w-8 rounded-md object-cover"
            />
          </a>
        </div>
      </div>
    </header>
  )
}

export default TopNaviBar
