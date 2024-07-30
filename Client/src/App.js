import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Categories from "./Component/Category";
import CoverType from "./Component/CoverType";
import Hader from "./Component/Hader";
import Product from "./Component/Product";
import Home from "./Component/Home";
import ViewDetails from "./Component/ViewDetails";
import Login from "./Component/Login";
import Register from "./Component/Register";
import Cart from "./Component/Cart";
import Checkout from "./Component/Checkout"

import Success1 from "./Component/Success1";

function App() {
 

  return (
   
    <div>
      <BrowserRouter>
      
        <Hader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Category" element={<Categories />} />
          <Route path="/CoverType" element={<CoverType />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/ViewDetails" element={<ViewDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/success" element={<Success1/>}/>


        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
