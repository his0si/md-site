import axios from "axios";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
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

// 주문 생성 API 호출
export const createOrder = async (phone, products, totalPrice) => {
  try {
    const response = await api.post("/ordered", {
      phone,
      products,
      totalPrice,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
//모든 주문목록 조회

export const getAllOrders = async () => {
  try {
    const response = await api.get("/orderadmin"); //
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//주문 확인창

export const getOrderCheck = async () => {
  try {
    const response = await api.get("/ordercheck");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const orderAdmin = async () => {
  try {
    const response = await api.get('/orderadmin');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
