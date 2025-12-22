import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaCheck, FaTimes, FaUserTie, FaUserMinus } from "react-icons/fa";
import { useState, useEffect } from "react";

const ApproveDecorators = () => {
  const axiosSecure = UseAxiosSecure();
  const [displayDecorators, setDisplayDecorators] = useState([]);

  const { data: decorators = [], isLoading } = useQuery({
    queryKey: ["decorators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorators");
      return res.data;
    },
  });

  useEffect(() => {
    if (decorators.length > 0) {
      setDisplayDecorators(decorators);
    }
  }, [decorators]);

  const updateDecoratorStatus = (decorator, status) => {
    const updateInfo = { status: status, email: decorator.email };

    // রিমুভ করার আগে একটি সতর্কবার্তা (Confirmation) দেখানো ভালো
    const actionText = status === 'pending' ? "remove this decorator's special status" : `set status to ${status}`;

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${actionText}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: status === 'approved' ? "#22c55e" : "#ef4444",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, update it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/decorators/${decorator._id}`, updateInfo).then((res) => {
          if (res.data.modifiedCount > 0) {
            const updatedList = displayDecorators.map((item) =>
              item._id === decorator._id ? { ...item, status: status } : item
            );
            setDisplayDecorators(updatedList);

            Swal.fire({
              title: "Updated!",
              text: `Decorator is now ${status}.`,
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        });
      }
    });
  };

  if (isLoading) return <div className="text-center py-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

  return (
    <section className="p-6 bg-base-100 min-h-screen">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <FaUserTie className="text-primary" /> Decorator Applications
          </h2>
          <p className="text-base-content/60 italic">
            Manage applications. Approved decorators will also have their user role updated.
          </p>
        </div>
        <div className="badge badge-primary badge-outline p-4 font-bold">Total: {displayDecorators.length}</div>
      </div>

      <div className="overflow-x-auto shadow-xl rounded-2xl border border-base-300">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base-content font-bold">
            <tr>
              <th>#</th>
              <th>Applicant Details</th>
              <th>Current Status</th>
              <th className="text-center">Manage Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayDecorators.map((decorator, index) => (
              <tr key={decorator._id} className="hover transition-all">
                <th>{index + 1}</th>
                <td>
                  <div className="font-bold text-base">{decorator.name}</div>
                  <div className="text-xs opacity-60 font-medium">{decorator.email}</div>
                </td>
                <td>
                  <span className={`badge badge-sm font-bold p-3 uppercase ${
                    decorator.status === 'approved' ? 'badge-success text-white' : 
                    decorator.status === 'rejected' ? 'badge-error text-white' : 'badge-warning'
                  }`}>
                    {decorator.status}
                  </span>
                </td>
                <td className="text-center">
                  <div className="flex justify-center items-center gap-3">
                    {/* যদি পেন্ডিং থাকে তবে Approve/Reject বাটন দেখাবে */}
                    {decorator.status === 'pending' ? (
                      <>
                        <button 
                          onClick={() => updateDecoratorStatus(decorator, 'approved')}
                          className="btn btn-success btn-xs text-white"
                        >
                          <FaCheck /> Approve
                        </button>
                        <button 
                          onClick={() => updateDecoratorStatus(decorator, 'rejected')}
                          className="btn btn-error btn-xs text-white"
                        >
                          <FaTimes /> Reject
                        </button>
                      </>
                    ) : (
                      // যদি আগে থেকেই Approved বা Rejected থাকে, তবে 'Remove/Reset' বাটন দেখাবে
                      <div className="flex items-center gap-4">
                        <span className={`font-bold text-xs ${decorator.status === 'approved' ? 'text-success' : 'text-error'}`}>
                          {decorator.status === 'approved' ? '✓ ACTIVE DECORATOR' : '✕ REJECTED'}
                        </span>
                        
                        <button 
                          onClick={() => updateDecoratorStatus(decorator, 'pending')}
                          className="btn btn-ghost btn-xs text-warning border border-warning hover:bg-warning hover:text-white flex items-center gap-1"
                          title="Reset to Pending"
                        >
                          <FaUserMinus /> Remove/Reset
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ApproveDecorators;