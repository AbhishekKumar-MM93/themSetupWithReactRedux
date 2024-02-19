import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { loginApi } from "../Api/Allapi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showEye, setShowEye] = useState(true);
  const [errors, setErrors] = useState({});
  const [apiErrors, setApiErrors] = useState(null);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required."),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .max(50, "Password is too long (maximum 50 characters)")
      .required("Password is required."),
  });

  const adminInfo = JSON.parse(sessionStorage.getItem("token"));

  function handleShowPassword() {
    setShowEye(showEye ? false : true);
  }

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });

    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        [e.target.name]: null,
      };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginSchema.validate(data, { abortEarly: false });

      const apiResponse = await loginApi(data);
      if (apiResponse.success) {
        setErrors({});
        setApiErrors(null);
        navigate("/dashboard");
        // Navigate or perform any other action on successful login
      } else {
        setApiErrors(apiResponse.message);
      }
    } catch (error) {
      // Handle validation errors or API call errors
      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (adminInfo) {
      navigate("/dashboard");
    }
  }, [adminInfo, navigate]);

  return (
    <div>
      <div className="content-wrapper">
        <div className="content-header row">
          {apiErrors && (
            <div class="alert alert-danger" role="alert">
              <h4 class="alert-heading">Error</h4>
              <div class="alert-body">{apiErrors}</div>
            </div>
          )}
        </div>
        <div className="content-body">
          <div className="auth-wrapper auth-v2">
            <div className="auth-inner row m-0">
              {/* <!-- Left Text--> */}
              <div className="d-none d-lg-flex col-lg-8 align-items-center p-5">
                <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
                  <img
                    className="img-fluid"
                    src="app-assets/images/pages/login-v2.svg"
                    alt="Login V2"
                  />
                </div>
              </div>
              {/* <!-- /Left Text--> */}
              {/* <!-- Login--> */}
              <div className="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
                <div className="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
                  <h2 className="card-title fw-bold mb-1">
                    Welcome to Vuexy! 👋
                  </h2>
                  <p className="card-text mb-2">
                    Please sign-in to your account and start the adventure
                  </p>

                  <form
                    className="auth-login-form mt-2"
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-1">
                      <label className="form-label"> Email</label>
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        id="loginEmail"
                        placeholder="john@example.com"
                        aria-describedby="loginEmail"
                        autofocus=""
                        tabIndex="1"
                        onChange={handleChange}
                      />
                      {errors.email ? (
                        <div style={{ color: "red", fontSize: "12px" }}>
                          {errors.email}
                        </div>
                      ) : null}
                    </div>

                    <div className="mb-1">
                      <div className="d-flex justify-content-between">
                        <label className="form-label"> Password</label>
                        <a href="page-auth-forgot-password-v2.html">
                          <small>Forgot Password?</small>
                        </a>
                      </div>
                      <div className="input-group input-group-merge form-password-toggle">
                        <input
                          name="password"
                          className="form-control form-control-merge"
                          id="password"
                          type={showEye ? "password" : "text"}
                          placeholder="············"
                          aria-describedby="password"
                          tabIndex="2"
                          onChange={handleChange}
                        />

                        <span
                          className="input-group-text cursor-pointer"
                          onClick={handleShowPassword}
                        >
                          {showEye ? (
                            <i
                              className="fa-regular fa-eye"
                              style={{ color: "gray" }}
                            ></i>
                          ) : (
                            <i className="fa-regular fa-eye-slash"></i>
                          )}
                        </span>
                      </div>
                      {errors.password ? (
                        <div style={{ color: "red", fontSize: "12px" }}>
                          {errors.password}
                        </div>
                      ) : null}
                    </div>

                    <div className="mb-1">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          id="remember-me"
                          type="checkbox"
                          tabIndex="3"
                        />
                        <label className="form-check-label">Remember Me</label>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary w-100"
                      tabIndex="4"
                      type="submit"
                    >
                      Sign in
                    </button>
                  </form>
                </div>
              </div>
              {/* <!-- /Login--> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
