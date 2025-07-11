import React, { useState, useEffect } from 'react'
import { Bell, Search } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'  // useLocation 추가
import Logo from '@/assets/common/images/logo2.svg'
import defaultAvatar from "@/assets/common/images/default-avatar.png";

const SCROLL_THRESHOLD = 2
const DEFAULT_AVATAR = defaultAvatar
const transparentClasses =
  'bg-[linear-gradient(180deg,rgba(0,0,0,0.7)_10%,transparent)] text-white'
const solidClasses =
  'bg-[#000000] backdrop-blur-sm text-white'

const TopNavBar: React.FC = () => {
  const [solid, setSolid] = useState(false)
  // 키를 snake_case로 통일
  const [isAuth, setIsAuth] = useState<boolean>(
    () => !!localStorage.getItem('access_token')
  )
  const navigate = useNavigate()
  const location = useLocation()  // location 변화 감지용

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > SCROLL_THRESHOLD)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const check = () => setIsAuth(!!localStorage.getItem('access_token'));
    // const checkAuth = () => setIsAuth(!!localStorage.getItem(ACCESS_KEY));
    window.addEventListener('storage', check);
    // location이 바뀔 때도 실행 (AuthCallback에서 /home으로 navigate 후)
    check();
    return () => window.removeEventListener('storage', check);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    // localStorage.removeItem(ACCESS_KEY)
    // localStorage.removeItem(REFRESH_KEY)
    setIsAuth(false)
    navigate('/')
  }

  const forceSolidOn = ['/mypage']
  const isForceSolid = forceSolidOn.includes(location.pathname)

  return (
    <>
      <header
        className={`
          sticky top-0 inset-x-0 z-50
          h-[68px] px-8 sm:px-11 flex items-center
          transition-colors duration-300 ease-in-out
        ${ (solid || isForceSolid) ? solidClasses : transparentClasses }
        `}
      >
        {/* 로고 */}
        <Link to="/home" className="flex-shrink-0">
          <img src={Logo} alt="WONX Logo" className="w-20 h-auto" />
        </Link>

        {/* 메뉴 */}
        <nav className="ml-8">
          <ul className="flex items-center space-x-6 text-xs md:text-sm">
            <li><Link to="/home"   className="hover:text-gray-300">홈</Link></li>
            <li><Link to="/movies" className="hover:text-gray-300">영화</Link></li>
          </ul>
        </nav>

        {/* 우측 아이콘/버튼 */}
        <div className="ml-auto flex items-center space-x-5">
          {isAuth ? (
            <>
              <button aria-label="검색"><Search size={24} /></button>
              <button aria-label="알림"><Bell size={24} /></button>

              <Link to="/mypage">
                <img
                  src={DEFAULT_AVATAR}
                  alt="User avatar"
                  className="h-8 w-8 rounded-md object-cover"
                />
              </Link>

              <button
                onClick={handleLogout}
                className="text-sm text-gray-300 hover:text-white"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="bg-[#E50914] w-[80px] h-8 rounded text-white text-sm">
                로그인
              </button>
            </Link>
          )}
        </div>
      </header>
    </>
  )
}

export default TopNavBar
