import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const navLinks = ["Features", "Pricing", "How It Works"];

function NavLink({ label }) {
  return (
    <motion.a
      href={`#${label.toLowerCase()}`}
      className="relative text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-md px-1 py-0.5 group"
    >
      {label}
      <motion.span
        className="absolute left-0 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-rose-500"
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      />
    </motion.a>
  );
}

function CTAButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="inline-flex items-center justify-center px-5 py-2 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-orange-600 via-red-600 to-rose-700 shadow-md shadow-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 cursor-pointer"
    >
      Get Started
    </motion.button>
  );
}

function HamburgerIcon({ isOpen }) {
  return (
    <div className="flex flex-col justify-center items-center w-5 h-5 gap-1.5">
      <motion.span
        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="block w-5 h-0.5 rounded-full bg-gray-700 origin-center"
      />
      <motion.span
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="block w-5 h-0.5 rounded-full bg-gray-700 origin-center"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="block w-5 h-0.5 rounded-full bg-gray-700 origin-center"
      />
    </div>
  );
}

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scaleY: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -6,
    scaleY: 0.97,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const linkItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.25, ease: "easeOut" },
  }),
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 

  const closeMenu = () => setMenuOpen(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.div
        animate={
          scrolled
            ? {
                backgroundColor: "rgba(255,255,255,0.75)",
                boxShadow: "0 1px 16px 0 rgba(139,92,246,0.08)",
              }
            : {
                backgroundColor: "rgba(255,255,255,0)",
                boxShadow: "0 0px 0px 0 rgba(0,0,0,0)",
              }
        }
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`w-full ${scrolled ? "backdrop-blur-md" : ""} transition-[backdrop-filter] duration-300`}
      >
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="text-2xl font-bold tracking-tight bg-gradient-to-r from-orange-600 via-red-600 to-rose-700 bg-clip-text text-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-md"
          >
            CodeCrew
          </motion.a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link} label={link} />
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <CTAButton onClick={() => navigate('/auth')}/>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex lg:hidden items-center justify-center w-9 h-9 rounded-xl hover:bg-violet-50 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <HamburgerIcon isOpen={menuOpen} />
          </button>
        </nav>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden mx-4 mb-3 rounded-2xl bg-white/90 backdrop-blur-lg shadow-xl shadow-violet-100 border border-violet-50 overflow-hidden origin-top"
            >
              <div className="flex flex-col px-5 py-4 gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    custom={i}
                    variants={linkItemVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={closeMenu}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-violet-600 hover:bg-violet-50 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 group"
                  >
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    />
                    {link}
                  </motion.a>
                ))}

                <motion.div
                  custom={navLinks.length}
                  variants={linkItemVariants}
                  initial="hidden"
                  animate="visible"
                  className="mt-2 pt-3 border-t border-violet-50"
                >
                  <CTAButton onClick={closeMenu} />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}