import Home from "./pages/home/Home";
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
import useViewportHeight from "./components/useViewportHeight";
import OrderPage from "./pages/order/OrderPage";
import OrderComplete from "./pages/order/OrderComplete";
import NavBar2 from "./components/NavBar2";
import ProductDetail from "./pages/product/ProductDetail";

const App = () => {
  const location = useLocation();
  useViewportHeight();

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

  // 네비바가 없는 페이지들
  const noNavBarPages = ["/login", "/student-number", "/registration-complete"];

  // NavBar1이 있는 페이지들 (아이콘 3개)
  const navBar1Pages = [
    "/",
    "/cartEmpty",
    "/order-complete",
    "/product-detail",
  ];

  // NavBar2가 있는 페이지들 (뒤로가기, 홈)
  const navBar2Pages = ["/MyPage", "/MyPage/list", "/MyPage/info", "/cart"];

  return (
    <div>
      {/* 네비바 조건부 렌더링 */}
      {!noNavBarPages.includes(location.pathname) && (
        <>
          {navBar1Pages.includes(location.pathname) && <NavBar />}
          {navBar2Pages.includes(location.pathname) && <NavBar2 />}
        </>
      )}

      <Routes>
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/MyPage/list" element={<MyPage_list />} />
        <Route path="/MyPage/info" element={<MyPage_info />} />
        {/* <Route path="/MyPage/order" element={<MyOrderPage />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-number" element={<StudentNumber />} />
        <Route
          path="/registration-complete"
          element={<RegistrationComplete />}
        />
        <Route path="/order-page" element={<OrderPage />} />
        <Route path="/order-complete" element={<OrderComplete />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cartEmpty" element={<CartEmpty />} />
      </Routes>
    </div>
  );
};

export default App;
