import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../Components/Shared/Navbar";
import Footer from "../../Components/Shared/Footer";

const AuthLayout = () => {
  return (
    <div>
      <div><Navbar></Navbar></div>
      <div>
        <Outlet></Outlet>
      </div>
      <div><Footer></Footer></div>
    </div>
  );
};

export default AuthLayout;
