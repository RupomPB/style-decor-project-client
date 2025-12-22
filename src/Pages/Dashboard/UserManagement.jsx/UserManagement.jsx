import React from "react";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUserShield, FaUsers, FaUserTag } from "react-icons/fa";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  /* ---------- Admin Role Logic ---------- */
  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Promote to Admin?",
      text: `${user.displayName} will have administrative privileges!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, { role: "admin" }).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire("Success!", `${user.displayName} is now an Admin.`, "success");
          }
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    Swal.fire({
      title: "Remove Admin Rights?",
      text: `Are you sure you want to demote ${user.displayName}?`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Demote",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, { role: "user" }).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire("Updated!", "User status has been reset.", "success");
          }
        });
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="p-4 md:p-8 bg-base-200 min-h-screen">
      {/* Header Card */}
      <div className="card bg-base-100 shadow-sm mb-6">
        <div className="card-body flex-row justify-between items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-base-content">User Management</h2>
            <p className="text-base-content/60 text-sm">Control user roles and permissions</p>
          </div>
          <div className="stats shadow bg-primary text-primary-content hidden md:flex">
            <div className="stat px-4 py-2">
              <div className="stat-title text-primary-content/70">Total Users</div>
              <div className="stat-value text-2xl">{users.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="card bg-base-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Head */}
            <thead className="bg-base-200">
              <tr>
                <th className="rounded-none">#</th>
                <th>User Details</th>
                <th>Current Role</th>
                <th>Admin Actions</th>
                <th className="text-center">Remove</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-base-200/50 transition-colors">
                  <th className="text-base-content/50">{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 shadow-md">
                          <img
                            src={user.image || user.photoURL || "https://i.ibb.co/mJR9n0C/default-avatar.png"}
                            alt={user.displayName}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-base">{user.displayName || "Unknown User"}</div>
                        <div className="text-xs opacity-60 flex items-center gap-1">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={`badge badge-md gap-1 font-medium py-3 px-4 ${
                      user.role === 'admin' ? 'badge-primary' : 
                      user.role === 'decorator' ? 'badge-accent' : 'badge-ghost'
                    }`}>
                      <FaUserTag className="text-xs" /> {user.role || 'user'}
                    </div>
                  </td>
                  <td>
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleRemoveAdmin(user)}
                        className="btn btn-error btn-outline btn-xs gap-2 rounded-full"
                      >
                        <FaUserShield /> Dismiss Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-primary btn-xs gap-2 rounded-full"
                        disabled={user.role === 'decorator'}
                      >
                        <FaUsers /> Make Admin
                      </button>
                    )}
                  </td>
                  <td className="text-center">
                    <button className="btn btn-circle btn-ghost btn-sm text-error hover:bg-error/10">
                      <FaTrashAlt size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;