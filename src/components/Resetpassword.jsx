import React from "react";
import { useNavigate } from "react-router";
import mailicon from "../assets/images/auth/mail-icon.svg";
import logo from "../assets/images/auth/logo.svg";
import lockicon from "../assets/images/auth/lock-icon.svg";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

function Resetpassword() {
  let navigate = useNavigate();

  // supabase credentials
  const supabaseUrl = "https://zqydhjfofwxhvbagfwpg.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxeWRoamZvZnd4aHZiYWdmd3BnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MzIwNjY1MiwiZXhwIjoxOTg4NzgyNjUyfQ.3xA7iglBkdpc1AHlnUEHUFz7GhlViqdrprxWO7W4ZTU";
  const supabase = createClient(supabaseUrl, supabaseKey);

  //resetting password
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleChangePassword = async (event) => {
    const mail = localStorage.getItem("Email");
    event.preventDefault();
    debugger;
    let { data, error } = await supabase.auth.updateUser({
      email: mail,
      password: confirmPassword,
    });
    if (error) {
      console.log("something went wrong");
      setErrorMessage("An error occurred. Please try again later.");
    } else {
      console.log(data);
      setSuccessMessage("Password updated successfully!");
      navigate("/signin");
    }
  };

  return (
    <div className="login">
      <main className="login__main">
        {/* <!-- ====== Logo ====== --> */}
        <div className="login__brand forgot-password-brand">
          <div className="login__brand-logo">
            <img src={logo} alt="Logo" />
          </div>

          <h3 className="login__brand-title">House Point System</h3>
          <h5 className="login__brand-subtitle">Teacher Login</h5>
        </div>

        {/* <!-- ====== Content ====== --> */}
        <div className="login__main-content">
          <div className="login__card forgot-password-card">
            <div className="card__heading">
              <img src={mailicon} alt="Mail icon" />
              <h5>Reset Password</h5>
              <p>Enter your new password below</p>
            </div>

            <form className="login__form">

              {/* <!-- Row 1 --> */}
              <div className="login__form-row forgot-row">
                <img src={lockicon} className="login__form-icon" alt="icon" />
                <input value={newPassword} type="text" placeholder="new password" onChange={(e) => setNewPassword(e.target.value)} id="newpassword"/>
              </div>

              {/* <!-- Row 2 --> */}
              <div className="login__form-row forgot-row">
                <img src={lockicon} className="login__form-icon" alt="icon" />
                <input value={confirmPassword} type="text" placeholder="confirm new password" onChange={(e) => setConfirmPassword(e.target.value)} id="confirmpassword" />
              </div>

              <div className="login__form-text">
                <span>{successMessage && <p>{successMessage}</p>}</span>
                <span>{errorMessage && <p>{errorMessage}</p>}</span>
              </div>

              <div className="login__form-links">
                <button type="submit" className="btn btn-primary login__form-btn" onClick={handleChangePassword} >Reset password </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* <!-- ============= Background Images Start ========== --> */}
      <span className="login-top-img sm-none">
        <svg width="411" height="468" viewBox="0 0 411 468" fill="none" xmlns="http://www.w3.org/2000/svg" >
          <path d="M-192 364.5L-59.2411 231.741C5.20951 296.192 109.872 296.071 174.471 231.472C239.07 166.873 239.191 62.2106 174.74 -2.24004L307.499 -134.999C445.027 2.52968 444.77 226.08 306.925 363.926C169.079 501.771 -54.4715 502.029 -192 364.5Z" fill="currentColor"/>
        </svg>
      </span>

      <span className="login-right-img">
        <svg width="262" height="525" viewBox="0 0 262 525" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M262 0V139.537C194.232 139.537 139.271 194.603 139.271 262.5C139.271 330.397 194.232 385.463 262 385.463V525C117.393 525 0 407.383 0 262.5C0 117.617 117.393 0 262 0Z" fill="currentColor"/>
        </svg>
      </span>

      <span className="login-bottom-img">
        <svg width="481" height="199" viewBox="0 0 481 199" fill="none" xmlns="http://www.w3.org/2000/svg" >
          <path d="M481 199L353.158 199C353.158 147.527 302.707 105.782 240.5 105.782C178.293 105.782 127.842 147.527 127.842 199L0 199C0 89.165 107.76 0 240.5 0C373.24 0 481 89.165 481 199Z" fill="currentColor"/>
        </svg>
      </span>
      {/* <!-- ============= Background Images End ============ --> */}

      {/* <!-- ============= Footer ============ --> */}
      <footer className="login__footer">
        <div className="login__footer-container">
          <div className="login__footer-row">
            <p>&copy; 2023 House Points System</p>
            <a href="#" className="login__footer-link"> Contact Us</a>
          </div>
          <div className="login__footer-row">
            <a href="#" className="login__footer-link">
              Terms & Conditions
            </a>
            <a href="#" className="login__footer-link">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Resetpassword;
