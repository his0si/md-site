import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import MyPage from "./pages/MyPage/MyPage";
import MyPage_info from "./pages/MyPage/MyPage_info";
import MyPage_list from "./pages/MyPage/MyPage_list";

import { Routes, Route } from "react-router-dom";
import MyPage from "./pages/MyPage/MyPage";
import MyPage_info from "./pages/MyPage/MyPage_info";
import MyPage_list from "./pages/MyPage/MyPage_list";
import { useLocation } from "react-router-dom";
import Login from "./pages/login/Login";
import StudentNumber from "./pages/login/StudentNumber";
import RegistrationComplete from "./pages/login/RegistrationComplete";
import AdminPage from "./pages/admin/AdminPage";
import AdminLogin from "./pages/admin/AdminLogin";
import NavBar from "./components/NavBar";
import Cart from "./pages/cart/cart";
import CartEmpty from "./pages/cart/cart_empty";

const App = () => {
  const location = useLocation();

  // 관리자 페이지 해시 라우팅 처리
  if (location.hash === "#/admin") {
    // 로컬 스토리지에서 로그인 상태 확인
    const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    if (!isAdminLoggedIn) {
      window.location.hash = "#/admin/login";
      return null;
    }
    return <AdminPage />;
  }

  // 관리자 로그인 페이지 해시 라우팅 처리
  if (location.hash === "#/admin/login") {
    return <AdminLogin />;
  }

  return (
    <div>
      {/* 로그인 페이지가 아닐 때만 NavBar 표시 */}
      {location.pathname !== "/" &&
        location.pathname !== "/login" &&
        location.pathname !== "/student-number" &&
        location.pathname !== "/registration-complete" && <NavBar />}

      <Routes>
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/MyPage/list" element={<MyPage_list />} />
        <Route path="/MyPage/info" element={<MyPage_info />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-number" element={<StudentNumber />} />
        <Route
          path="/registration-complete"
          element={<RegistrationComplete />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cartEmpty" element={<CartEmpty />} />
      </Routes>
    </div>
  );
};

export default App;
