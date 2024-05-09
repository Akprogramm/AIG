import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { images } from './assets';
import { Home, CreatePost } from './pages';

const App = () => {    
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-gray-900 sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
        <Link to="/">
          <img src={images} alt="logo" className="w-10 object-contain" />
        </Link>

        <Link to="/create-post"
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
          Create
        </Link>
      </header>

      <main className="bg-[#dbe4ff]">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/create-post" element={<CreatePost />} /> 
        </Routes>
      </main>

    </BrowserRouter>
  )
}

export default App
