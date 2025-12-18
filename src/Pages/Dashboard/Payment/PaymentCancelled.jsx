import React from 'react';

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow text-center">
        <h1 className="text-2xl font-bold text-red-600">
          Payment Cancelled ❌
        </h1>
        <p className="mt-2 text-gray-500">
          Your payment was not completed. You can try again from your bookings.
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-4 btn btn-primary"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PaymentCancelled;
