import React from "react";

function Footer() {
  return (
    <div>
      {/* <div className="sidenav-overlay"></div> */}
      {/* <div className="drag-target"></div> */}
      {/* <!-- BEGIN: Footer--> */}
      <footer
        className="footer footer-static footer-light"
        style={{
          marginLeft: "260px",
        }}
      >
        <p className="clearfix mb-0">
          <span className="float-md-start d-block d-md-inline-block mt-25">
            COPYRIGHT &copy; 2021
            <a
              className="ms-25"
              href="https://1.envato.market/pixinvent_portfolio"
              target="_blank"
            >
              Pixinvent
            </a>
            <span className="d-none d-sm-inline-block">
              , All rights Reserved
            </span>
          </span>
          <span className="float-md-end d-none d-md-block">
            Hand-crafted & Made with<i data-feather="heart"></i>
          </span>
        </p>
      </footer>
      <button className="btn btn-primary btn-icon scroll-top" type="button">
        <i data-feather="arrow-up"></i>
      </button>
      {/* <!-- END: Footer--> */}
    </div>
  );
}

export default Footer;
