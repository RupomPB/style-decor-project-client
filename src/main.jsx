import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./Routers/Router.jsx";
import { RouterProvider } from "react-router";
import AuthProvider from "./Contexts/Provider/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();


createRoot(document.getElementById("root")).render(
  <StrictMode>
  <QueryClientProvider client={queryClient}>

    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <Toaster></Toaster>
  </QueryClientProvider>
  </StrictMode>
);
