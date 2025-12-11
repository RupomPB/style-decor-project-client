import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function Services() {
  const axiosSecure = useAxiosSecure();

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <p className="text-center py-20 text-xl font-semibold animate-pulse">
        Loading Services...
      </p>
    );

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-14">
        Our <span className="text-primary">Decoration Packages</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((item, idx) => (
          <motion.div
            key={item._id || idx}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="h-56 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover group-hover:scale-110 transition-all duration-500"
              />
            </div>

            <div className="p-6 space-y-3">
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                {item.description}
              </p>
              <p className="text-primary font-bold text-xl">৳ {item.price}</p>

              <button className="w-full bg-gradient-to-r from-primary to-blue-500 text-white font-semibold py-3 rounded-xl mt-2 hover:opacity-90 transition-all">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}