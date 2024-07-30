import mongoose from "mongoose";

const OrderHeaderSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    name: {
        type: String,
        required: true,
    },
    streetAddress: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
    },
    postalCode: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
}, 
{ timestamps: true });

const OrderHeaderModel = mongoose.model("order", OrderHeaderSchema);
export default OrderHeaderModel;
