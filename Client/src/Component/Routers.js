
import Cart from "./Cart";
import Category from "./Category";
import CoverType from "./CoverType";
import Login from "./Login";
import Product from "./Product";
import Register from "./Register";

const ROUTES = {
    CoverType: {
    name: "/CoverType",
    component: <CoverType />,
  },

  Category: {
    name: "/Category",
    component: <Category />,
  },

  register: {
    name: "/register",
    component: <Register />,
  },

  login: {
    name: "/login",
    component: <Login />,
  },

//   universityAdmin: {
//     name: "/universityAdmin",
//     component: <University />,
//   },

//   departmentAdmin: {
//     name: "/departmentAdmin",
//     component: <Department />,
//   },

  productAdmin: {
    name: "/product",
    component: <Product />,
  },



 



//   productDetails: {
//     name: "/productDetails",
//     component: <ProductDetails />,
//   },
  cart: {
    name: "/cart",
    component: <Cart />,
  },
//   checkout:{
//     name:"/checkout",
//     component:<Checkout/>
//   }
};
export default ROUTES;
