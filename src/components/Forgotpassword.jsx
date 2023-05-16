import React, { useState } from "react";
import { useNavigate } from "react-router";
import mailicon from "../assets/images/auth/mail-icon.svg";
import envelopeicon from "../assets/images/auth/envelope-icon.svg";
import logo from "../assets/images/auth/logo.svg";
import { supabase } from "../supabase";

function Forgotpassword() {
  //page redirect function
  let navigate = useNavigate();
  const MovetoSignin = () => {
    let path = `/signin`;
    navigate(path);
  };

  //sending forgotPassword link
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  async function handlePasswordRecovery(event) {
    localStorage.setItem("Email", email);
    event.preventDefault();
    try {
      setLoading(true);
      let { data, error } = await supabase.auth.resetPasswordForEmail(email);
      setMessage(`Password recovery email sent to ${email}.`);
      console.log(data, error);
    } catch (error) {
      console.error("Password recovery failed:", error);
      setMessage("Password recovery failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

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
            <div className="login__card-header">
              <a onClick={MovetoSignin}>
                <svg
                  width="10"
                  height="18"
                  viewBox="0 0 10 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.21532 8.99935L9.59286 15.6131C10.0141 16.0499 9.95715 16.7075 9.46575 17.0819C8.97435 17.4563 8.23455 17.4057 7.81335 16.9689L0.782121 9.67726C0.40596 9.28716 0.40596 8.71154 0.782121 8.32144L7.81335 1.02979C8.23455 0.592996 8.97435 0.542411 9.46575 0.916808C9.95715 1.29121 10.0141 1.94881 9.59286 2.38561L3.21532 8.99935Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>

            <div className="card__heading">
              <img src={mailicon} alt="Mail icon" />
              <h5>Forgot Password / School ID</h5>
              <p>Enter your email below to reset</p>
            </div>

            <form onSubmit={handlePasswordRecovery} className="login__form">
              {/* <!-- Row 1 --> */}
              <div className="login__form-row forgot-row">
                <img
                  src={envelopeicon}
                  className="login__form-icon"
                  alt="icon"
                />
                <input
                  type="text"
                  placeholder="email address"
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                />
              </div>

              <div className="login__form-text">
                <p>
                  If you have an account in our system, an email with a new
                  password and your School ID will be emailed to you.
                </p>
              </div>

              <div className="login__form-text">
                <span>{message && <p className="danger">{message}</p>}</span>
              </div>

              <div className="login__form-links">
                <button
                  type="submit"
                  className="btn btn-primary login__form-btn"
                  disabled={loading}
                >
                  {" "}
                  Reset{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* <!-- ============= Background Images Start ========== --> */}
      <span className="login-top-img sm-none">
        <svg
          width="411"
          height="468"
          viewBox="0 0 411 468"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-192 364.5L-59.2411 231.741C5.20951 296.192 109.872 296.071 174.471 231.472C239.07 166.873 239.191 62.2106 174.74 -2.24004L307.499 -134.999C445.027 2.52968 444.77 226.08 306.925 363.926C169.079 501.771 -54.4715 502.029 -192 364.5Z"
            fill="currentColor"
          />
        </svg>
      </span>

      <span className="login-right-img">
        <svg
          width="262"
          height="525"
          viewBox="0 0 262 525"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M262 0V139.537C194.232 139.537 139.271 194.603 139.271 262.5C139.271 330.397 194.232 385.463 262 385.463V525C117.393 525 0 407.383 0 262.5C0 117.617 117.393 0 262 0Z"
            fill="currentColor"
          />
        </svg>
      </span>

      <span className="login-bottom-img">
        <svg
          width="481"
          height="199"
          viewBox="0 0 481 199"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M481 199L353.158 199C353.158 147.527 302.707 105.782 240.5 105.782C178.293 105.782 127.842 147.527 127.842 199L0 199C0 89.165 107.76 0 240.5 0C373.24 0 481 89.165 481 199Z"
            fill="currentColor"
          />
        </svg>
      </span>
      {/* <!-- ============= Background Images End ============ --> */}

      {/* <!-- ============= Footer ============ --> */}
      <footer className="login__footer">
        <div className="login__footer-container">
          <div className="login__footer-row">
            <p>&copy; 2023 House Points System</p>
            <a href="#" className="login__footer-link">
              Contact Us
            </a>
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

      <script src="./js/login.js"></script>
    </div>
  );
}

export default Forgotpassword;
