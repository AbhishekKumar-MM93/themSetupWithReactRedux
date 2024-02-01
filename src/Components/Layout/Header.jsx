import React from "react";

function Header() {
  return (
    <div>
      <nav className="header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-light navbar-shadow container-xxl">
        <div className="navbar-container d-flex content">
          <ul className="nav navbar-nav align-items-center ms-auto">
            <li className="nav-item dropdown dropdown-user">
              <a
                className="nav-link dropdown-toggle dropdown-user-link"
                id="dropdown-user"
                href="#"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div className="user-nav d-sm-flex d-none">
                  <span className="user-name fw-bolder">John Doe</span>
                  <span className="user-status">Admin</span>
                </div>
                <span className="avatar">
                  <img
                    className="round"
                    src="../../../app-assets/images/portrait/small/avatar-s-11.jpg"
                    alt="avatar"
                    height="40"
                    width="40"
                  />
                  <span className="avatar-status-online"></span>
                </span>
              </a>
              <div
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdown-user"
              >
                <a className="dropdown-item" href="page-profile.html">
                  <i className="me-50" data-feather="user"></i> Profile
                </a>

                <a className="dropdown-item" href="page-auth-login-v2.html">
                  <i className="me-50" data-feather="power"></i> Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      {/* <!-- END: Header--> */}
    </div>
  );
}

export default Header;
