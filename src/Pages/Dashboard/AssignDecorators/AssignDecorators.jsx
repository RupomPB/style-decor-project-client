import React from "react";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUserEdit } from "react-icons/fa";

const AssignDecorators = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings", "pending-pickup"],
    queryFn: async () => {
      // Fetching data from your updated backend logic
      const res = await axiosSecure.get(
        "/bookings?deliveryStatus=pending-pickup"
      );
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Assign Decorators ({bookings.length})
        </h1>
        <div className="badge badge-primary p-4">New Bookings</div>
      </div>

      {/* DaisyUI Table Container */}
      <div className="overflow-x-auto rounded-box border border-base-300 shadow-sm">
        <table className="table table-zebra w-full">
          {/* Table Head */}
          <thead className="bg-base-200 uppercase text-xs">
            <tr>
              <th>#</th>
              <th>Service Name</th>
              <th>Customer Email</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={booking._id} className="hover">
                  <th>{index + 1}</th>
                  <td className="font-semibold text-primary">
                    {booking.serviceName}
                  </td>
                  <td>{booking.userEmail}</td>
                  <td>
                    <div className="badge badge-warning badge-sm outline capitalize">
                      {booking.deliveryStatus}
                    </div>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-circle btn-ghost text-info"
                      title="Assign Decorator"
                    >
                      <FaUserEdit size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400">
                  No pending-pickup bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignDecorators;
