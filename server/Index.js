import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import multer from "multer";
import stripeRoutes from "./Stripe.js";
import { register, login } from "./controller/User.js";
import { CartDetails, DeleteCart, RemoveCart, GetCartItems, addToCart, updateCartItem } from "./controller/ShoppingCart.js";
import { createCategory, updateCategory, deleteCategory, getCategory } from "./controller/Category.js";
import { createProduct, deleteProduct, getAllProductsByDepartmentId, productDetail, productget, updateProduct, updateProductQty } from "./controller/Product.js";
import { createCovertype, updateCovertype, getCovertype, deleteCovertype } from "./controller/Covertype.js";
import { CreateOrderHeader, UpdateOrderHeader, DeleteOrderHeader, GetOrderHeadersByUserId,GetAllOrderHeaders } from "./controller/Orderheader.js";

import Stripe from 'stripe';
import ShoppingCartModel from "./model/ShoppingCartModel.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const storageProduct = multer.diskStorage({
  destination: "uploadsProduct/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const uploadsProduct = multer({ storage: storageProduct });

app.post("/product", uploadsProduct.array("images"), createProduct);
app.put("/product/:id", uploadsProduct.array("images"), updateProduct);
app.delete("/product/:id", deleteProduct);
app.get("/product", getAllProductsByDepartmentId);
app.get("/productDetail", productDetail);
app.put("/updateProductQty", updateProductQty);
app.get('/productget', productget);

app.use('/stripe', stripeRoutes);

app.post("/register", register);
app.post("/login", login);
app.post("/cart", addToCart);
app.get("/cart", GetCartItems);
app.put("/cart", updateCartItem);
app.get("/user", CartDetails);
app.put("/user", RemoveCart);
app.delete("/cart", DeleteCart);

app.post('/Category', createCategory);
app.put('/Category/:id', updateCategory);
app.delete('/Category/:id', deleteCategory);
app.get('/Category', getCategory);

app.post("/covertype", createCovertype);
app.put("/covertype/:id", updateCovertype);
app.delete("/covertype/:id", deleteCovertype);
app.get("/covertype", getCovertype);

// Stripe Checkout Session Route
app.post('/order', CreateOrderHeader);
app.put('/order', UpdateOrderHeader);
app.delete('/order', DeleteOrderHeader);
app.get('/order', GetOrderHeadersByUserId);
app.get('/allorders',GetAllOrderHeaders)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY="sk_test_51PhwB1EQWmmOIPSOVfv3IRYumWT4nQVL7oXt2qcdji1Bvp1lV5w7T9Vuq9ZUY8MdgneKi1Jd7op2Ed0hOvSfD0At00QfaWW9ez");

app.post('/create-checkout-session', async (req, res) => {
  const { products } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
  line_items: [
    {
      price_data: {
        currency: 'usd',  // Use correct ISO currency code
        product_data: {
          name: 'T-shirt',
        },
        unit_amount: 123, // In cents for USD
      },
      quantity: 1,
    },
  ],
      mode: 'payment',
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cancel`,
    });
    for (const product of products) {
      try {
        const result = await ShoppingCartModel.deleteOne({ _id: product.id });
        if (result.deletedCount === 1) {
          console.log("Successfully deleted item with id");
        } else {
          console.error("Failed to delete item with id");
        }
      } catch (deleteError) {
        console.error(`Error deleting item with id: ${product.id}`, deleteError);
      }
    }
    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Serve static files from the uploadsProduct directory
app.use(express.static("uploadsProduct/"));

mongoose.connect(process.env.DB_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server running at port:", process.env.PORT);
    });
    console.log("Database connected");
  })
  .catch((e) => {
    console.error("Database connection error:", e);
  });
