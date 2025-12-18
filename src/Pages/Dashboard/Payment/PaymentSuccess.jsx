import { useSearchParams } from "react-router";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { CheckCircle, Copy } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = UseAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({});
  const [copied, setCopied] = useState("");

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });

          if (res.data.modifiedCount > 0) {
            setTimeout(() => {
              window.location.href = "/dashboard/my-bookings";
            }, 4000);
          }
        })
        .catch(console.error);
    }
  }, [sessionId, axiosSecure]);

  const copyText = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="bg-base-100 max-w-md w-full p-8 rounded-3xl shadow border border-base-300 text-center">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-success" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-success">
          Payment Successful
        </h1>
        <p className="mt-2 text-base-content/70">
          Your booking has been confirmed successfully.
        </p>

        {/* Info box */}
        <div className="mt-6 space-y-4 text-left bg-base-200 p-4 rounded-xl">

          {/* Transaction ID */}
          <div>
            <p className="text-sm text-base-content/60 mb-1">
              Transaction ID
            </p>
            <div className="flex items-center justify-between bg-base-100 px-3 py-2 rounded-lg border border-base-300">
              <span className="font-mono text-sm truncate">
                {paymentInfo.transactionId}
              </span>
              <button
                onClick={() =>
                  copyText(paymentInfo.transactionId, "transaction")
                }
                className="btn btn-ghost btn-xs"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>

          {/* Tracking ID */}
          <div>
            <p className="text-sm text-base-content/60 mb-1">
              Booking Tracking ID
            </p>
            <div className="flex items-center justify-between bg-base-100 px-3 py-2 rounded-lg border border-base-300">
              <span className="font-mono text-sm truncate">
                {paymentInfo.trackingId}
              </span>
              <button
                onClick={() => copyText(paymentInfo.trackingId, "tracking")}
                className="btn btn-ghost btn-xs"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Copied feedback */}
        {copied && (
          <p className="text-sm text-success mt-3">
            {copied === "transaction"
              ? "Transaction ID copied!"
              : "Tracking ID copied!"}
          </p>
        )}

        {/* Redirect note */}
        <p className="mt-6 text-sm text-base-content/50">
          Redirecting to{" "}
          <span className="font-medium">My Bookings</span> in a few seconds...
        </p>

        {/* Manual button */}
        <button
          onClick={() => (window.location.href = "/dashboard/my-bookings")}
          className="btn btn-outline btn-success mt-4 w-full rounded-full"
        >
          Go to My Bookings
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
