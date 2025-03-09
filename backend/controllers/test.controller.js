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