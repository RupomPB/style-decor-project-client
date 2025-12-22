import { createBrowserRouter } from "react-router";
import Login from "../Pages/Auth/Login";
import Registration from "../Pages/Auth/Registration";
import AuthLayout from "../Layouts/Auth/AuthLayout";
import Home from "../Pages/Home/Home";
import HomeLayout from "../Layouts/Home/HomeLayout";
import About from '../Pages/page/About';
import Contact from "../Pages/page/Contact";
import PrivateRouter from "./Private/PrivateRouter";
import DashboardLayouts from "../Layouts/Dashboard/DashboardLayouts";

import ServiceDetails from "../Pages/page/ServiceDetails";
import Service from "../Pages/page/Service";
import BookService from "../Pages/page/BookService";
import MyBookings from "../Pages/Dashboard/MyBookings";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../Pages/Dashboard/Payment/PaymentHistory";
import Decorator from "../Pages/Decorator/Decorator";
import ApproveDecorators from "../Pages/Dashboard/ApproveDecorators/ApproveDecorators";



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
      },
      {
        path: 'services/:id',
        element: <PrivateRouter>
          <ServiceDetails></ServiceDetails>
        </PrivateRouter>
      },
      {
        path: 'book-service/:id',
        element: <PrivateRouter>
          <BookService></BookService>
        </PrivateRouter>
      },
      {
        path: 'decorator',
        element: <PrivateRouter><Decorator></Decorator></PrivateRouter>,
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
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
       path: 'my-bookings',
       element: <MyBookings></MyBookings>
      },
      {
        path: 'payment/:id',
        element: <Payment></Payment>
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled
      },
      {
        path: 'payment-history',
        element:<PaymentHistory></PaymentHistory>
      },
      {
        path: 'approve-decorators',
        element: <ApproveDecorators></ApproveDecorators>
      }
    ]
  }
]);

export default router;
