import React from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import MovieDetails from './pages/MovieDetails'
import NotFound from './pages/NotFound'
import SignUp from './pages/SignUp'
import Search from './pages/Search'
import TopNavBar from './components/common/TopNavBar'
import MyPage from './pages/MyPage'
import PersonDetails from './pages/PersonDetails'
import GenreDetails from './pages/GenreDetails'
import AuthCallback from './pages/AuthCallback'
import Users from './pages/admin/Users'
import Movies from './pages/admin/Movies';
import Likes from './pages/admin/Likes';
import Bookmarks from './pages/admin/Bookmarks';
import Reviews from './pages/admin/Reviews';
import People from './pages/admin/People';
import HotTalks from './pages/admin/HotTalks';
import WatchHistories from './pages/admin/WatchHistories';

function AppRoutes() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        {/* NavBar 없이 로그인·회원가입·콜백만 */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* NavBar 포함하는 레이아웃 */}
        <Route element={<><TopNavBar /><Outlet/></>}>
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/person/:id" element={<PersonDetails />} />
          <Route path="/genre/:id" element={<GenreDetails />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/movies" element={<Movies />} />
          <Route path="/admin/likes" element={<Likes />} />
          <Route path="/admin/bookmarks" element={<Bookmarks />} />
          <Route path="/admin/reviews" element={<Reviews />} />
          <Route path="/admin/people" element={<People />} />
          <Route path="/admin/hot-talks" element={<HotTalks />} />
          <Route path="/admin/watch-histories" element={<WatchHistories />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/person/:id" element={<PersonDetails />} />
          <Route path="/genre/:id" element={<GenreDetails />} />
          <Route path="*" element={<MovieDetails />} />
        </Routes>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
