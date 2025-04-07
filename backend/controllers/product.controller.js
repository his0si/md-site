// 모든 상품 목록 조회 (id, 상품명, 가격, 남은 수량)
/**
 * @swagger
 * /products:
 *   get:
 *     summary: 모든 상품 목록 조회
 *     description: 상품의 id, 상품명, 가격, 남은 수량을 조회합니다.
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: 성공적으로 상품 목록을 조회했습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: 상품 ID
 *                   productName:
 *                     type: string
 *                     description: 상품명
 *                   price:
 *                     type: number
 *                     description: 상품 가격
 *                   stock:
 *                     type: number
 *                     description: 남은 수량
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}, "id productName price stock");
    console.log("조회된 상품 목록:", products);
    res.json(products);
  } catch (error) {
    console.log("MongoDB 조회 오류:", error);
    res.status(500).json({ message: "서버 오류", error });
  }
};

// 개별 상품 상세 조회 (id, 상품명, 가격, 남은 수량, 상세 이미지)
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: 개별 상품 상세 조회
 *     description: 특정 상품의 상세 정보를 조회합니다.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 조회할 상품의 ID
 *     responses:
 *       200:
 *         description: 성공적으로 상품 정보를 조회했습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: 상품 ID
 *                 productName:
 *                   type: string
 *                   description: 상품명
 *                 price:
 *                   type: number
 *                   description: 상품 가격
 *                 stock:
 *                   type: number
 *                   description: 남은 수량
 *                 detailImage:
 *                   type: string
 *                   description: 상세 이미지 URL
 */
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id, "id productName price stock detailImage");
    if (!product) {
      return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error });
  }
};
