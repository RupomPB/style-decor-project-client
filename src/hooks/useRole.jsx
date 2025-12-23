import React from 'react';
import useAuth from './useAuth';
import UseAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const { user, loading } = useAuth(); 
    const axiosSecure = UseAxiosSecure();

    const { isLoading: roleLoading, data: role } = useQuery({
        queryKey: ['user-role', user?.email],
      
        enabled: !loading && user?.email && !!user?.email, 
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            return res.data?.role || "user";
        }
    });

    return { role, roleLoading };
};

export default useRole;