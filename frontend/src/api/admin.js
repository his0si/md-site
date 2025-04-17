// admin.js
import axios from "axios";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: "/api", // 프록시 설정을 통해 /api로 시작하는 요청은 백엔드로 전달됨
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 결제 상태 업데이트 함수
 * paymentStatus는 '결제확인중' 또는 '결제완료' 값이어야 합니다.
 */
export const updatePaymentStatus = async (orderId, paymentStatus) => {
  try {
    const response = await api.patch(`/orderadmin/${orderId}/payment`, { status: paymentStatus });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * 수령 상태 업데이트 함수
 * received는 불리언 값(true: 수령완료, false: 미수령)
 */
export const updateReceivedStatus = async (orderId, received) => {
  try {
    const response = await api.patch(`/orderadmin/${orderId}/received`, { received });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
