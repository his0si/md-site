import { Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import NavBar from './components/NavBar'; // 네비바 컴포넌트 임포트

const App = () => {
  const location = useLocation(); // 현재 경로 가져오기

  return (
    <div>
      {/* 로그인 페이지가 아닐 때만 NavBar 표시 */}
      {location.pathname !== "/login" && <NavBar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
