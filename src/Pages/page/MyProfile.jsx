import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const MyProfile = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();

  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);

  // 🔹 Load profile from DB
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get("/users/profile")
      .then((res) => {
        setProfile({
          name: res.data?.name || user?.displayName || "",
          phone: res.data?.phone || "",
          address: res.data?.address || "",
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [user, axiosSecure]);

  // 🔹 Handle form change
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      await axiosSecure.patch("/users/profile", profile);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">My Profile</h2>
        <p className="text-sm text-gray-500">
          Manage your personal information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ===== Left Profile Card ===== */}
        <div className="bg-base-100 rounded-xl shadow p-6 flex flex-col items-center text-center">
          <img
            src={user?.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border"
          />

          <h3 className="mt-4 text-lg font-semibold">
            {profile.name || "User Name"}
          </h3>

          <p className="text-sm text-gray-500">{user?.email}</p>

          <span className="mt-2 badge badge-primary capitalize">
            {role}
          </span>
        </div>

        {/* ===== Right Profile Form ===== */}
        <div className="md:col-span-2 bg-base-100 rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            Personal Information
          </h3>

          <form
            onSubmit={handleUpdateProfile}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Name */}
            <div>
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className="input input-bordered w-full bg-base-200 cursor-not-allowed"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="+880 **********"
              />
            </div>

            {/* Address */}
            <div>
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Your address"
              />
            </div>

            {/* Button */}
            <div className="md:col-span-2 mt-4">
              <button className="btn btn-primary w-full">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
