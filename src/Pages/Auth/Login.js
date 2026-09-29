/** @format */

import React, { useState } from "react";
import { horizontalLogo } from "../../assest";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { postApi, saveHeader } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPassword, setIsPassword] = useState(true);

  const payload = {
    email,
    password,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    postApi(endPoints.auth.login, payload, {
      setLoading,
      additionalFunctions: [
        (res) => saveHeader(res?.accessToken),
        () => navigate("/dashboard"),
      ],
      successMsg: "Welcome Back !",
    });
  };

  return (
    <section className="auth-page">
      <div className="auth-left">
        <form className="auth-form-wrap" onSubmit={submitHandler}>
          <h1 className="auth-title">Sign In</h1>
          <p className="auth-subtitle">
            Enter your email and password to sign in!
          </p>

          <div className="auth-field">
            <label className="auth-label">
              Email<span>*</span>
            </label>
            <div className="auth-input-wrap">
              <input
                className="auth-input"
                type="email"
                placeholder="mail@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label">
              Password<span>*</span>
            </label>
            <div className="auth-input-wrap">
              <input
                className="auth-input"
                type={isPassword ? "password" : "text"}
                placeholder="Min. 8 characters"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <i
                className={`auth-eye fa-solid ${
                  isPassword ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={() => setIsPassword((prev) => !prev)}
              ></i>
            </div>
          </div>

          <div className="auth-options">
            <label className="auth-remember">
              <input type="checkbox" />
              Keep me logged in
            </label>
            <Link to="/forget-password" className="auth-link">
              Forget password?
            </Link>
          </div>

          <button className="auth-submit" type="submit">
            {loading ? <ClipLoader color="#fff" size={20} /> : "Sign In"}
          </button>

          <p className="auth-footer">
            © {new Date().getFullYear()} Dually. All Rights Reserved.
          </p>
        </form>
      </div>

      <div className="auth-right hide-layout">
        <div className="auth-brand-badge">
          <img src={horizontalLogo} alt="Dually" />
        </div>
        <p className="auth-brand-title">Dually</p>
        <p className="auth-brand-sub">Admin Panel</p>
      </div>
    </section>
  );
};

export default Login;
