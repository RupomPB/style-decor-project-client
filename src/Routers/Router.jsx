import { createBrowserRouter } from "react-router";
import Login from "../Pages/Auth/Login";
import Registration from "../Pages/Auth/Registration";
import AuthLayout from "../Layouts/Auth/AuthLayout";
import Home from "../Pages/Home/Home";
import HomeLayout from "../Layouts/Home/HomeLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        index: true,
        element: <Login></Login>,
      },
      {
        path: "registration",
        element: <Registration></Registration>,
      },
    ],
  },
]);

export default router;
