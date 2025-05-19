import mongoose from "mongoose";
import Product from "../models/product.model.js";

/**
 * @swagger
 * /api/product-image:
 *   get:
 *     summary: "썸네일 이미지 제공"
 *     description: "introduction 페이지에서 썸네일 이미지를 제공합니다.."
 *     tags:
 *       - "Introduction"
 *     responses:
 *       500:
 *         description: "서버에러"
 */
export const getProductThumnail = async (req, res) => {
    try {
        // thumbnailImage 필드만 조회 (_id 제외)
        const products = await Product.find({}, { thumbnailImage: 1, _id: 0 });

        // 배열 형태로 가공
        const productImage = products.map(product => product.thumbnailImage);

        res.status(200).json({ productImage });
    } catch (error) {
        console.error("Error fetching product thumbnails:", error);
        res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
};