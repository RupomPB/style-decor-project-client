import React from 'react';
import useAuth from '../../hooks/useAuth';
import Loading from './../../Components/Shared/Loading';
import Forbidden from '../../Components/Shared/Forbidden';
import useRole from './../../hooks/useRole';

const AdminRoute = ({children}) => {

    const {user,loading} = useAuth();
    const {role, roleLoading} = useRole();

    if(loading || roleLoading ){
        return <Loading></Loading>
    }

    if(user && role !== 'admin'){
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoute;