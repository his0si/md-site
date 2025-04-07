import Product from "../models/product.model.js";

// 모든 상품 목록 조회 (id, 상품명, 가격, 남은 수량)
export const getAllProducts = async (req, res) => {
   try {
     const products = await Product.find({}, "id productName price thumbnailImage stock");
     
     console.log("조회된 상품 목록:", products); // 추가된 로그
 
     res.json(products);
   } catch (error) {
     console.log("MongoDB 조회 오류:", error); // 오류 로그 추가
     res.status(500).json({ message: "서버 오류", error });
   }
 };
 

// 개별 상품 상세 조회 (id, 상품명, 가격, 남은 수량, 상세 이미지)
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id, "id productName price stock thumbnailImage detailImage");
    
    if (!product) {
      return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error });
  }
};
