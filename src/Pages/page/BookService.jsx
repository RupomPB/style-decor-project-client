import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const BookService = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const { data: service = {}, isLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/services/${id}`);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    const bookingData = {
      ...data,
      serviceId: id,
      serviceName: service.name,
      userEmail: user.email,
      userName: user.displayName,
      cost: service.price,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/bookings", bookingData);
      if (res.data.insertedId) {
        toast.success("Booking successful!");
        reset();
      }
    } catch (err) {
      toast.error("Booking failed!");
      console.error(err);
    }
  };

  if (isLoading)
    return <p className="text-center py-32 animate-pulse">Loading...</p>;

  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      {/* Service Banner */}
      <div className="overflow-hidden rounded-2xl shadow-lg mb-8">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Form Card */}
      <div className="bg-base-100 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Book <span className="text-primary">{service.name}</span>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-base-content/70 mb-1">
              Your Name
            </label>
            <input
              {...register("userName")}
              value={user.displayName}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-base-content/70 mb-1">
              Email
            </label>
            <input
              {...register("userEmail")}
              value={user.email}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Cost */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-base-content/70 mb-1">
              Cost
            </label>
            <input
              {...register("cost")}
              value={`৳ ${service.price}`}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-base-content/70 mb-1">
              Booking Date
            </label>
            <input
              {...register("bookingDate")}
              type="date"
              required
              className="input input-bordered w-full"
            />
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-base-content/70 mb-1">
              Location
            </label>
            <input
              {...register("location")}
              placeholder="Enter your location"
              required
              className="input input-bordered w-full"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-4 py-3 text-lg font-semibold rounded-full"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookService;
