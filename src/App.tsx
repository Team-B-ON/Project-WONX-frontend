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
          <Route path="/movie" element={<MovieDetails />} />
          <Route path="/person/:id" element={<PersonDetails />} />
          <Route path="/genre/:id" element={<GenreDetails />} />
          <Route path="/navbar" element={<TopNavBar />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/person/:id" element={<PersonDetails />} />
          <Route path="/genre/:id" element={<GenreDetails />} />
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
