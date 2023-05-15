import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { createClient } from "@supabase/supabase-js";
import logo from "../assets/images/dashboard/logo.svg";
import crown from "../assets/images/dashboard/crown.svg";
import logouticon from "../assets/images/dashboard/logout-icon.svg";
import dotsicon from "../assets/images/dashboard/dots-icon.svg";
import check from "../assets/images/dashboard/check.svg";
import reset from "../assets/images/dashboard/reset.svg";
import ognisko from "../assets/images/dashboard/ognisko.png";
import reveur from "../assets/images/dashboard/reveur.png";
import hufflepuf from "../assets/images/dashboard/hufflepuf.png";
import ubunto from "../assets/images/dashboard/ubunto.png";

import AppScript from "../assets/js/AppScript";
import IndexScript from "../assets/js/IndexScript";

function Dashboard() {
  const [inputElement, setName] = useState('')
  //page redirect function
  let navigate = useNavigate();
  const MovetoNewsfeed = () => {
    let path = `/newsfeed`;
    navigate(path);
  };
  useEffect(() => {
    myFunction();
  }, []);
  async function myFunction() {
      window.tableRows = "";

      const school_id = sessionStorage.getItem("school_id");
      let { data: School } = await supabase
          .from('School')
          .select('school_name')
          .eq("school_id", school_id);
      console.log(School);
      window.schoolName = School[0].school_name;
    let { data: House, error } = await supabase
      .from("House")
      .select("*")
        .eq("school_id", school_id)
        .eq("active", 'TRUE');
    if (House.length == 0) {
      setLoading(true);
      window.tableRows = "no houses are found";
      inputElement.click()
      setLoading(false);
      
    }
    if (House.length != 0) {
      setLoading(true);
      window.tableRows = House.map((element) => {
        return (
          <div class="houses__card" data-id="ognisko-modal" onClick={IndexScript}>
            <div class="houses__card-image">
              <img src={element.house_crest} alt="Ognisko" />
              <div class="houses__card-shadow"></div>
            </div>
            <div class="houses__card-footer">
              <div class="houses__card-count">
                <img src={crown} alt="Crown icon" />
                <p>{element.total_points}</p>
              </div>
            </div>
          </div>
        );
      });
      inputElement.click()
      setLoading(false);
    } 
      if (error) {
          console.log("error occured")
      }
  }

  //page redirect function
  const Movetohome = () => {
    let path = `/dashboard`;
    navigate(path);
  };

  // supabase credentials
  const supabaseUrl = "https://zqydhjfofwxhvbagfwpg.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxeWRoamZvZnd4aHZiYWdmd3BnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MzIwNjY1MiwiZXhwIjoxOTg4NzgyNjUyfQ.3xA7iglBkdpc1AHlnUEHUFz7GhlViqdrprxWO7W4ZTU";
  const supabase = createClient(supabaseUrl, supabaseKey);

  //logout function
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const history = useNavigate();
  async function handleLogout() {
    debugger
    try {
      setLoading(true);
      await supabase.auth.signOut();
      console.log("Logout successful");
      history("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  }
  const InputComponent = () => {
    const inputElement = React.useRef()
  
    return <input ref={inputElement} />
  }

  return (
    <div className="body">
      <div class="layout">
        {/* <!-- ================ Sidebar Start ================== --> */}
        <aside class="sidebar">
          {/* <!-- Menu --> */}
          <div class="sidebar__menu">
            <div class="sidebar__menu-brand">
              <a onClick={Movetohome} class="sidebar__menu-logo">
                <img src={logo} alt="Logo" />
              </a>
              <h5 class="sidebar__menu-title">House Point System</h5>
            </div>

            <nav class="sidebar__menu-nav">
              <ul class="sidebar__menu-list">
                <li class="sidebar__menu-item">
                  <a onClick={Movetohome} class="sidebar__menu-link active">
                    <span class="sidebar__menu-icon">
                      <svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.4628 8.69992C19.4623 8.69947 19.4618 8.69901 19.4614 8.69855L11.3021 0.539606C10.9544 0.19167 10.492 0 10.0001 0C9.50828 0 9.04589 0.191517 8.69796 0.539453L0.542984 8.69428C0.540237 8.69702 0.53749 8.69992 0.534743 8.70267C-0.179441 9.42097 -0.17822 10.5864 0.538253 11.3029C0.865587 11.6304 1.29791 11.8201 1.76015 11.8399C1.77892 11.8417 1.79784 11.8426 1.81692 11.8426H2.14212V17.8471C2.14212 19.0353 3.10886 20.002 4.29733 20.002H7.48949C7.81301 20.002 8.07549 19.7397 8.07549 19.416V14.7085C8.07549 14.1663 8.51651 13.7253 9.05871 13.7253H10.9415C11.4837 13.7253 11.9248 14.1663 11.9248 14.7085V19.416C11.9248 19.7397 12.1871 20.002 12.5108 20.002H15.7029C16.8914 20.002 17.8581 19.0353 17.8581 17.8471V11.8426H18.1597C18.6514 11.8426 19.1138 11.6511 19.4618 11.3032C20.1791 10.5855 20.1794 9.41808 19.4628 8.69992Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <span>Houses</span>
                  </a>
                </li>

                <li class="sidebar__menu-item">
                  <a onClick={MovetoNewsfeed} class="sidebar__menu-link">
                    <span class="sidebar__menu-icon">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 2C0 0.895431 0.895431 0 2 0H18C19.1046 0 20 0.895431 20 2V18C20 19.1046 19.1046 20 18 20H2C0.895431 20 0 19.1046 0 18V2ZM2.72727 3.72728C2.72727 3.17499 3.17499 2.72728 3.72727 2.72728H6.27273C6.82501 2.72728 7.27273 3.17499 7.27273 3.72728V6.27273C7.27273 6.82502 6.82501 7.27273 6.27273 7.27273H3.72727C3.17499 7.27273 2.72727 6.82502 2.72727 6.27273V3.72728ZM9.09091 2.72728C8.58883 2.72728 8.18182 3.13429 8.18182 3.63637C8.18182 4.13844 8.58883 4.54546 9.09091 4.54546H14.5455C15.0475 4.54546 15.4545 4.13844 15.4545 3.63637C15.4545 3.13429 15.0475 2.72728 14.5455 2.72728H9.09091ZM8.18182 6.36364C8.18182 5.86156 8.58883 5.45455 9.09091 5.45455H16.3636C16.8657 5.45455 17.2727 5.86156 17.2727 6.36364C17.2727 6.86572 16.8657 7.27273 16.3636 7.27273H9.09091C8.58883 7.27273 8.18182 6.86572 8.18182 6.36364ZM3.72727 9.09091C3.17499 9.09091 2.72727 9.53863 2.72727 10.0909V16.2727C2.72727 16.825 3.17499 17.2727 3.72727 17.2727H16.2727C16.825 17.2727 17.2727 16.825 17.2727 16.2727V10.0909C17.2727 9.53863 16.825 9.09091 16.2727 9.09091H3.72727Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <span>Feeds</span>
                  </a>
                </li>

                <li class="sidebar__menu-item">
                  <a href="#" class="sidebar__menu-link">
                    <span class="sidebar__menu-icon">
                      <svg
                        width="20"
                        height="19"
                        viewBox="0 0 20 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.7275 7.33663C19.3422 6.9604 17.8009 6.58416 17.0302 5.83168C16.8375 5.64356 16.8375 5.45545 16.6449 5.26733C16.4522 4.32673 16.6449 3.57426 16.8375 2.82178C16.8375 2.25743 16.4522 1.69307 15.6815 0.940594C14.9109 0.376238 13.9475 0 13.3695 0H13.1769C12.5989 0 11.4429 1.31683 10.6722 1.50495C10.4796 1.50495 10.2869 1.50495 10.0942 1.50495H9.90156C8.93822 1.12871 8.36023 0.564357 7.97489 0.188119C7.78223 4.20478e-08 7.3969 0 7.20423 0C6.8189 0 6.43356 0.188119 5.85557 0.376238C4.89224 0.752475 3.92891 1.50495 3.73624 2.06931C3.73624 2.25743 3.73624 2.44554 3.73624 2.63366C3.73624 3.38614 3.92891 4.32673 3.73624 5.07921C3.54357 5.26733 3.35091 5.64356 3.15824 5.83168C2.38758 6.58416 1.61691 6.77228 1.03891 6.9604C0.460916 7.14852 0.26825 7.71287 0.0755839 8.84159C-0.117082 9.78218 0.0755836 11.099 0.460916 11.4752C0.846248 12.0396 2.38758 12.2277 2.96557 12.9802C3.15824 13.1683 3.15824 13.5446 3.35091 13.7327C3.54357 14.8614 3.35091 15.4257 3.15824 16.1782C3.15824 16.7426 3.54357 17.3069 4.31424 18.0594C5.0849 18.6238 6.04823 19 6.62623 19H6.8189C7.3969 19 8.55289 17.6832 9.32356 17.4951C9.51622 17.4951 9.70889 17.4951 9.90156 17.4951C10.0942 17.4951 10.4796 17.4951 10.6722 17.4951C11.6355 17.6832 12.2135 18.2475 12.5989 18.6238C12.5989 18.6238 12.5989 18.6238 12.7915 18.6238C12.9842 18.8119 13.1769 18.8119 13.3695 18.8119C13.7549 18.8119 14.1402 18.6238 14.7182 18.4356C15.6815 18.0594 16.4522 17.1188 16.6449 16.5545C16.8375 15.9901 16.2595 14.4852 16.4522 13.5446C16.6449 13.3564 16.6449 13.1683 16.8375 12.7921C17.6082 12.0396 18.3789 11.8515 18.9569 11.6634C19.5349 11.4752 19.7275 10.7228 19.9202 9.78218C20.1129 8.84159 19.9202 7.71287 19.7275 7.33663ZM12.9842 12.4158C12.9842 12.604 12.9842 12.604 12.9842 12.4158C12.0209 13.1683 11.0576 13.5446 10.0942 13.5446C9.32356 13.5446 8.55289 13.3564 7.78223 12.7921C7.01156 12.4158 6.62623 11.6634 6.2409 10.9109C6.04823 10.3465 5.85557 9.59406 6.04823 8.84159C6.2409 8.08911 6.62623 7.33663 7.20423 6.77228C7.78223 6.20792 8.36023 5.83168 9.13089 5.64356H9.32356C10.0942 5.45545 10.8649 5.64356 11.6355 5.83168C12.4062 6.20792 12.9842 6.77228 13.5622 7.33663C13.9475 8.08911 14.3329 8.84159 14.3329 9.59406C14.1402 10.7228 13.7549 11.6634 12.9842 12.4158Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <span>Settings</span>
                  </a>
                </li>

                <li class="sidebar__menu-item" >
                  <button id="dark-light-mode" onClick={AppScript}>Dark mode</button>
                </li>
              </ul>
            </nav>
          </div>

          {/* <!-- Logout link --> */}
          <div class="sidebar__logout">
            <a onClick={handleLogout} class="sidebar__logout-link">
              <img src={logouticon} alt="icon" />
              <span>Log out</span>
            </a>
          </div>
        </aside>
        {/* <!-- ================ Sidebar End ================== --> */}

        <main class="main-section">
          {/* <!-- ================ Search Start ================== --> */}
          <section class="search home-search">
            <h3>Houses</h3>
            <div class="search__dropwdown">
              <button type="button" class="search__dropwdown-btn" onClick={AppScript}>
                <img src={dotsicon} alt="Dots icon" />
              </button>
              <div class="search__dropwdown-dropwdown">
                <div class="search__dropwdown-header">
                  <h3>More options</h3>
                  <button class="search__dropwdown-close" onClick={AppScript}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.94663 16.6131L8.24543 9.99935L1.94663 3.38561C1.53063 2.94881 1.58684 2.29121 2.07217 1.91681C2.5575 1.54241 3.28816 1.593 3.70416 2.02979L10.0013 8.64179L16.2984 2.02979C16.7144 1.593 17.4451 1.54241 17.9304 1.91681C18.4158 2.29121 18.472 2.94881 18.056 3.38561L11.7572 9.99935L18.056 16.6131C18.472 17.0499 18.4158 17.7075 17.9304 18.0819C17.4451 18.4563 16.7144 18.4057 16.2984 17.9689L10.0013 11.3569L3.70416 17.9689C3.28816 18.4057 2.5575 18.4563 2.07217 18.0819C1.58684 17.7075 1.53063 17.0499 1.94663 16.6131Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
                <ul class="search__dropwdown-list">
                  <div class="search__dropwdown-arrow">
                    <div class="search__dropwdown-rectangle"></div>
                  </div>
                  <li class="search__dropwdown-item">
                    <button
                      type="button"
                      class="search__dropwdown-link"
                      data-id="multi-points-modal" onClick={IndexScript}
                    >
                      <img
                        src={check}
                        class="search__dropwdown-icon"
                        alt="Check icon"
                      />
                      <span>Adjust Points For Multiple Houses</span>
                    </button>
                  </li>

                  <li class="search__dropwdown-item">
                    <button
                      type="button"
                      class="search__dropwdown-link"
                      data-id="select-schools-modal" onClick={IndexScript}
                    >
                      <img
                        src={check}
                        class="search__dropwdown-icon"
                        alt="Check icon"
                      />
                      <span>Select schools</span>
                    </button>
                  </li>


                  <li class="search__dropwdown-item">
                    <button
                      type="button"
                      class="search__dropwdown-link"
                      data-id="reset-points-modal"
                    >
                      <img
                        src={reset}
                        class="search__dropwdown-icon"
                        alt="Reset icon"
                      />
                      <span>Reset House Points</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          {/* <!-- ================ Search End ================== --> */}

          {/* <!-- ================ Houses Start ================== --> */}
          <section class="houses">
            <div class="houses-wrapper">
                          <h3 class="text-center houses-title">{window.schoolName} - Houses</h3>
              <div class="houses__cards">
                {window.tableRows}
              </div>
            </div>
          </section>
          {/* <!-- ================ Houses End ================== --> */}
        </main>
      </div>

      {/* <!-- ================ Mobile Menu Start ================== --> */}
      <nav class="mobile-menu">
        <ul class="mobile-menu__list">
          <li class="mobile-menu__list-item">
            <a onClick={Movetohome} class="mobile-menu__list-link active">
              <span class="icon">
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.4628 8.69992C19.4623 8.69947 19.4618 8.69901 19.4614 8.69855L11.3021 0.539606C10.9544 0.19167 10.492 0 10.0001 0C9.50828 0 9.04589 0.191517 8.69796 0.539453L0.542984 8.69428C0.540237 8.69702 0.53749 8.69992 0.534743 8.70267C-0.179441 9.42097 -0.17822 10.5864 0.538253 11.3029C0.865587 11.6304 1.29791 11.8201 1.76015 11.8399C1.77892 11.8417 1.79784 11.8426 1.81692 11.8426H2.14212V17.8471C2.14212 19.0353 3.10886 20.002 4.29733 20.002H7.48949C7.81301 20.002 8.07549 19.7397 8.07549 19.416V14.7085C8.07549 14.1663 8.51651 13.7253 9.05871 13.7253H10.9415C11.4837 13.7253 11.9248 14.1663 11.9248 14.7085V19.416C11.9248 19.7397 12.1871 20.002 12.5108 20.002H15.7029C16.8914 20.002 17.8581 19.0353 17.8581 17.8471V11.8426H18.1597C18.6514 11.8426 19.1138 11.6511 19.4618 11.3032C20.1791 10.5855 20.1794 9.41808 19.4628 8.69992Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span>Houses</span>
            </a>
          </li>

          <li class="mobile-menu__list-item">
            <a onClick={MovetoNewsfeed} class="mobile-menu__list-link">
              <span class="icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 2C0 0.895431 0.895431 0 2 0H18C19.1046 0 20 0.895431 20 2V18C20 19.1046 19.1046 20 18 20H2C0.895431 20 0 19.1046 0 18V2ZM2.72727 3.72728C2.72727 3.17499 3.17499 2.72728 3.72727 2.72728H6.27273C6.82501 2.72728 7.27273 3.17499 7.27273 3.72728V6.27273C7.27273 6.82502 6.82501 7.27273 6.27273 7.27273H3.72727C3.17499 7.27273 2.72727 6.82502 2.72727 6.27273V3.72728ZM9.09091 2.72728C8.58883 2.72728 8.18182 3.13429 8.18182 3.63637C8.18182 4.13844 8.58883 4.54546 9.09091 4.54546H14.5455C15.0475 4.54546 15.4545 4.13844 15.4545 3.63637C15.4545 3.13429 15.0475 2.72728 14.5455 2.72728H9.09091ZM8.18182 6.36364C8.18182 5.86156 8.58883 5.45455 9.09091 5.45455H16.3636C16.8657 5.45455 17.2727 5.86156 17.2727 6.36364C17.2727 6.86572 16.8657 7.27273 16.3636 7.27273H9.09091C8.58883 7.27273 8.18182 6.86572 8.18182 6.36364ZM3.72727 9.09091C3.17499 9.09091 2.72727 9.53863 2.72727 10.0909V16.2727C2.72727 16.825 3.17499 17.2727 3.72727 17.2727H16.2727C16.825 17.2727 17.2727 16.825 17.2727 16.2727V10.0909C17.2727 9.53863 16.825 9.09091 16.2727 9.09091H3.72727Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span>Feed</span>
            </a>
          </li>

          <li class="mobile-menu__list-item">
            <a href="#" class="mobile-menu__list-link">
              <span class="icon">
                <svg
                  width="20"
                  height="19"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.7275 7.33663C19.3422 6.9604 17.8009 6.58416 17.0302 5.83168C16.8375 5.64356 16.8375 5.45545 16.6449 5.26733C16.4522 4.32673 16.6449 3.57426 16.8375 2.82178C16.8375 2.25743 16.4522 1.69307 15.6815 0.940594C14.9109 0.376238 13.9475 0 13.3695 0H13.1769C12.5989 0 11.4429 1.31683 10.6722 1.50495C10.4796 1.50495 10.2869 1.50495 10.0942 1.50495H9.90156C8.93822 1.12871 8.36023 0.564357 7.97489 0.188119C7.78223 4.20478e-08 7.3969 0 7.20423 0C6.8189 0 6.43356 0.188119 5.85557 0.376238C4.89224 0.752475 3.92891 1.50495 3.73624 2.06931C3.73624 2.25743 3.73624 2.44554 3.73624 2.63366C3.73624 3.38614 3.92891 4.32673 3.73624 5.07921C3.54357 5.26733 3.35091 5.64356 3.15824 5.83168C2.38758 6.58416 1.61691 6.77228 1.03891 6.9604C0.460916 7.14852 0.26825 7.71287 0.0755839 8.84159C-0.117082 9.78218 0.0755836 11.099 0.460916 11.4752C0.846248 12.0396 2.38758 12.2277 2.96557 12.9802C3.15824 13.1683 3.15824 13.5446 3.35091 13.7327C3.54357 14.8614 3.35091 15.4257 3.15824 16.1782C3.15824 16.7426 3.54357 17.3069 4.31424 18.0594C5.0849 18.6238 6.04823 19 6.62623 19H6.8189C7.3969 19 8.55289 17.6832 9.32356 17.4951C9.51622 17.4951 9.70889 17.4951 9.90156 17.4951C10.0942 17.4951 10.4796 17.4951 10.6722 17.4951C11.6355 17.6832 12.2135 18.2475 12.5989 18.6238C12.5989 18.6238 12.5989 18.6238 12.7915 18.6238C12.9842 18.8119 13.1769 18.8119 13.3695 18.8119C13.7549 18.8119 14.1402 18.6238 14.7182 18.4356C15.6815 18.0594 16.4522 17.1188 16.6449 16.5545C16.8375 15.9901 16.2595 14.4852 16.4522 13.5446C16.6449 13.3564 16.6449 13.1683 16.8375 12.7921C17.6082 12.0396 18.3789 11.8515 18.9569 11.6634C19.5349 11.4752 19.7275 10.7228 19.9202 9.78218C20.1129 8.84159 19.9202 7.71287 19.7275 7.33663ZM12.9842 12.4158C12.9842 12.604 12.9842 12.604 12.9842 12.4158C12.0209 13.1683 11.0576 13.5446 10.0942 13.5446C9.32356 13.5446 8.55289 13.3564 7.78223 12.7921C7.01156 12.4158 6.62623 11.6634 6.2409 10.9109C6.04823 10.3465 5.85557 9.59406 6.04823 8.84159C6.2409 8.08911 6.62623 7.33663 7.20423 6.77228C7.78223 6.20792 8.36023 5.83168 9.13089 5.64356H9.32356C10.0942 5.45545 10.8649 5.64356 11.6355 5.83168C12.4062 6.20792 12.9842 6.77228 13.5622 7.33663C13.9475 8.08911 14.3329 8.84159 14.3329 9.59406C14.1402 10.7228 13.7549 11.6634 12.9842 12.4158Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
      {/* <!-- ================ Mobile Menu End ================== --> */}

      <div class="dropdown-backdrop"></div>

      <div>
        {/* <!-- ================ Ognisko Modal Start ================== --> */}
        <div class="backdrop ognisko-modal">
          <div class="modal">
            <div class="modal__header">
              <img
                src={ognisko}
                class="modal__header-image"
                alt="ognisko image"
              />
              <button
                type="button"
                class="modal__header-btn"
                data-toggle="ognisko-modal"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.94663 16.6131L8.24543 9.99935L1.94663 3.38561C1.53063 2.94881 1.58684 2.29121 2.07217 1.91681C2.5575 1.54241 3.28816 1.593 3.70416 2.02979L10.0013 8.64179L16.2984 2.02979C16.7144 1.593 17.4451 1.54241 17.9304 1.91681C18.4158 2.29121 18.472 2.94881 18.056 3.38561L11.7572 9.99935L18.056 16.6131C18.472 17.0499 18.4158 17.7075 17.9304 18.0819C17.4451 18.4563 16.7144 18.4057 16.2984 17.9689L10.0013 11.3569L3.70416 17.9689C3.28816 18.4057 2.5575 18.4563 2.07217 18.0819C1.58684 17.7075 1.53063 17.0499 1.94663 16.6131Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
            <div class="modal__body">
              <div class="points__current">
                <p class="text-center">Current Points</p>
                <div class="points__current-score">
                  <img src={crown} alt="Crown icon" />
                  <p>12,400</p>
                </div>
              </div>

              <form class="addpoints">
                <div class="addpoints__tabs">
                  <div class="addpoints__tabs-header ognisko-tab-header">
                    <button
                      type="button"
                      class="addpoints__tabs-btn active"
                      data-toggle="ognisko-add-points-tab"
                    >
                      Add points
                    </button>
                    <button
                      type="button"
                      class="addpoints__tabs-btn subtract-btn"
                      data-toggle="ognisko-subtract-points-tab"
                    >
                      Subtract points
                    </button>
                  </div>

                  <div class="addpoints__tabs-content">
                    <div class="addpoints__tabs-tab ognisko-add-points-tab active ognisko-tab-content">
                      <div class="addpoints__amount">
                        <p class="addpoints__amount-title">Select Amount</p>
                        <div class="addpoints__amount-slider-wrapper no-scrollbar">
                          <div class="addpoints__amount-slider">
                            <div class="addpoints__amount-item">
                              <p>+100</p>
                            </div>
                            <div class="addpoints__amount-item active">
                              <p>+200</p>
                            </div>
                            <div class="addpoints__amount-item">
                              <p>+300</p>
                            </div>
                            <div class="addpoints__amount-item">
                              <p>+400</p>
                            </div>
                            <div class="addpoints__amount-item">
                              <p>+500</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="select__slider-container no-scrollbar">
                        <div class="select__slider">
                          <div class="select__slider-item">
                            <p>Choose Reason</p>
                          </div>
                          <div class="select__slider-item">
                            <p>Active in Class</p>
                          </div>
                          <div class="select__slider-item">
                            <p>Helping Another Student</p>
                          </div>
                          <div class="select__slider-item active">
                            <p>Turned in Homework</p>
                          </div>
                          <div class="select__slider-item">
                            <p>Reason 1</p>
                          </div>
                          <div class="select__slider-item">
                            <p>Reason 2</p>
                          </div>
                          <div class="select__slider-item">
                            <p>Reason 3</p>
                          </div>
                          <div class="select__slider-item">
                            <p>Reason 4</p>
                          </div>
                          <div class="select__slider-item">
                            <p>Reason 5</p>
                          </div>
                          <div class="select__slider-item">
                            <p>Reason 6</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="addpoints__tabs-tab ognisko-subtract-points-tab ognisko-tab-content">
                      <div class="addpoints__amount subtract-amount">
                        <p class="addpoints__amount-title">Select Amount</p>
                        <div class="addpoints__amount-slider-wrapper no-scrollbar">
                          <div class="addpoints__amount-slider subtract-slider">
                            <div class="addpoints__amount-item">
                              <p>-100</p>
                            </div>
                            <div class="addpoints__amount-item active">
                              <p>-200</p>
                            </div>
                            <div class="addpoints__amount-item">
                              <p>-300</p>
                            </div>
                            <div class="addpoints__amount-item">
                              <p>-400</p>
                            </div>
                            <div class="addpoints__amount-item">
                              <p>-500</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="select__slider-container no-scrollbar">
                        <div class="select__slider subtract-slider">
                          <div class="select__slider-item">
                            <p>Choose Reason</p>
                          </div>
                          <div class="select__slider-item">
                            <p>Active in Class</p>
                          </div>
                          <div class="select__slider-item">
                            <p>Helping Another Student</p>
                          </div>
                          <div class="select__slider-item active">
                            <p>Turned in Homework</p>
                          </div>
                          <div class="select__slider-item">
                            <p>Reason 1</p>
                          </div>
                          <div class="select__slider-item">
                            <p>Reason 2</p>
                          </div>
                          <div class="select__slider-item">
                            <p>Reason 3</p>
                          </div>
                          <div class="select__slider-item">
                            <p>Reason 4</p>
                          </div>
                          <div class="select__slider-item">
                            <p>Reason 5</p>
                          </div>
                          <div class="select__slider-item">
                            <p>Reason 6</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">
                  Add Points
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* <!-- ================ Ognisko Modal Start ================== --> */}


        {/* <!-- ================ Select schools Modal Start ================== --> */}
        <div class="backdrop select-schools-modal">
          <div class="modal">
            <div class="modal__header">
              <img
                src={ognisko}
                class="modal__header-image"
                alt="ognisko image"
              />
              <button
                type="button"
                class="modal__header-btn"
                data-toggle="select-schools-modal"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.94663 16.6131L8.24543 9.99935L1.94663 3.38561C1.53063 2.94881 1.58684 2.29121 2.07217 1.91681C2.5575 1.54241 3.28816 1.593 3.70416 2.02979L10.0013 8.64179L16.2984 2.02979C16.7144 1.593 17.4451 1.54241 17.9304 1.91681C18.4158 2.29121 18.472 2.94881 18.056 3.38561L11.7572 9.99935L18.056 16.6131C18.472 17.0499 18.4158 17.7075 17.9304 18.0819C17.4451 18.4563 16.7144 18.4057 16.2984 17.9689L10.0013 11.3569L3.70416 17.9689C3.28816 18.4057 2.5575 18.4563 2.07217 18.0819C1.58684 17.7075 1.53063 17.0499 1.94663 16.6131Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
            <div class="modal__body">
              <div class="points__current">
                <h2 class="text-center">Select School</h2>
              </div>

              <form class="addpoints">
                <div class="addpoints__tabs">
                  <div class="addpoints__tabs-content">
                    <div class="addpoints__tabs-tab ognisko-add-points-tab active ognisko-tab-content">
                      <div class="select__slider-container no-scrollbar">
                        <div class="select__slider">
                          <div class="select__slider-item ">
                            <p>Addant School 1</p>
                          </div>
                          <div class="select__slider-item active">
                            <p>Addant School 2</p>
                          </div>
                          <div class="select__slider-item ">
                            <p>Addant School 3</p>
                          </div>
                          <div class="select__slider-item">
                            <p>Addant School 4</p>
                          </div>
                          <div class="select__slider-item">
                            <p>Addant School 5</p>
                          </div>
                        </div>
                      </div>
                    </div>
                   
                  </div>
                </div>
                
              </form>
            </div>
          </div>
        </div>
        {/* <!-- ================ Select schools Modal Start ================== --> */}


        {/* <!-- ================ Multiple Points Modal Start ================ --> */}
        <div class="backdrop multi-points-modal">
            <div class="modal">
                <div class="modal__header">
                    <h3>Multiple House Points</h3>
                    <button
                        type="button"
                        class="modal__header-btn"
                        data-toggle="multi-points-modal"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M1.94663 16.6131L8.24543 9.99935L1.94663 3.38561C1.53063 2.94881 1.58684 2.29121 2.07217 1.91681C2.5575 1.54241 3.28816 1.593 3.70416 2.02979L10.0013 8.64179L16.2984 2.02979C16.7144 1.593 17.4451 1.54241 17.9304 1.91681C18.4158 2.29121 18.472 2.94881 18.056 3.38561L11.7572 9.99935L18.056 16.6131C18.472 17.0499 18.4158 17.7075 17.9304 18.0819C17.4451 18.4563 16.7144 18.4057 16.2984 17.9689L10.0013 11.3569L3.70416 17.9689C3.28816 18.4057 2.5575 18.4563 2.07217 18.0819C1.58684 17.7075 1.53063 17.0499 1.94663 16.6131Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                </div>
                <div class="modal__body multi-points-body">
                    <h2>Multiple House Points</h2>

                    <form class="addpoints">
                        <div class="addpoints__tabs">
                            <div class="addpoints__tabs-header multi-points-tab-header">
                                <button
                                    type="button"
                                    class="addpoints__tabs-btn active"
                                    data-toggle="multi-add-points-tab"
                                >
                                    Add points
                                </button>
                                <button
                                    type="button"
                                    class="addpoints__tabs-btn subtract-btn"
                                    data-toggle="multi-subtract-points-tab"
                                >
                                    Subtract points
                                </button>
                            </div>

                            <div class="addpoints__tabs-content">
                                <div
                                    class="addpoints__tabs-tab multi-add-points-tab multi-points-tab-content active"
                                >
                                    <div class="addpoints__amount">
                                        <p class="addpoints__amount-title">Select Amount</p>

                                        <div class="addpoints__amount-slider-wrapper no-scrollbar">
                                            <div class="addpoints__amount-slider">
                                                <div class="addpoints__amount-item">
                                                    <p>+100</p>
                                                </div>
                                                <div class="addpoints__amount-item active">
                                                    <p>+200</p>
                                                </div>
                                                <div class="addpoints__amount-item">
                                                    <p>+300</p>
                                                </div>
                                                <div class="addpoints__amount-item">
                                                    <p>+400</p>
                                                </div>
                                                <div class="addpoints__amount-item">
                                                    <p>+500</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="multiselect__slider-container no-scrollbar">
                                        <div class="multiselect__slider">
                                            <div class="multiselect__slider-item">
                                                <input type="checkbox" id="add-all-house" />
                                                <div class="multiselect__slider-square">
                                                    <img
                                                        src="./images/checkbox-icon.svg"
                                                        alt="icon"
                                                    />
                                                </div>
                                                <label for="add-all-house">All Houses</label>
                                            </div>

                                            <div class="multiselect__slider-item">
                                                <input type="checkbox" id="add-1-house" checked />
                                                <div class="multiselect__slider-square">
                                                    <img
                                                        src="./images/checkbox-icon.svg"
                                                        alt="icon"
                                                    />
                                                </div>
                                                <label for="add-1-house">Houses 1</label>
                                            </div>

                                            <div class="multiselect__slider-item">
                                                <input type="checkbox" id="add-2-house" checked />
                                                <div class="multiselect__slider-square">
                                                    <img
                                                        src="./images/checkbox-icon.svg"
                                                        alt="icon"
                                                    />
                                                </div>
                                                <label for="add-2-house">Houses 2</label>
                                            </div>

                                            <div class="multiselect__slider-item">
                                                <input type="checkbox" id="add-3-house" />
                                                <div class="multiselect__slider-square">
                                                    <img
                                                        src="./images/checkbox-icon.svg"
                                                        alt="icon"
                                                    />
                                                </div>
                                                <label for="add-3-house">Houses 3</label>
                                            </div>

                                            <div class="multiselect__slider-item">
                                                <input type="checkbox" id="add-4-house" />
                                                <div class="multiselect__slider-square">
                                                    <img
                                                        src="./images/checkbox-icon.svg"
                                                        alt="icon"
                                                    />
                                                </div>
                                                <label for="add-4-house">Houses 4</label>
                                            </div>

                                            <div class="multiselect__slider-item">
                                                <input type="checkbox" id="add-5-house" />
                                                <div class="multiselect__slider-square">
                                                    <img
                                                        src="./images/checkbox-icon.svg"
                                                        alt="icon"
                                                    />
                                                </div>
                                                <label for="add-5-house">Houses 5</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="addpoints__tabs-tab multi-points-tab-content multi-subtract-points-tab"
                                >
                                    <div class="addpoints__amount subtract-amount">
                                        <p class="addpoints__amount-title">Select Amount</p>

                                        <div class="addpoints__amount-slider-wrapper no-scrollbar">
                                            <div class="addpoints__amount-slider subtract-slider">
                                                <div class="addpoints__amount-item">
                                                    <p>-100</p>
                                                </div>
                                                <div class="addpoints__amount-item active">
                                                    <p>-200</p>
                                                </div>
                                                <div class="addpoints__amount-item">
                                                    <p>-300</p>
                                                </div>
                                                <div class="addpoints__amount-item">
                                                    <p>-400</p>
                                                </div>
                                                <div class="addpoints__amount-item">
                                                    <p>-500</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="multiselect__slider-container no-scrollbar">
                                        <div class="multiselect__slider">
                                            <div class="multiselect__slider-item">
                                                <input type="checkbox" id="subtract-all-house" />
                                                <div
                                                    class="multiselect__slider-square subtract-square"
                                                >
                                                    <img
                                                        src="./images/checkbox-icon.svg"
                                                        alt="icon"
                                                    />
                                                </div>
                                                <label
                                                    class="subtract-item-lable"
                                                    for="subtract-all-house"
                                                    >All Houses</label
                                                >
                                            </div>

                                            <div class="multiselect__slider-item">
                                                <input
                                                    type="checkbox"
                                                    id="subtract-1-house"
                                                    checked
                                                />
                                                <div
                                                    class="multiselect__slider-square subtract-square"
                                                >
                                                    <img
                                                        src="./images/checkbox-icon.svg"
                                                        alt="icon"
                                                    />
                                                </div>
                                                <label
                                                    class="subtract-item-lable"
                                                    for="subtract-1-house"
                                                    >Houses 1</label
                                                >
                                            </div>

                                            <div class="multiselect__slider-item">
                                                <input
                                                    type="checkbox"
                                                    id="subtract-2-house"
                                                    checked
                                                />
                                                <div
                                                    class="multiselect__slider-square subtract-square"
                                                >
                                                    <img
                                                        src="./images/checkbox-icon.svg"
                                                        alt="icon"
                                                    />
                                                </div>
                                                <label
                                                    class="subtract-item-lable"
                                                    for="subtract-2-house"
                                                    >Houses 2</label
                                                >
                                            </div>

                                            <div class="multiselect__slider-item">
                                                <input type="checkbox" id="subtract-3-house" />
                                                <div
                                                    class="multiselect__slider-square subtract-square"
                                                >
                                                    <img
                                                        src="./images/checkbox-icon.svg"
                                                        alt="icon"
                                                    />
                                                </div>
                                                <label
                                                    class="subtract-item-lable"
                                                    for="subtract-3-house"
                                                    >Houses 3</label
                                                >
                                            </div>

                                            <div class="multiselect__slider-item">
                                                <input type="checkbox" id="subtract-4-house" />
                                                <div
                                                    class="multiselect__slider-square subtract-square"
                                                >
                                                    <img
                                                        src="./images/checkbox-icon.svg"
                                                        alt="icon"
                                                    />
                                                </div>
                                                <label
                                                    class="subtract-item-lable"
                                                    for="subtract-4-house"
                                                    >Houses 4</label
                                                >
                                            </div>

                                            <div class="multiselect__slider-item">
                                                <input type="checkbox" id="subtract-5-house" />
                                                <div
                                                    class="multiselect__slider-square subtract-square"
                                                >
                                                    <img
                                                        src="./images/checkbox-icon.svg"
                                                        alt="icon"
                                                    />
                                                </div>
                                                <label
                                                    class="subtract-item-lable"
                                                    for="subtract-5-house"
                                                    >Houses 5</label
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary">Add Points</button>
                    </form>
                </div>
            </div>
        </div>
        {/* <!-- ================ Multiple Points Modal End ================== --> */}


        
      </div>
    </div>
  );
}

export default Dashboard;
