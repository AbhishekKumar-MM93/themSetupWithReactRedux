import React from "react";
import { Home, Users, Menu, MessageCircle } from "react-feather";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div>
      <div
        className="main-menu menu-fixed menu-light menu-accordion menu-shadow"
        data-scroll-to-active="true"
      >
        <div className="navbar-header">
          <ul className="nav navbar-nav flex-row">
            <li className="nav-item me-auto">
              <a className="navbar-brand" href="/dashboard">
                <h2 className="brand-text">Vuexy</h2>
              </a>
            </li>
            {/* <li className="nav-item nav-toggle">
              <a
                className="nav-link modern-nav-toggle pe-0"
                data-bs-toggle="collapse"
              >
                <X className="d-block d-xl-none text-primary toggle-icon font-medium-4" />

                <Disc className="d-none d-xl-block collapse-toggle-icon font-medium-4  text-primary" />
              </a>
            </li> */}
          </ul>
        </div>
        <div className="shadow-bottom"></div>
        <div className="main-menu-content">
          <ul
            className="navigation navigation-main"
            id="main-menu-navigation"
            data-menu="menu-navigation"
          >
            <li className=" nav-item">
              <Link
                to={"/dashboard"}
                className="d-flex align-items-center"
                href="index.html"
              >
                <Home
                  style={{
                    height: "1.5rem",
                    width: "1.5rem",
                    fontSize: "1.5rem",
                  }}
                />
                <span
                  className="menu-title text-truncate"
                  data-i18n="Dashboards"
                >
                  Dashboards
                </span>
              </Link>
            </li>
            <li className=" navigation-header">
              <span data-i18n="Apps &amp; Pages">Apps &amp; Pages</span>
              <i data-feather="more-horizontal"></i>
            </li>
            <li className=" nav-item">
              <Link
                to={"/users"}
                className="d-flex align-items-center"
                href="app-email.html"
              >
                <Users
                  style={{
                    height: "1.5rem",
                    width: "1.5rem",
                    fontSize: "1.5rem",
                  }}
                />
                <span className="menu-title text-truncate" data-i18n="Email">
                  Users
                </span>
              </Link>
            </li>

            <li className=" nav-item">
              <Link
                to={"/products"}
                className="d-flex align-items-center"
                href="app-email.html"
              >
                <Menu
                  style={{
                    height: "1.5rem",
                    width: "1.5rem",
                    fontSize: "1.5rem",
                  }}
                />
                <span className="menu-title text-truncate" data-i18n="Email">
                  Products
                </span>
              </Link>
            </li>

            <li className=" nav-item">
              <Link
                to={"/chat"}
                className="d-flex align-items-center"
                href="app-email.html"
              >
                <MessageCircle
                  style={{
                    height: "1.5rem",
                    width: "1.5rem",
                    fontSize: "1.5rem",
                  }}
                />
                <span className="menu-title text-truncate" data-i18n="Email">
                  Chat
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default SideBar;
