import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <div></div>
      <div>
        <Outlet></Outlet>
      </div>
      <div></div>
    </div>
  );
};

export default AuthLayout;
