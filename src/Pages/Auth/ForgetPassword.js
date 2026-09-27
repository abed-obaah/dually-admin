/** @format */

import React, { useState } from "react";
import { horizontalLogo } from "../../assest";
import { OtpInput } from "../../Components/HelpingComponent";
import { useNavigate } from "react-router-dom";
import { postApi, showMsg } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { ClipLoader } from "react-spinners";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passType, setPassType] = useState(true);
  const [cpassType, setCPassType] = useState(true);

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const backStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  const showOtp = (value) => {
    showMsg("", value, "success");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const payload = {
      email,
    };
    postApi(endPoints.auth.forgetPassword, payload, {
      setLoading,
      additionalFunctions: [(res) => showOtp(res?.data?.otp), nextStep],
    });
  };

  const saveUserId = (id) => {
    setUserId(id);
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    const payload = {
      otp,
      email,
    };
    postApi(endPoints.auth.verifyOtp, payload, {
      setLoading,
      successMsg: "Verified !",
      additionalFunctions: [(res) => saveUserId(res?.data?.userId), nextStep],
    });
  };

  const updatePassword = (e) => {
    e.preventDefault();
    const payload = {
      otp,
      newPassword,
      confirmPassword,
    };
    postApi(endPoints.auth.updatePassword(userId), payload, {
      setLoading,
      successMsg: "Success !",
      additionalFunctions: [() => navigate("/")],
    });
  };

  return (
    <section className="auth-page">
      <div className="auth-left">
        <button type="button" className="auth-back" onClick={backStep}>
          <i className="fa-solid fa-arrow-left"></i>
          Back
        </button>

        {step === 1 && (
          <form className="auth-form-wrap" onSubmit={submitHandler}>
            <h1 className="auth-title">Forgot password?</h1>
            <p className="auth-subtitle">
              Enter your registered email address and we will share a
              verification code with you.
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button className="auth-submit" type="submit">
              {loading ? <ClipLoader color="#fff" size={20} /> : "Continue"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="auth-form-wrap" onSubmit={verifyOtp}>
            <h1 className="auth-title">Verify your email</h1>
            <p className="auth-subtitle">
              Please enter the digit code sent to your email address.
            </p>

            <OtpInput length={4} onChange={handleOtpChange} />

            <button className="auth-submit" type="submit">
              {loading ? <ClipLoader color="#fff" size={20} /> : "Continue"}
            </button>
          </form>
        )}

        {step === 3 && (
          <form className="auth-form-wrap" onSubmit={updatePassword}>
            <h1 className="auth-title">New password</h1>
            <p className="auth-subtitle">
              Enter a new password for your account.
            </p>

            <div className="auth-field">
              <label className="auth-label">
                New password<span>*</span>
              </label>
              <div className="auth-input-wrap">
                <input
                  className="auth-input"
                  type={passType ? "password" : "text"}
                  placeholder="Min. 8 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <i
                  className={`auth-eye fa-solid ${
                    passType ? "fa-eye-slash" : "fa-eye"
                  }`}
                  onClick={() => setPassType((prev) => !prev)}
                ></i>
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label">
                Confirm password<span>*</span>
              </label>
              <div className="auth-input-wrap">
                <input
                  className="auth-input"
                  type={cpassType ? "password" : "text"}
                  placeholder="Min. 8 characters"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <i
                  className={`auth-eye fa-solid ${
                    cpassType ? "fa-eye-slash" : "fa-eye"
                  }`}
                  onClick={() => setCPassType((prev) => !prev)}
                ></i>
              </div>
            </div>

            <button className="auth-submit" type="submit">
              {loading ? <ClipLoader color="#fff" size={20} /> : "Submit"}
            </button>
          </form>
        )}
      </div>

      <div className="auth-right hide-layout">
        <div className="auth-brand-badge">
          <img src={horizontalLogo} alt="Mr Duality" />
        </div>
        <p className="auth-brand-title">Mr Duality</p>
        <p className="auth-brand-sub">Admin Panel</p>
      </div>
    </section>
  );
};

export default ForgetPassword;
