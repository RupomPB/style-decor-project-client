import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myBookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      return res.data;
    },
  });

  const handleCancel = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirm) return;

    try {
      const res = await axiosSecure.delete(`/bookings/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Booking cancelled");
        refetch();
      }
    } catch (err) {
      toast.error("Failed to cancel booking");
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <p className="text-center py-32 animate-pulse">Loading bookings...</p>
    );
  }

  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold mb-8">My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No bookings found</div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-lg">
          <table className="table table-lg">
            <thead>
              <tr className="text-base">
                <th>Service</th>
                <th>Date</th>
                <th>Location</th>
                <th>Cost</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover">
                  {/* Service */}
                  <td>
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          booking.serviceImage ||
                          "https://i.ibb.co/5vQfK8p/image-placeholder.png"
                        }
                        alt={booking.serviceName}
                        className="w-12 h-12 rounded-lg object-cover border"
                      />
                      <span className="font-semibold">
                        {booking.serviceName}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td>{booking.bookingDate}</td>

                  {/* Location */}
                  <td className="max-w-[180px] truncate">{booking.location}</td>

                  {/* Cost */}
                  <td className="font-medium">৳ {booking.cost}</td>

                  {/* Status */}
                  <td>
                    <span className="badge badge-warning badge-outline">
                      Pending
                    </span>
                  </td>

                  {/* Action */}
                  <td className="text-right">
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="btn btn-sm btn-outline btn-error rounded-full"
                    >
                      Cancel
                    </button>
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
