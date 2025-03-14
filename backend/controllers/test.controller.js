/**
 * @swagger
 * /api/test/good-day:
 *   get:
 *     summary: 테스트 API
 *     description: 서버 상태를 테스트하고 간단한 메시지를 반환합니다.
 *     tags:
 *       - Test
 *     responses:
 *       200:
 *         description: 성공적으로 메시지를 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "좋은 하루 되세요 😁"
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
export const getTest =  async (req, res)=>{
    try{
        res.status(200).json({
            message: "좋은 하루 되세요 😁"
        });
    }catch(error){
        console.log("test failed...");
        res.status(500).json({
            message: "Internal Sever Error"
        });
    }
}