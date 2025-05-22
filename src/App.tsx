import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import MovieDetails from './pages/MovieDetails'
import NotFound from './pages/NotFound'
import TestPage from './pages/Test'
import Tag from './pages/Tag'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies/1" element={<MovieDetails />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/tag" element={<Tag />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
