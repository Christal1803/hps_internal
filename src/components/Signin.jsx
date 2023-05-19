import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import envelopeicon from "../assets/images/auth/envelope-icon.svg";
import lockicon from "../assets/images/auth/lock-icon.svg";
import googleicon from "../assets/images/auth/google-icon.svg";
import booksicon from "../assets/images/auth/books-icon.svg";
import eye from "../assets/images/auth/eye.svg";
import eyeslash from "../assets/images/auth/eyeslash.svg";
import logo from "../assets/images/auth/logo.svg";
import { supabase } from "../supabase";


function Signin() {
  //page redirect function
  let navigate = useNavigate();
  const MovetoForgotpassword = () => {
    let path = `/forgotpassword`;
    navigate(path);
    };

    const [user, setUser] = useState("");

    const [auth, setAuth] = useState(false);

  //Login with OAuth
  const [loading, setLoading] = useState(false);
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    let { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        persistSession: false,
        options: {
            queryParams: {
                access_type: 'offline',
                prompt: 'select_account',
            },
            
            redirectTo: "http://localhost:3000/dashboard",

      },
    });
     
      setLoading(false);
      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
          console.log(event, session)
          if (event == 'SIGNED_IN') console.log('SIGNED_IN', session)
          setUser(session.user)
          setAuth(true);
          if (event == 'SIGNED_OUT') console.log('SIGNED_OUT', session)
          setUser(null)
          setAuth(false);
      })
    };

  //Login with email & password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

  const handleLoginEmail = async (event) => {
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("school_id");
    event.preventDefault();
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
        console.log("Invaid Credentials");
        setMessage(`Invalid credentials`);
    } else {
      let { data: Member, error } = await supabase
        .from("Member")
        .select("school_id")
        .eq("user_id", data.user.id)
        .order("lastlogin_date", { ascending: false });
      sessionStorage.setItem("user_id", data.user.id);
      sessionStorage.setItem("school_id", Member[0].school_id);
      if (error) {
        console.log(error);
        return [];
      } else {
        await supabase
          .from("Member")
          .update({ lastlogin_date: new Date() })
          .eq("user_id", data.user.id)
          .eq("school_id", Member[0].school_id)
          .then((response) => {
            console.log("Update successful:", response);
          });

        navigate("/dashboard");
        return data;
      }
    }
    };

    useEffect(() => {
        const { data, error } = supabase.auth.getSession();
        console.log(data)
        
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            console.log(event, session)
            if (event == 'SIGNED_IN')
            if (session.user.aud = "authenticated") {
                navigate("/dashboard");
            }
            setUser(session?.user)
            setAuth(true);
            
            if (event == 'SIGNED_OUT') console.log('SIGNED_OUT', session)
            setUser(null)
        })

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

  //password toggle
  const [showPassword, setShowPassword] = useState(false);
  const [imageSource, setImageSource] = useState(eye);
  const handleClick = () => {
    if (imageSource === eye) {
      setImageSource(eyeslash);
      setShowPassword(!showPassword);
    } else {
      setImageSource(eye);
      setShowPassword(!showPassword);
    }
  };

  return (
    <div className="login">
      <main className="login__main">
        {/* <!-- ====== Logo ====== --> */}
        <div className="login__brand">
          <div className="login__brand-logo">
            <img src={logo} alt="Logo" />
          </div>
          <h3 className="login__brand-title">House Point System</h3>
          <h5 className="login__brand-subtitle">Teacher Login</h5>
        </div>

        {/* <!-- ====== Content ====== --> */}
        <div className="login__main-content">
          <div className="login__card">
            <img src={booksicon} className="login__card-img" alt="image" />
            <form className="login__form">
              {/* <!-- Row 1 --> */}
              {/* <div className="login__form-row">
                <img src={usericon} className="login__form-icon" alt="icon" />
                <input value={schoolid} onChange={(e) => setSchoolId(e.target.value)} type="text" id="schoolid" placeholder="school id" />
              </div> */}
              {/* <!-- Row 2 --> */}

              <div className="login__form-row">
                <img
                  src={envelopeicon}
                  className="login__form-icon"
                  alt="icon"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  id="email"
                  placeholder="email address"
                />
              </div>

              {/* <!-- Row 3 --> */}
              <div className="login__form-row">
                <img src={lockicon} className="login__form-icon" alt="icon" />
                <img
                  src={imageSource}
                  className="login__form-eye fa fa-eye"
                  alt="icon"
                  onClick={handleClick}
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="password"
                /> 
              </div>

              {/* <!-- Row 3 --> */}

              <div className="login__form-text">
                <span>{message && <p className="danger">{message}</p>}</span>
              </div>

              <div className="login__form-links">
                <a onClick={MovetoForgotpassword} className="login__form-link">
                  Forgot Password
                </a>
                <button
                  type="submit"
                  className="btn btn-primary login__form-btn"
                  onClick={handleLoginEmail}
                >
                  Login
                </button>
              </div>
            </form>

            <div className="login__card-links">
              <button
                type="button"
                className="login__card-btn"
                onClick={handleLogin}
                disabled={loading}
              >
                <img src={googleicon} alt="Google logo" className="icon" />
                <span>Sign in with Google</span>
              </button>
              <a href="#" className="login__card-link">
                Terms & Privacy Policy
              </a>
            </div>
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
    </div>
  );
}

export default Signin;
