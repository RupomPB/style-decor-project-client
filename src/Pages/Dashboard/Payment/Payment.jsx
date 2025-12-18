import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();

  const handlePayment= async(booking)=>{
    const paymentInfo ={
      cost: booking.cost,
      serviceId: booking.serviceId,
      userEmail: booking.userEmail,
      serviceName: booking.serviceName,
      bookingId: booking._id,
    }

    const res = await axiosSecure.post('/create-checkout-session', paymentInfo);

    console.log(res.data)
    window.location.href = res.data.url;

  }

  const { data: booking = {}, isLoading } = useQuery({
    queryKey: ["booking", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <p className="text-center py-32 animate-pulse">
        Loading payment details...
      </p>
    );
  }

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-base-100 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-primary-content px-8 py-6">
          <h2 className="text-3xl font-bold">Secure Payment</h2>
          <p className="text-sm opacity-90">
            Complete your booking payment
          </p>
        </div>

        {/* Content */}
        <div className="p-8 grid md:grid-cols-2 gap-8">
          {/* Left: Service Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Booking Summary</h3>

            <div className="flex items-center gap-4">
              <img
                src={
                  booking.serviceImage ||
                  "https://i.ibb.co/5vQfK8p/image-placeholder.png"
                }
                alt={booking.serviceName}
                className="w-20 h-20 rounded-xl object-cover border"
              />
              <div>
                <p className="font-semibold text-lg">
                  {booking.serviceName}
                </p>
                <p className="text-sm text-base-content/70">
                  Event Date: {booking.bookingDate}
                </p>
                <p className="text-sm text-base-content/70 truncate max-w-xs">
                  Location: {booking.location}
                </p>
              </div>
            </div>

            <div className="divider"></div>

            <div className="flex justify-between text-lg font-medium">
              <span>Total Amount</span>
              <span className="text-primary font-bold">
                
            $ {booking.cost}
              </span>
            </div>
          </div>

          {/* Right: Payment CTA */}
          <div className="bg-base-200 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-3">
                Payment Method
              </h3>
              <p className="text-sm text-base-content/70 mb-6">
                You will be redirected to a secure payment gateway
                to complete your transaction.
              </p>

              {/* Placeholder for Stripe */}
              <div className="border border-dashed border-base-300 rounded-xl p-6 text-center text-sm text-base-content/60">
                Stripe payment form will appear here
              </div>
            </div>

            <button onClick={()=>handlePayment(booking)} className="btn btn-primary w-full mt-6 rounded-full text-lg">
              Proceed to Payment
            </button>

            <Link
              to="/dashboard/my-bookings"
              className="text-center text-sm mt-4 text-primary hover:underline"
            >
              ← Back to My Bookings
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
