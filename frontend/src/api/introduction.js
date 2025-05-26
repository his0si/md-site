//home 화면에서 상품 썸네일을 백엔드에서 프론트로 보내주는 api
import { axiosInstance } from './../lib/axios';
const api = axiosInstance;

export const thumbnailImages = async () => {
    try{
        const { data } = await api.get('/product-image');
        return data.productImage;
    } catch (error) {
        console.error("썸네일 불러오기 실패", error);
        return [];
    }
}