import React from 'react';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import Loading from './../../Components/Shared/Loading';
import Forbidden from '../../Components/Shared/Forbidden';

const AdminRoute = ({children}) => {

    const {loading} = useAuth();
    const {role, roleLoading} = useRole();

    if(loading || roleLoading ){
        return <Loading></Loading>
    }

    if(role !== 'admin'){
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoute;