import { useParams, Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  Star,
  CalendarCheck,
  BadgeDollarSign,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

const ServiceDetails = () => {

    const navigate = useNavigate();
    // booking redirect
    const handleBookNow=()=>{
        navigate(`/book-service/${service._id}`)
    }

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: service = {}, isLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/services/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Back */}
      <Link
        to="/service"
        className="inline-flex items-center gap-2 text-sm text-base-content/70 hover:text-primary mb-10"
      >
        <ArrowLeft size={18} /> Back to Services
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image */}
        <div className="relative rounded-3xl overflow-hidden border shadow-xl">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-[480px] object-cover"
          />

          {/* Price Badge */}
          <div className="absolute top-6 right-6 bg-primary text-white px-6 py-2 rounded-full font-semibold shadow-lg">
            ৳ {service.price}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-base-content">
              {service.name}
            </h2>
            <p className="mt-4 text-base-content/70 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Meta
              icon={<BadgeDollarSign />}
              label="Price"
              value={`৳ ${service.price}`}
            />
            <Meta
              icon={<CalendarCheck />}
              label="Duration"
              value={`${service.duration || 3} Days`}
            />
            <Meta
              icon={<Star />}
              label="Rating"
              value={service.rating || "4.8 / 5"}
            />
          </div>

          {/* Features */}
          <div className="bg-base-100 border rounded-2xl p-6 space-y-3">
            <h4 className="font-semibold text-lg">What’s included</h4>
            {(service.features || [
              "Professional decorators",
              "Premium materials",
              "On-time delivery",
            ]).map((item, idx) => (
              <p key={idx} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="text-primary" size={18} />
                {item}
              </p>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button 
            onClick={handleBookNow}
             className="btn btn-primary rounded-full px-10">
              Book Now
            </button>
            <button className="btn btn-outline rounded-full px-10">
              Contact Decorator
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Meta = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 bg-base-100 px-5 py-4 rounded-2xl border shadow-sm">
    <span className="text-primary">{icon}</span>
    <div>
      <p className="text-xs text-base-content/60">{label}</p>
      <p className="font-semibold text-base-content">{value}</p>
    </div>
  </div>
);

export default ServiceDetails;
