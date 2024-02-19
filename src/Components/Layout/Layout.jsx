import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function Layout() {
  return (
    <div>
      <Header />
      <SideBar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
