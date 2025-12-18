import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: bookings = [], isLoading, refetch } = useQuery({
    queryKey: ["myBookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      return res.data;
    },
  });

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Cancel booking?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it",
      cancelButtonText: "No, keep it",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/bookings/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Cancelled!",
          text: "Your booking has been cancelled.",
          timer: 1500,
          showConfirmButton: false,
        });
        refetch();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Could not cancel booking.",
      });
      console.error(err);
    }
  };

  const handlePayment = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };

  if (isLoading) {
    return (
      <p className="text-center py-32 animate-pulse">Loading bookings...</p>
    );
  }

  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No bookings found</div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-lg border border-gray-200">
          <table className="table w-full table-zebra">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left">Service</th>
                <th>Date</th>
                <th>Location</th>
                <th>Cost</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover ">
                  <td className="flex items-center gap-3">
                    <img
                      src={
                        booking.serviceImage ||
                        "https://i.ibb.co/5vQfK8p/image-placeholder.png"
                      }
                      alt={booking.serviceName}
                      className="w-12 h-12 rounded-lg object-cover border"
                    />
                    <span className="font-medium">{booking.serviceName}</span>
                  </td>
                  <td>{booking.bookingDate}</td>
                  <td className="max-w-[180px] truncate">{booking.location}</td>
                  <td className="font-medium">৳ {booking.cost}</td>
                  <td>
                    {booking.paymentStatus === "paid" ? (
                      <span className="badge badge-success">
                        Paid
                        {booking.paymentTime && (
                          <p className="text-xs">{new Date(booking.paymentTime).toLocaleString()}</p>
                        )}
                      </span>
                    ) : (
                      <span className="badge badge-warning badge-outline">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="text-center align-middle ">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handlePayment(booking._id)}
                        className="btn btn-sm btn-primary rounded-full"
                        disabled={booking.paymentStatus === "paid"}
                      >
                        Pay
                      </button>
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="btn btn-sm btn-outline btn-error rounded-full"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default MyBookings;
