import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	productName: {type : String, required: true},
	price: {type: Number, required: true},
	thumbnailImage : {type : String},
	detailImage: {type : String}, // 디테일 내용 이미지
	stock: {type: Number, required: true}
});

const Product = new mongoose.model("Product", productSchema);

export default Product;