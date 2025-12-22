import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaCheck, FaTimes } from "react-icons/fa";
import Decorator from './../../Decorator/Decorator';

const ApproveDecorators = () => {
  const axiosSecure = UseAxiosSecure();

  const {
    data: decorators = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["decorators",'pending' ],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorators?status=pending");
      return res.data;
    },
  });

  /* ---------- Approval Logic ---------- */

  const updateDecoratorStatus =(decorator, status )=>{
     const updateInfo = { status: status, email: decorator.email};

    axiosSecure.patch(`/decorators/${decorator._id}`, updateInfo)
      .then(res => {
        if (res.data.modifiedCount > 0) {
        
          refetch(); 
          
       
          Swal.fire({
            title: "Success!",
            text: `Decorator status is set to ${status}.`,
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          });
        }
      })

  }
  const handleApprove = (decorator) => {
   
    updateDecoratorStatus(decorator, 'approved')
  };

  const handleRejection = decorator=>{
    updateDecoratorStatus(decorator, 'rejected')
  }

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
      <div className="text-center py-20 text-error font-semibold">
        Failed to load pending applications.
      </div>
    );
  }

  return (
    <section className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-base-content">Pending Approvals</h2>
        <p className="text-sm text-base-content/60">
          Review and approve decorator applications
        </p>
      </div>

      {/* Summary Stat */}
      <div className="stats bg-base-100 shadow border border-base-300 mb-6">
        <div className="stat">
          <div className="stat-title">New Requests</div>
          <div className="stat-value text-primary">{decorators.length}</div>
        </div>
      </div>

      {/* Table Section */}
      {decorators.length === 0 ? (
        <div className="text-center py-24 text-base-content/60 bg-base-100 rounded-xl border border-dashed border-base-300">
          No pending applications at the moment.
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-xl shadow border border-base-300">
          <table className="table table-zebra w-full">
            {/* Table Head */}
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                
                <th>Applicant Details</th>
                <th>Location</th>
                <th>Phone</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {decorators.map((decorator, index) => (
                <tr key={decorator._id} className="hover">
                  <td>{index + 1}</td>
                  <td>
                    <div>
                      <div className="font-bold">{decorator.name}</div>
                      <div className="text-sm opacity-50">{decorator.email}</div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-ghost badge-sm mr-1">
                      {decorator.region}
                    </span>
                    <span className="text-xs">{decorator.district}</span>
                  </td>
                  <td className="text-sm">{decorator.phone}</td>
                  <td>
                    {
                        <p className={`${decorator.status === 'approved'? 'text-green-700': 'text-red-500'}`}>{decorator.status}</p>
                    }
                  </td>
                  <td>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleApprove(decorator)}
                        className="btn btn-success btn-xs text-white"
                        title="Approve"
                      >
                        <FaCheck /> Approve
                      </button>
                      <button 
                      onClick={()=>handleRejection(decorator)}
                        className="btn btn-error btn-xs text-white"
                        title="Reject"
                      >
                        <FaTimes />
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

export default ApproveDecorators;