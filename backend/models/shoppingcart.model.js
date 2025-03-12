import mongoose from "mongoose";

const shoppingCartSchema = new mongoose.Schema({
	user : {
		userId : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		nickname : {type : String},
		studentId : {type : Number}
	},
	products: [
		{
			productID : {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
			productName: {type : String, required: true},
			quantity : {type: Number, required: true},
			price : {type: Number},
			thumbnailImage : {type: String}
		}
	]
	createdAt: {type: Date, default: Date.now}
});

const ShoppingCart = new mongoose.model("ShoppingCart", shoppingCartSchema);

export default ShoppingCart;
