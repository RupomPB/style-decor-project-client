import { createBrowserRouter } from "react-router";
import Login from "../Pages/Auth/Login";
import Registration from "../Pages/Auth/Registration";
import AuthLayout from "../Layouts/Auth/AuthLayout";
import Home from "../Pages/Home/Home";
import HomeLayout from "../Layouts/Home/HomeLayout";
import About from './../Pages/About';
import Contact from "../Pages/Contact";
import PrivateRouter from "./Private/PrivateRouter";
import DashboardLayouts from "../Layouts/Dashboard/DashboardLayouts";
import Service from "../Pages/Service";



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        path: '/',
       Component: Home,
      },
      {
        path: 'about',
        element: <About></About>
      },
      {
        path: 'contact',
        element: <Contact></Contact>
      },
      {
        path: 'service',
        element: <PrivateRouter>
          <Service></Service>
        </PrivateRouter>
      }
      // {
      //   path: 'coverage',
      //   Component: Coverage,
      //   loader: ()=> fetch('/serviceCenters.json').then((res)=>res.json()),
      // }
    ],
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
   
        path:'login',
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Registration></Registration>,
      },
    ],
  },
  {
    path:"/dashboard",
    element:<PrivateRouter>
      <DashboardLayouts></DashboardLayouts>
    </PrivateRouter>,
    children:[
      {
        
      }
    ]
  }
]);

export default router;
