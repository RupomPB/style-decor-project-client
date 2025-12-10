import React, { use } from 'react';
import AuthContext from '../Contexts/Context/AuthContext';

const useAuth = () => {
    const authInfo = use(AuthContext);
    return authInfo
};

export default useAuth;