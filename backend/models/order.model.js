// order.model.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    studentId: { type: String },
    phone: { type: String }
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      productName: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number },
      thumbnailImage: { type: String }
    }
  ],
  totalPrice: { type: Number },
  // 결제 상태는 '결제확인중'과 '결제완료'만 허용 (기본값 결제확인중)
  status: { type: String, enum: ['결제확인중', '결제완료'], default: '결제확인중' },
  // 수령 상태: true면 수령완료, false면 미수령 (기본값 false)
  received: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
