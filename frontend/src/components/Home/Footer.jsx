import { motion, useInView } from "framer-motion";
import { Instagram, Linkedin, Twitter, Mail } from "lucide-react";
import { useRef } from "react";

const socialLinks = [
  {
    icon: Instagram,
    href: "https://instagram.com",
    label: "Follow CodeCrew on Instagram",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com",
    label: "Connect with CodeCrew on LinkedIn",
  },
  {
    icon: Twitter,
    href: "https://x.com",
    label: "Follow CodeCrew on X",
  },
  {
    icon: Mail,
    href: "mailto:hello@codecrew.io",
    label: "Email CodeCrew",
  },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer className="w-full border-t border-gray-200 bg-gray-50">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="container mx-auto px-6 py-12"
      >
        <div className="flex flex-col items-center space-y-6 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex flex-col items-center sm:items-start">
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-rose-700 bg-clip-text text-xl font-bold text-transparent">
              CodeCrew
            </span>
            <p className="mt-2 text-sm text-gray-500">
              Built for teams that build.
            </p>
          </div>

          <div className="flex items-center space-x-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-gray-500 transition-all hover:text-violet-600"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-gray-400">
          © 2026 CodeCrew. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}