import React, { useState, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Logo from '@/assets/common/images/logo2.svg'
import defaultAvatar from "@/assets/common/images/default-avatar.png"
import SearchBox from '../Search/SearchBox'

const SCROLL_THRESHOLD = 2
const DEFAULT_AVATAR = defaultAvatar
const transparentClasses =
  'bg-[linear-gradient(180deg,rgba(0,0,0,0.7)_10%,transparent)] text-white'
const solidClasses =
  'bg-[#000000] backdrop-blur-sm text-white'

const TopNavBar: React.FC = () => {
  const [solid, setSolid] = useState(false)
  const [isAuth, setIsAuth] = useState<boolean>(
    () => !!localStorage.getItem('access_token')
  )
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > SCROLL_THRESHOLD)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const check = () => setIsAuth(!!localStorage.getItem('access_token'))
    window.addEventListener('storage', check)
    check()
    return () => window.removeEventListener('storage', check)
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setIsAuth(false)
    navigate('/')
  }

  const forceSolidOn = ['/mypage']
  const isForceSolid = forceSolidOn.includes(location.pathname)

  return (
    <header
      className={`
        sticky top-0 inset-x-0 z-50
        h-[68px] px-8 sm:px-11 flex items-center
        transition-colors duration-300 ease-in-out
        ${solid || isForceSolid ? solidClasses : transparentClasses}
      `}
    >
      {/* 로고 */}
      <Link to="/home" className="flex-shrink-0">
        <img src={Logo} alt="WONX Logo" className="w-20 h-auto" />
      </Link>

      {/* 메뉴 */}
      <nav className="ml-8">
        <ul className="flex items-center space-x-6 text-xs md:text-sm">
          <li><Link to="/home" className="hover:text-gray-300">홈</Link></li>
          <li className="hover:text-gray-300">영화</li>
        </ul>
      </nav>

      {/* 우측 아이콘/버튼 */}
      <div className="ml-auto flex items-center space-x-5">
        {isAuth ? (
          <>
            <SearchBox />
            <button aria-label="알림" className='cursor-pointer'>
              <Bell size={24} />
            </button>
            <Link to="/mypage">
              <img
                src={DEFAULT_AVATAR}
                alt="User avatar"
                className="h-8 w-8 rounded-md object-cover"
              />
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-300 hover:text-white font-medium cursor-pointer"
            >
              로그아웃
            </button>
          </>
        ) : (
          <Link to="/">
            <button className="bg-[#E50914] w-[71px] h-[32px] rounded-[4px] cursor-pointer 
                                transition-colors duration-200 ease-in-out hover:bg-[rgb(193,17,25)]
                                text-white text-[14px] font-medium
                                flex items-center justify-center">
              로그인
            </button>
          </Link>
        )}
      </div>
    </header>
  )
}

export default TopNavBar
