import React from "react";
import { useForm, useWatch } from "react-hook-form";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { FaUserEdit, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe } from "react-icons/fa";

const Decorator = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();
  const serviceCenters = useLoaderData() || [];

  const regions = [...new Set(serviceCenters.map((c) => c.region))];
  const selectedRegion = useWatch({ control, name: "region" });

  const districtByRegion = (region) => {
    return serviceCenters
      .filter((c) => c.region === region)
      .map((d) => d.district);
  };

  const handleDecoratorApplication = (data) => {
    Swal.fire({
      title: "Confirm Application?",
      text: "By clicking 'I Agree', you apply to become a certified decorator.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Yes, Apply!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/decorators", data).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Success!",
              text: "Your application is under review. We will contact you soon!",
              icon: "success",
              timer: 3000,
              showConfirmButton: false,
            });
          }
        }).catch(error=> {
            Swal.fire("Error", "Check if your server is running!", "error");
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-primary mb-2">Become a Decorator</h1>
          <p className="text-base-content/70">Join our community of professional stylists and decorators</p>
        </div>

        <div className="card bg-base-100 shadow-xl border border-base-300">
          <form onSubmit={handleSubmit(handleDecoratorApplication)} className="card-body p-8">
            <h2 className="card-title text-2xl mb-6 border-b pb-2 flex items-center gap-2 text-secondary">
              <FaUserEdit /> Personal & Professional Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Decorator Name */}
              <div className="form-control">
                <label className="label font-semibold"><span className="label-text">Full Name</span></label>
                <div className="relative">
                  <FaUserEdit className="absolute left-3 top-4 text-gray-400" />
                  <input
                    defaultValue={user?.displayName}
                    {...register("name", { required: true })}
                    className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label font-semibold"><span className="label-text">Official Email</span></label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
                  <input
                    defaultValue={user?.email}
                    {...register("email", { required: true })}
                    className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary"
                    readOnly
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="form-control">
                <label className="label font-semibold"><span className="label-text">Contact Number</span></label>
                <div className="relative">
                  <FaPhoneAlt className="absolute left-3 top-4 text-gray-400" />
                  <input
                    type="tel"
                    {...register("phone", { required: true })}
                    placeholder="e.g., +880123456789"
                    className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="form-control">
                <label className="label font-semibold"><span className="label-text">Detailed Address</span></label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-4 text-gray-400" />
                  <input
                    {...register("decoratorAddress", { required: true })}
                    placeholder="House, Street, Area"
                    className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Regions select */}
              <div className="form-control">
                <label className="label font-semibold"><span className="label-text">Work Region</span></label>
                <div className="relative">
                  <FaGlobe className="absolute left-3 top-4 text-gray-400 z-10" />
                  <select
                    {...register("region", { required: true })}
                    defaultValue="Pick a Region"
                    className="select select-bordered w-full pl-10 focus:ring-2 focus:ring-primary"
                  >
                    <option disabled>Pick a Region</option>
                    {regions.map((r, i) => (
                      <option key={i} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Districts Select */}
              <div className="form-control">
                <label className="label font-semibold"><span className="label-text">Preferred District</span></label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-4 text-gray-400 z-10" />
                  <select
                    {...register("district", { required: true })}
                    defaultValue="Pick a District"
                    className="select select-bordered w-full pl-10 focus:ring-2 focus:ring-primary"
                    disabled={!selectedRegion}
                  >
                    <option disabled value="Pick a District">Pick a District</option>
                    {districtByRegion(selectedRegion).map((d, i) => (
                      <option key={i} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            <div className="mt-10 card-actions justify-center">
              <button 
                type="submit" 
                className="btn btn-primary btn-wide text-white font-bold text-lg hover:scale-105 transition-transform"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Decorator;