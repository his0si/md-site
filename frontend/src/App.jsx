import React from 'react'

import Home from './pages/home/Home';
import { Routes, Route} from "react-router-dom";
import MyPage from './pages/MyPage';
import MyPage_info from './pages/MyPage_info';
import MyPage_list from './pages/MyPage_list';

const App = () => {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Home/>} />

      <Route path="/MyPage" element={<MyPage/>}/>
      <Route path="/MyPage/list" element={<MyPage_list/>}/>
      <Route path="/MyPage/info" element={<MyPage_info/>}/>
    </Routes>
    </div>
  )
}

export default App
