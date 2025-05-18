import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { logoutAPI, withdrawAPI } from "../../api/user";
import WithdrawModal from "./WithdrawModal";
import { useState } from "react";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 500px;
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: auto;
  padding-top: 50px;
`;

const Box = styled.button`
  width: 100%;
  height: 150px;
  border: 1px solid RGB(220, 220, 220);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 0px;
  justify-content: center;

  background: white;
`;

const Row = styled.div`
  display: flex;
  width: 90%;
  gap: 20px;
  margin-top: 35px;
`;

const MyPage = () => {
  const navigate = useNavigate();

  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutAPI();
      alert("로그아웃 되었습니다");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  const handleWithdraw = async () => {
    if (!window.confirm("정말 탈퇴하시겠습니까?")) return;

    try {
      await withdrawAPI();
      alert("회원탈퇴가 완료되었습니다");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("회원탈퇴 중 오류가 발생하였습니다");
    }
  };

  return (
    <>
      <Container>
        <div
          style={{
            color: "#167D4E",
            fontSize: "20px",
            fontWeight: "700",
            marginBottom: "10vh",
            marginTop: "5vh",
          }}
        >
          마이페이지
        </div>

        <Link
          to="/my-page/list"
          style={{ textDecoration: "none", color: "black", width: "90%" }}
        >
          <Box style={{ marginBottom: "35px" }}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.3333 14V25.6667H4.66665V14M14 25.6667V8.16671M14 8.16671H8.74998C7.97643 8.16671 7.23457 7.85942 6.68758 7.31244C6.1406 6.76545 5.83331 6.02359 5.83331 5.25004C5.83331 4.47649 6.1406 3.73463 6.68758 3.18765C7.23457 2.64066 7.97643 2.33337 8.74998 2.33337C12.8333 2.33337 14 8.16671 14 8.16671ZM14 8.16671H19.25C20.0235 8.16671 20.7654 7.85942 21.3124 7.31244C21.8594 6.76545 22.1666 6.02359 22.1666 5.25004C22.1666 4.47649 21.8594 3.73463 21.3124 3.18765C20.7654 2.64066 20.0235 2.33337 19.25 2.33337C15.1666 2.33337 14 8.16671 14 8.16671ZM2.33331 8.16671H25.6666V14H2.33331V8.16671Z"
                stroke="#1E1E1E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p style={{ fontSize: "16px", fontWeight: "600" }}>
              내 주문 목록 확인하기
            </p>
          </Box>
        </Link>

        <Link
          to="/my-page/info"
          style={{ textDecoration: "none", color: "black", width: "90%" }}
        >
          <Box>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 18.6666V14M14 9.33331H14.0116M25.6666 14C25.6666 20.4433 20.4433 25.6666 14 25.6666C7.55666 25.6666 2.33331 20.4433 2.33331 14C2.33331 7.55666 7.55666 2.33331 14 2.33331C20.4433 2.33331 25.6666 7.55666 25.6666 14Z"
                stroke="#1E1E1E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p style={{ fontSize: "16px", fontWeight: "600" }}>
              상품 수령 정보 확인하기
            </p>
          </Box>
        </Link>

        {/* 회원가입, 로그인 api 연결 */}
        <Row>
          <Box onClick={handleLogout} style={{ width: "50%", height: "120%" }}>
            <p style={{ fontSize: "12px", fontWeight: "600" }}>로그아웃</p>
          </Box>
          <Box
            onClick={() => setWithdrawModalOpen(true)}
            style={{ width: "50%", height: "120%" }}
          >
            <p style={{ fontSize: "12px", fontWeight: "600" }}>회원탈퇴</p>
          </Box>
        </Row>
      </Container>

      {withdrawModalOpen && (
        <WithdrawModal
          modalOpen={withdrawModalOpen}
          setModalOpen={setWithdrawModalOpen}
        />
      )}
    </>
  );
};

export default MyPage;
