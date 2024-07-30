


// Register Component
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveUser = async () => {
    try {
      const response = await axios.post("http://localhost:8001/register", form);
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert("Unable to register data");
    }
  };

  const onUserSubmit = () => {
    let errors = false;
    let error = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!form.firstName.trim()) {
      errors = true;
      error.firstName = "Enter your first name";
    }
    if (!form.lastName.trim()) {
      errors = true;
      error.lastName = "Enter your last name";
    }
    if (!form.email.trim()) {
      errors = true;
      error.email = "Enter your email id";
    }
    if (!form.password.trim()) {
      errors = true;
      error.password = "Enter your password";
    }
    if (form.password !== form.confirmPassword) {
      errors = true;
      error.confirmPassword = "Password and confirm password must match";
    }
    if (form.password.length < 6 || form.password.length > 12) {
      errors = true;
      error.password = "Password length should be between 6 to 12 characters";
    }

    setFormError(error);
    if (!errors) saveUser();
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-header bg-primary text-white">New User</div>
            <div className="card-body">
              <div className="form-group row">
                <label className="col-lg-4 col-form-label">First Name</label>
                <div className="col-lg-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your first name"
                    name="firstName"
                    onChange={changeHandler}
                  />
                  <p className="text-danger">{formError.firstName}</p>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-lg-4 col-form-label">Last Name</label>
                <div className="col-lg-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your last name"
                    name="lastName"
                    onChange={changeHandler}
                  />
                  <p className="text-danger">{formError.lastName}</p>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-lg-4 col-form-label">Email-Id</label>
                <div className="col-lg-8">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your Email"
                    name="email"
                    onChange={changeHandler}
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
                    placeholder="Enter your Password"
                    name="password"
                    onChange={changeHandler}
                  />
                  <p className="text-danger">{formError.password}</p>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-lg-4 col-form-label">Confirm Password</label>
                <div className="col-lg-8">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your Confirm Password"
                    name="confirmPassword"
                    onChange={changeHandler}
                  />
                  <p className="text-danger">{formError.confirmPassword}</p>
                </div>
              </div>
            </div>
            <div className="card-footer text-muted">
              <button onClick={onUserSubmit} className="btn btn-success">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;