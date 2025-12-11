import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import herobanner from "../../assets/herobanner.jpg";

const Button = ({ children, className }) => (
  <button
    className={`bg-linear-to-r from-primary to-blue-500 text-white font-semibold px-7 py-4 rounded-2xl shadow-lg flex items-center gap-2 transition-all duration-300 ${className}`}
  >
    {children}
  </button>
);

export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-[80vh] flex items-center justify-center"
      style={{ backgroundImage: `url(${herobanner})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-20 grid md:grid-cols-2 gap-12 items-center text-white">
        {/* TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight drop-shadow-xl">
            Transform Your Events with
            <span className="text-primary"> StyleDecor</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-xl drop-shadow-lg">
            Professional decoration services for weddings, birthdays, parties & corporate events. Create unforgettable memories with our stunning designs.
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button>
              Book Decoration Service <ArrowRight size={22} />
            </Button>
          </motion.div>
        </motion.div>

        {/* FLOATING ANIMATED IMAGE CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="bg-white/10 backdrop-blur-xl p-4 rounded-3xl shadow-2xl"
          >
            <img
              src={herobanner}
              alt="Decoration Sample"
              className="rounded-2xl w-full max-w-md shadow-xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
