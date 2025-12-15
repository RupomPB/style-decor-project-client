import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";

const PrivateRouter = ({children}) => {

  const location = useLocation();
  const {user, loading} = useAuth();
  console.log('location', location);
  console.log(user, loading)
  if(loading){
    return(
      <div>
        <span className="loading loading-spinner loading-xl "></span>
      </div>
    );
  }

  if(!user){
    return <Navigate state={location?.pathname} to='/login'>

    </Navigate>
  }

  return children;
};

export default PrivateRouter;
