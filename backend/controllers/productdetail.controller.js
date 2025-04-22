import Product from "../models/product.model.js";
/**
 * @swagger
 * /api/products/detail:
*   post:
*      summary: 상품 상세 정보 조회
*      description: productID를 이용하여 상품의 이름, 가격, 썸네일, 디테일 이미지를 조회합니다.
*      tags:
*       - Product
*      requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                productID:
*                  type: string
*                  example: "67eb495923acdd43ec86ef90"
*      responses:
*        '200':
*          description: 상품 상세 정보 반환 성공
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                    example: 상품 상세 내용이 성공적으로 전달되었습니다.
*                  data:
*                    type: object
*                    properties:
*                      productName:
*                        type: string
*                        example: "아메리카노"
*                      price:
*                        type: number
*                        example: 4500
*                      thumbnailImage:
*                        type: string
*                        example: "https://example.com/images/americano_thumbnail.jpg"
*                      detailImage:
*                        type: string
*                        example: "https://example.com/images/americano_detail.jpg"
*        '404':
*          description: 해당 productId를 가진 제품이 존재하지 않음
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                    example: 해당 productId를 가진 제품이 없습니다.
*        '500':
*          description: 서버 에러
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                    example: Internal Server Error
*/

export const productDetail = async (req, res)=>{
    try {
        //front에서 productId 받아오기
        const productID = req.body.productID;
        console.log("🔥 받은 productID:", productID);
        //해당 productId를 가진 product 찾기
        const db_product = await Product.findById(productID);

        //db에서 product 못찾으면 404오류
        if (!db_product) {
            return res.status(404).json({ message: "해당 productId를 가진 제품이 없습니다." });
        }

        console.log(db_product);

        //db에서 name, price, thumbnail image, detail image 정보 가져오기
        const productName = db_product.productName;
        const price = db_product.price;
        const thumbnailImage = db_product.thumbnailImage;
        const detailImage = db_product.detailImage;
        const stock = db_product.stock;

        //front에 db에서 찾은 정보들 넘겨주기
        return res.status(200).json({
            message: "상품 상세 내용이 성공적으로 전달되었습니다."
            ,
            data: {
                productName,
                price,
                thumbnailImage,
                detailImage,
                stock
            }
         });

    }
    catch (error) {
        //서버 오류
        return res.status(500).json({ message: error.message });
    }
    
}