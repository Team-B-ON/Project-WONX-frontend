import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import MovieDetails from './pages/MovieDetails'
import NotFound from './pages/NotFound'
import SignUp from './pages/SignUp'
import TestPage from './pages/Test'
import Tag from './pages/Tag'
import TopNavBar from './components/common/TopNavBar'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/movies/1" element={<MovieDetails />} />
        <Route path="/movies/list" element={<TestPage />} />
        <Route path="/movies/tag" element={<Tag />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/navbar" element={<TopNavBar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
