import { motion } from "framer-motion";

export default function CTAButton({ children, variant = "primary", onClick }) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 rounded-2xl font-medium text-base transition-all duration-200 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-gradient-to-r from-orange-600 via-red-600 to-rose-700 text-white shadow-lg shadow-orange-200 hover:brightness-110 active:scale-95",
    secondary:
      "border-2 border-violet-200 text-rose-600 bg-white hover:bg-rose-50 hover:border-rose-300 active:scale-95 shadow-sm",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`${base} ${variants[variant]}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}