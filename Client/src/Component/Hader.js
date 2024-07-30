import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
  const [user, setUser] = useState({ id: null, role: null });
  const [userCartItem, setUserCartItem] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");
    if (id) {
      setUser({ id, role });
      fetchUserCartItemCount(id);
    }
  }, []);

  useEffect(() => {
    if (user.id) {
      fetchUserCartItemCount(user.id);
    }
  }, [user]);

  const fetchUserCartItemCount = async (userId) => {
    try {
      const { data } = await axios.get(`http://localhost:8001/user?userId=${userId}`);
      setUserCartItem(data.cartData.length);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const renderMenu = () => (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to={"/"}>
          Home
        </Link>
      </li>
      {user.role === "user" ? (
        <>
          <li className="nav-item active">
            <Link className="nav-link" to={"/Product"}>
              Product
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to={"/CoverType"}>
              CoverType
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to={"/Category"}>
              Category
            </Link>
          </li>
        </>
      ) : (
        <li className="nav-item active">
          <Link className="nav-link" to={"/contact"}>
            Contact
          </Link>
        </li>
      )}
      <li className="nav-item active">
        <Link className="nav-link" to={user.id ? "/cart" : "/login"}>
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/ios-glyphs/30/shopping-cart--v1.png"
            alt="shopping-cart"
          />
          ({userCartItem})
        </Link>
      </li>
    </ul>
  );

  const renderButtons = () => (
    user.id ? (
      <button
        className="btn btn-outline-success my-2 my-sm-0"
        onClick={() => {
          localStorage.clear();
          setUser({ id: null, role: null });
          navigate("/login");
        }}
      >
        Log Out
      </button>
    ) : (
      <div>
        <Link to={"/register"} className="btn btn-outline-success my-2 my-sm-0">
          Register
        </Link>
        <Link to={"/login"} className="btn btn-outline-success my-2 my-sm-0">
          Login
        </Link>
      </div>
    )
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {renderMenu()}
        {renderButtons()}
      </div>
    </nav>
  );
}

export default Header;
