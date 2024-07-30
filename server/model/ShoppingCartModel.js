import mongoose from "mongoose";
//import ProductModel from './path/to/productModel';

const ShoppingCartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  count: {
    type: Number,
    default: 1,
  },
});
// Define a virtual field for 'price'
ShoppingCartSchema.virtual("price").get(function () {
  // This is where you can calculate the price dynamically based on your logic
  // For example, you can retrieve the price from the associated product
  // or perform any other calculation
  return this.product.price * this.count;
});
// Ensure the virtual field is included when converting to JSON
ShoppingCartSchema.set("toJSON", { virtuals: true });

const ShoppingCartModel = mongoose.model("shoppingCart", ShoppingCartSchema);

export default ShoppingCartModel;
