import { motion } from "framer-motion";
import HeroImage from "./HeroImage";
import CTAButton from "./CTAButton";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const Blob = ({ className }) => (
  <motion.div
    className={className}
    animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
  />
);

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-rose-50">
      {/* Background blobs */}
      <Blob className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-violet-300 via-fuchsia-200 to-indigo-200 opacity-40 blur-3xl pointer-events-none" />
      <Blob className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-gradient-to-br from-fuchsia-300 to-purple-200 opacity-30 blur-3xl pointer-events-none" />
      <Blob className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-200 to-violet-100 opacity-30 blur-2xl pointer-events-none" />

      <div className="container mx-auto px-6 pt-28 pb-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-8 w-full">
        {/* LEFT — Text */}
        <div className="flex-1 flex flex-col items-start ml-[7.5vw]  gap-7 relative z-10">
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.05}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-violet-100 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-gradient-to-br from-orange-600 to-red-600 animate-pulse" />
            <span className="text-sm font-medium text-orange-600 tracking-wide">
              Real-time collaboration, reimagined
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.15}
            className="text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08] text-gray-900"
          >
            Build{" "}
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-rose-700 bg-clip-text text-transparent">
              Together.
            </span>
            <br />
            Ship{" "}
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-rose-700 bg-clip-text text-transparent">
              Faster.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.28}
            className="text-lg text-gray-500 max-w-md leading-relaxed"
          >
            CodeCrew brings your team into one real-time workspace where
            projects, tasks, and conversations move in sync.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="flex flex-wrap gap-4 mt-1"
          >
            <CTAButton variant="primary">Start Collaborating</CTAButton>
            <CTAButton variant="secondary">View Demo</CTAButton>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.52}
            className="flex items-center gap-3 mt-2"
          >
            <div className="flex -space-x-2">
              {["bg-orange-400", "bg-rose-400", "bg-indigo-400", "bg-red-400"].map(
                (color, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${color} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {["A", "B", "C", "D"][i]}
                  </div>
                )
              )}
            </div>
            <p className="text-sm text-gray-400">
              <span className="text-gray-700 font-semibold">2,400+</span> devs
              already shipping
            </p>
          </motion.div>
        </div>

        {/* RIGHT — Illustration */}
        <div className="flex-1 flex justify-center items-start relative z-10 w-full">
          <HeroImage />
        </div>
      </div>
    </section>
  );
}