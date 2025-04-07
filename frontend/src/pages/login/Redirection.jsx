import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../lib/axios';

const Redirection = () => {
    const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    console.log(code);
    if (code) {
      axiosInstance
        .get("/login/kakao-login", {
          params: { code: code },
        })
        .then((response) => {
            if (response.status === 201) {
                navigate('/');
              } else if (response.status === 200) {
                navigate('/student-number');
              } else {
                console.warn("예상치 못한 응답 코드:", response.status);
              }
        })
        .catch((err) => {
          console.error("로그인 실패:", err);
        });
    }
  }, [code, navigate]);
  return (
    <div>
      로그인 중입니다...
    </div>
  )
}

export default Redirection
