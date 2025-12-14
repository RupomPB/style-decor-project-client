import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function Services() {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services");
      return res.data;
    },
  });

  const filteredServices = services.filter((service) =>
    service.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <p className="text-center py-24 text-lg font-medium animate-pulse text-base-content">
        Loading services...
      </p>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-base-content">
          Our <span className="text-primary">Services</span>
        </h2>
        <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
          Elegant, modern and professional decoration solutions for every occasion
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-14">
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            input input-bordered w-full rounded-full
            bg-base-100 text-base-content
            border-base-300
            focus:outline-none focus:border-primary
          "
        />
      </div>

      {/* Cards */}
      {filteredServices.length === 0 ? (
        <p className="text-center text-base-content/60">
          No services found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredServices.map((item, idx) => (
            <motion.article
              key={item._id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="
                card bg-base-100 border border-base-300
                shadow-md hover:shadow-xl
                transition-all duration-300
              "
            >
              {/* Image */}
              <figure className="h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </figure>

              {/* Content */}
              <div className="card-body space-y-3">
                <h3 className="card-title text-base-content">
                  {item.name}
                </h3>

                <p className="text-sm text-base-content/70 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between pt-4">
                  <span className="text-primary font-bold text-lg">
                    ৳ {item.price}
                  </span>

                  <button className="btn btn-primary btn-sm rounded-full">
                    View Details
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
}
