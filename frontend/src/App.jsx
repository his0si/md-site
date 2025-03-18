import { Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import StudentNumber from './pages/login/StudentNumber';
import RegistrationComplete from './pages/login/RegistrationComplete';
import NavBar from './components/NavBar'; 

const App = () => {
  const location = useLocation(); // 현재 경로 가져오기

  return (
    <div>
      {/* 로그인 페이지와 학생 번호 페이지가 아닐 때만 NavBar 표시 */}
      {location.pathname !== "/login" && location.pathname !== "/student-number" && location.pathname !== "/registration-complete" && <NavBar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-number" element={<StudentNumber />} />
        <Route path="/registration-complete" element={<RegistrationComplete />} />
      </Routes>
    </div>
  );
}

export default App;
