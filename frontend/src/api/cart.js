import { axiosInstance } from './../lib/axios';

const api = axiosInstance;

// 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 장바구니에 상품 추가
export const addToCart = async (productId, quantity) => {
  try {
    const response = await api.post("/cart", {
      productID: productId,
      quantity: quantity,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 장바구니 조회
export const getCart = async () => {
  try {
    const response = await api.get("/cart");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 상품 수량 증가
export const increaseQuantity = async (productId) => {
  try {
    const response = await api.patch("/cart/increase", {
      productId: productId,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 상품 수량 감소
export const decreaseQuantity = async (productId) => {
  try {
    const response = await api.patch("/cart/decrease", {
      productId: productId,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await api.patch("/cart/products", {
      productIds: [productId],
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
