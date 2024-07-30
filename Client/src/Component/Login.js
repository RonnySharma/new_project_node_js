import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState({ email: "", password: "" });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function checkUser() {
    //debugger
    try {
      axios.post("http://localhost:8001/login",form).then((e)=>{
        // Store user information in localStorage
        localStorage.setItem("id",e.data.id);
        localStorage.setItem("role",e.data.role);
      })
      // Show response messag
      // Navigate to home page
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("Wrong Username/Password");
    }
  };
  
  const onUserSubmit = () => {
    let errors = false;
    let error = { email: "", password: "" };
    if (!form.email.trim()) {
      errors = true;
      error.email = "Enter your registered email-id";
    }
    if (!form.password.trim()) {
      errors = true;
      error.password = "Enter your password";
    }
    setFormError(error);
    if (!errors) checkUser();
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-header bg-info text-white">Login</div>
            <div className="card-body">
              <div className="form-group row">
                <label className="col-lg-4 col-form-label">Email-ID</label>
                <div className="col-lg-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your email-id"
                    onChange={changeHandler}
                    name="email"
                  />
                  <p className="text-danger">{formError.email}</p>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-lg-4 col-form-label">Password</label>
                <div className="col-lg-8">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    onChange={changeHandler}
                    name="password"
                  />
                  <p className="text-danger">{formError.password}</p>
                </div>
              </div>
            </div>
            <div className="card-footer text-muted">
              <button onClick={onUserSubmit} className="btn btn-primary">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;