import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: payments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  /* ---------- Loading State ---------- */
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  /* ---------- Error State ---------- */
  if (isError) {
    return (
      <div className="text-center py-20 text-error">
        Failed to load payment history
      </div>
    );
  }

  return (
    <section className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-base-content">
          Payment History
        </h2>
        <p className="text-sm text-base-content/60">
          Track all your completed transactions
        </p>
      </div>

      {/* Summary Card */}
      <div className="stats bg-base-100 shadow border border-base-300 mb-6">
        <div className="stat">
          <div className="stat-title">Total Payments</div>
          <div className="stat-value text-primary">
            {payments.length}
          </div>
        </div>
      </div>

      {/* Table */}
      {payments.length === 0 ? (
        <div className="text-center py-24 text-base-content/60">
          You have not made any payments yet
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-xl shadow border border-base-300">
          <table className="table table-zebra">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Service</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Transaction</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id} className="hover">
                  <td>{index + 1}</td>

                  <td className="font-medium">
                    {payment.serviceName}
                  </td>

                  <td className="font-semibold">
                    ৳ {payment.amount}
                  </td>

                  <td>
                    <span className="badge badge-success badge-outline">
                      Paid
                    </span>
                  </td>

                  <td className="text-xs text-base-content/70">
                    <p>{payment.transactionId}</p>
                    <p className="text-primary">
                      {payment.trackingId}
                    </p>
                  </td>

                  <td className="text-sm">
                    {new Date(payment.paidAt).toLocaleDateString()}
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

export default PaymentHistory;
