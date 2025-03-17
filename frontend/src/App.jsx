import React from 'react'
import NavBar from './components/NavBar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
