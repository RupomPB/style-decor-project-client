import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import UseAxiosSecure from "../hooks/useAxiosSecure";
import { ArrowRight } from "lucide-react";

export default function Service() {
  const axiosSecure = UseAxiosSecure();
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
      {/* Header */}
      <div className="mb-16 max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold text-base-content">
          All <span className="text-primary">Decoration Services</span>
        </h2>
        <p className="mt-4 text-base-content/70">
          Explore our complete range of professional decoration services, designed
          to elevate weddings, corporate events, parties, and special occasions.
        </p>
      </div>

      {/* Search */}
      <div className="mb-14 max-w-md">
        <input
          type="text"
          placeholder="Search by service name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            input input-bordered w-full
            bg-base-100 text-base-content
            border-base-300
            focus:border-primary
          "
        />
      </div>

      {/* Services List */}
      {filteredServices.length === 0 ? (
        <p className="text-base-content/60">No services found.</p>
      ) : (
        <div className="space-y-10">
          {filteredServices.map((item, idx) => (
            <motion.div
              key={item._id || idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="
                flex flex-col md:flex-row gap-8
                bg-base-100 border border-base-300
                rounded-2xl overflow-hidden
                shadow-sm hover:shadow-xl
                transition-shadow
              "
            >
              {/* Image */}
              <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Category */}
                  <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {item.category || "Decoration"}
                  </span>

                  <h3 className="text-2xl font-semibold text-base-content">
                    {item.name}
                  </h3>

                  <p className="text-base-content/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">
                    ৳ {item.price}
                  </span>

                  <button className="group flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all">
                    View Details
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
