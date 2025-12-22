import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

/* ⭐ Star Rating Component */
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);

  return (
    <div className="flex justify-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < fullStars
              ? "fill-primary text-primary"
              : "text-base-content/30"
          }
        />
      ))}
    </div>
  );
};

const TopDecoratorsSection = () => {
  const axiosSecure = useAxiosSecure();

  const { data: decorators = [], isLoading } = useQuery({
    queryKey: ["top-decorators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-decorators");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <p className="text-center py-24 text-base-content animate-pulse">
        Loading top decorators...
      </p>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-base-content">
          Top <span className="text-primary">Decorators</span>
        </h2>
        <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
          Highly rated professionals with proven decoration expertise
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {decorators.map((decorator, idx) => (
          <motion.div
            key={decorator._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="
              card bg-base-100 border border-base-300
              shadow-md hover:shadow-xl
              transition-all duration-300
            "
          >
            {/* Image */}
            <figure className="h-60 overflow-hidden">
              <img
                src={decorator.image}
                alt={decorator.name}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </figure>

            {/* Content */}
            <div className="card-body text-center space-y-2">
              <h3 className="text-xl font-semibold text-base-content">
                {decorator.name}
              </h3>

              <p className="text-sm text-base-content/70">
                {decorator.specialty}
              </p>

              {/* Rating */}
              <div className="pt-2">
                <StarRating rating={decorator.rating} />
                <p className="text-xs text-base-content/60 mt-1">
                  {decorator.rating} out of 5
                </p>
              </div>

              <button className="btn btn-primary btn-sm rounded-full mt-5">
                View Profile
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TopDecoratorsSection;
