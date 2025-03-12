import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	nickname: {type: String, required: true},
	email: {type:String, required : true},
	studentId: {type: String},
	createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

export default User;