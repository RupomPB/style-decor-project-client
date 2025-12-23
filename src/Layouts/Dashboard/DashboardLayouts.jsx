import React, { useEffect, useState } from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { Link, NavLink, Outlet } from "react-router";
import useRole from "../../hooks/useRole";
import UseAxiosSecure from "../../hooks/useAxiosSecure";

const DashboardLayouts = () => {
  const { role } = useRole();
  const axiosSecure = UseAxiosSecure();
  const [profile, setProfile] = useState(null);

  // fetch profile data from backend
  useEffect(() => {
    axiosSecure
      .get("/users/profile")
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, []);

  const navItem =
    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all";
  const activeNav = "bg-primary text-white shadow-md";
  const inactiveNav = "text-base-content hover:bg-base-300";

  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto min-h-screen">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* ================= CONTENT ================= */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar */}
        <div className="sticky top-0 z-30 navbar bg-base-100 border-b">
          <label
            htmlFor="my-drawer-4"
            className="btn btn-ghost btn-square lg:hidden"
          >
            ☰
          </label>
          <h1 className="text-lg font-semibold px-2">
            Style Decor Dashboard
          </h1>
        </div>

        {/* Page Content */}
        <div className="p-6 bg-base-200 min-h-screen space-y-6">
          {/* ===== My Profile Card ===== */}
          {profile && (
            <div className="bg-base-100 rounded-xl shadow p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
              <img
                src={profile.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
                alt="profile"
                className="w-28 h-28 rounded-full object-cover border"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">
                  {profile.name || profile.displayName || "User Name"}
                </h3>
                <p className="text-sm text-gray-500">{profile.email}</p>
                <p className="text-sm text-gray-500">
                  Phone: {profile.phone || "Not added"}
                </p>
                <p className="text-sm text-gray-500">
                  Address: {profile.address || "Not added"}
                </p>
                <span className="mt-2 badge badge-primary capitalize">
                  {profile.role}
                </span>
              </div>
            </div>
          )}

          {/* Outlet for nested routes */}
          <div className="bg-base-100 rounded-xl shadow p-6">
            <Outlet />
          </div>
        </div>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <aside className="w-64 bg-base-100 border-r min-h-screen px-4 py-6">
          {/* Brand */}
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold">Style Decor</h2>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>

          <ul className="space-y-1">
            {/* Home */}
            <li>
              <Link to="/" className={`${navItem} ${inactiveNav}`}>
                🏠 Home
              </Link>
            </li>

            <div className="divider my-3"></div>

            {/* User Section */}
            <p className="text-xs uppercase text-gray-400 px-2 mb-2">User</p>

            <li>
              <NavLink
                to="/dashboard/my-bookings"
                className={({ isActive }) =>
                  `${navItem} ${isActive ? activeNav : inactiveNav}`
                }
              >
                <CiDeliveryTruck />
                My Bookings
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/payment-history"
                className={({ isActive }) =>
                  `${navItem} ${isActive ? activeNav : inactiveNav}`
                }
              >
                💳 Payment History
              </NavLink>
            </li>

            {/* Admin Section */}
            {role === "admin" && (
              <>
                <div className="divider my-3"></div>
                <p className="text-xs uppercase text-gray-400 px-2 mb-2">
                  Admin
                </p>

                <li>
                  <NavLink
                    to="/dashboard/approve-decorators"
                    className={({ isActive }) =>
                      `${navItem} ${isActive ? activeNav : inactiveNav}`
                    }
                  >
                    ✅ Approve Decorators
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/user-management"
                    className={({ isActive }) =>
                      `${navItem} ${isActive ? activeNav : inactiveNav}`
                    }
                  >
                    👥 User Management
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/statics"
                    className={({ isActive }) =>
                      `${navItem} ${isActive ? activeNav : inactiveNav}`
                    }
                  >
                    📊 Statics
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/assign-decorators"
                    className={({ isActive }) =>
                      `${navItem} ${isActive ? activeNav : inactiveNav}`
                    }
                  >
                    🎯 Assign Decorators
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayouts;
