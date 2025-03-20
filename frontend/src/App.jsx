
import Home from './pages/home/Home';
import { Routes, Route} from "react-router-dom";
import MyPage from './pages/MyPage';
import MyPage_info from './pages/MyPage_info';
import MyPage_list from './pages/MyPage_list';
import { Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import StudentNumber from './pages/login/StudentNumber';
import RegistrationComplete from './pages/login/RegistrationComplete';
import AdminPage from './pages/admin/AdminPage';
import AdminLogin from './pages/admin/AdminLogin';
import NavBar from './components/NavBar'; 

const App = () => {
  const location = useLocation(); 

  // 관리자 페이지 해시 라우팅 처리
  if (location.hash === '#/admin') {
    // 로컬 스토리지에서 로그인 상태 확인
    const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (!isAdminLoggedIn) {
      window.location.hash = '#/admin/login';
      return null;
    }
    return <AdminPage />;
  }

  // 관리자 로그인 페이지 해시 라우팅 처리
  if (location.hash === '#/admin/login') {
    return <AdminLogin />;
  }

  return (
    <div>
      {/* 로그인 페이지가 아닐 때만 NavBar 표시 */}
      {location.pathname !== "/login" && location.pathname !== "/student-number" && location.pathname !== "/registration-complete" && <NavBar />}
      
      <Routes>
         <Route path="/MyPage" element={<MyPage/>}/>
         <Route path="/MyPage/list" element={<MyPage_list/>}/>
         <Route path="/MyPage/info" element={<MyPage_info/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-number" element={<StudentNumber />} />
        <Route path="/registration-complete" element={<RegistrationComplete />} />
      </Routes>
    </div>
  );
}

export default App;
