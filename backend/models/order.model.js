import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
	user : {
		userId : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		nickname : {type: String},
		studentId : {type: Number},
		phone: {type : String}
	},
	products : [
	{
		productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
		productName: {type : String, required: true},
		quantity : {type: Number, required: true},
		price : {type: Number},
		thumbnailImage : {type: String}
	
	}
],
	totalPrice: {type : Number},
	status : { type: String, enum : ['결제확인중', '결제완료', '수령완료'] },
	createdAt: { type: Date, default: Date.now }
});

const Order = new mongoose.model("Order", orderSchema);

export default Order;