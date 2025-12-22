import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const axiosSecure =axios.create({
  baseURL:"https://style-decor-project-server.vercel.app"
})

const UseAxiosSecure = ()=>{

  const {user,logoutUser} = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    // intercept request
   const reqInterceptor =  axiosSecure.interceptors.request.use(config =>{
      config.headers.Authorization =`Bearer ${user?.accessToken}`
      return config
    })

    // interceptor response
    const resInterceptor = axiosSecure.interceptors.response.use((response)=>{
      return response;
    },(error)=>{
      console.log(error)

      const statusCode = error.status;
      if(statusCode === 401 || statusCode === 403){
        logoutUser()
        .then(()=>{
          navigate('/login')
        })
      }

      return Promise.reject(error);
    })

    return()=>{
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.request.eject(resInterceptor);
      
      
    }

  },[user, logoutUser, navigate])


  return axiosSecure
}

export default UseAxiosSecure