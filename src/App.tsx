import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import MovieDetails from './pages/MovieDetails'
import NotFound from './pages/NotFound'
import SignUp from './pages/SignUp'
import Search from './pages/Search'
import TopNavBar from './components/common/TopNavBar'
import MyPage from './pages/MyPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movies/1" element={<MovieDetails />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/navbar" element={<TopNavBar />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
