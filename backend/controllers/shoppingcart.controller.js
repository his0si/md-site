import User from '../models/user.model.js';
import ShoppingCart from './../models/shoppingcart.model.js';
import Product from './../models/product.model.js';

// 장바구니에 상품 추가

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: 장바구니에 상품 추가
 *     tags:
 *       - Cart
 *     description: 사용자 로그인 후 상품을 장바구니에 추가합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productID:
 *                 type: string
 *                 example: "660180ecbaceec1cd732a885"
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: 장바구니에 상품 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "20220001님이 장바구니에 노트북을 담으셨습니다."
 *       400:
 *         description: 요청 데이터 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "상품과 수량을 정확히 입력해야 합니다."
 *       401:
 *         description: 인증 실패 (로그인 필요)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "로그인 후 이용해주세요. 😊"
 *       404:
 *         description: 학번이 없거나 상품이 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "해당 회원의 학번이 존재하지 않습니다."
 *       500:
 *         description: 서버 내부 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
export const addProductInCart = async (req, res)=>{
    console.log(req.session);
    const userId = req.session.user?.id;
    const productID = req.body.productID;
    const quantity = req.body.quantity;
    if(!userId){
        return res.status(401).json({message : "로그인 후 이용해주세요. 😊"});
    }
    if(!productID || !quantity){
        return res.status(400).json({message: "상품과 수량을 정확히 입력해야 합니다."});
    }


    try {
        // 이전의 장바구니 가지고 오기
    const oldCart = await ShoppingCart.findOne({"user.userId" : userId});
    const product = await Product.findOne({_id : productID});

    if(!product){
        return res.status(404).json({message : "해당되는 상품이 존재하지 않습니다."});
    }

    console.log(product);

    // 이전에 쇼핑카트 만든 적이 없어서 새로 만들어야 됨
    if(!oldCart){
        // 로그인한 유저 학번 가져옴
        const user = await User.findOne({_id : userId});
        const studentID = user?.studentId;
        if(!studentID){
            return res.status(404).json({message : "해당 회원의 학번이 존재하지 않습니다."});
        }
        // 카트 새로 생성하고 구매할 상품 추가
        const Cart = new ShoppingCart({
            user : {
                userId : userId,
                studentId : studentID
            },
            products: [
                {
                    productID : productID,
                    productName : product.productName,
                    quantity : quantity,
                    price : product.price,
                    thrumbnailimage : product.thumbnailimage
                }
            ]
        });
        await Cart.save();
        
    } else{ // 원래 카트에 추가하기
        const existingProductIndex = oldCart.products.findIndex(p => p.productID.toString() === productID);

        if(existingProductIndex !== -1){
            oldCart.products[existingProductIndex].quantity += quantity;
        } else {
            oldCart.products.push({
                productID : productID,
                productName: product.productName,
                quantity: quantity,
                price : product.price,
                thumbnailimage : product.thumbnailimage
            })
        }

        await oldCart.save();
    }

    return res.status(201).json({
        message : `회원님이 장바구니에 ${product.productName}을 담으셨습니다.`
    });
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error"});
    }
}

// 해당 회원의 장바구니 불러오기

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: 장바구니 불러오기
 *     description: 로그인한 사용자의 장바구니 정보를 불러옵니다.
 *     tags:
 *       - Cart
 *     responses:
 *       200:
 *         description: 장바구니 상품 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 장바구니에 있는 상품 목록 전달
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: string
 *                         example: "64f7e0b3e8c1c11b6c9b85a1"
 *                       productName:
 *                         type: string
 *                         example: "무선 키보드"
 *                       thumbnail:
 *                         type: string
 *                         example: "https://example.com/thumbnail.jpg"
 *                       price:
 *                         type: number
 *                         example: 35000
 *                       quantity:
 *                         type: integer
 *                         example: 2
 *       401:
 *         description: 인증되지 않은 사용자
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 로그인 후 이용해주세요😅
 *       404:
 *         description: 장바구니에 상품이 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 장바구니에 아직 상품이 없습니다😎
 *       500:
 *         description: 서버 내부 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
export const getUserCart = async (req, res)=>{
    try {
        const userId = req.session.user?.id;
        if(!userId){
            return res.status(401).json({message : "로그인 후 이용해주세요😅"});
        }
        const cart = await ShoppingCart.findOne({"user.userId": userId});
        if(!cart || cart.products.length === 0){
            return res.status(404).json({message : "장바구니에 아직 상품이 없습니다😎"});
        }
        // 상품 아이디, 상품 이름, 상품 썸네일, 가격, 수량 가져오면 됨...
        return res.status(200).json({
            message : "장바구니에 있는 상품 목록 전달",
            data : cart.products
        });
    } catch (error) {
        return res.status(500).json({message : "Internal server error"});
    }
}