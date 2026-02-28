import { motion } from "framer-motion";

const CodeLine = ({ width, color, delay }) => (
  <motion.div
    initial={{ scaleX: 0, opacity: 0 }}
    animate={{ scaleX: 1, opacity: 1 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`h-2.5 rounded-full ${color} origin-left`}
    style={{ width }}
  />
);

const AvatarDot = ({ color, initials, label }) => (
  <div className="flex items-center gap-2">
    <div
      className={`w-7 h-7 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold shadow`}
    >
      {initials}
    </div>
    <span className="text-xs text-gray-400 font-medium">{label}</span>
    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-auto animate-pulse" />
  </div>
);

export default function HeroImage() {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-full max-w-md"
    >
      {/* Glow backdrop */}
      <div className="absolute inset-0 -m-6 rounded-3xl bg-gradient-to-br from-orange-600 via-red-600 to-rose-700 opacity-20 blur-2xl" />

      {/* Main card */}
      <div className="relative rounded-3xl bg-white shadow-2xl shadow-violet-100 overflow-hidden border border-violet-50">
        {/* Card header bar */}
        <div className="bg-gradient-to-r from-orange-600 via-red-600 to-rose-700 px-5 py-3.5 flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-white opacity-40" />
            <div className="w-3 h-3 rounded-full bg-white opacity-40" />
            <div className="w-3 h-3 rounded-full bg-white opacity-40" />
          </div>
          <div className="flex-1 mx-4 bg-white bg-opacity-20 rounded-md h-5 flex items-center px-3">
            <span className="text-white text-opacity-70 text-xs font-mono">
              codecrew.app/workspace/alpha
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="p-5 flex flex-col gap-4 bg-gradient-to-br from-slate-50 to-white">
          {/* File tabs */}
          <div className="flex gap-2">
            {["index.ts", "api.ts", "utils.ts"].map((tab, i) => (
              <div
                key={tab}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium ${
                  i === 0
                    ? "bg-violet-100 text-orange-700"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Code lines */}
          <div className="flex flex-col gap-2 p-3 rounded-xl bg-slate-900">
            <div className="flex items-center gap-3">
              <span className="text-slate-600 text-xs font-mono">01</span>
              <CodeLine width="55%" color="bg-red-400" delay={0.3} />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-600 text-xs font-mono">02</span>
              <div className="w-5" />
              <CodeLine width="35%" color="bg-rose-400" delay={0.4} />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-600 text-xs font-mono">03</span>
              <div className="w-10" />
              <CodeLine width="45%" color="bg-red-300" delay={0.5} />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-600 text-xs font-mono">04</span>
              <div className="w-10" />
              <CodeLine width="28%" color="bg-orange-400" delay={0.6} />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-600 text-xs font-mono">05</span>
              <CodeLine width="40%" color="bg-rose-500" delay={0.7} />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-100" />

          {/* Team presence */}
          <div className="flex flex-col gap-2">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
              Active now
            </p>
            <AvatarDot color="bg-orange-400" initials="AK" label="alex.k" />
            <AvatarDot color="bg-rose-400" initials="SM" label="sara.m" />
            <AvatarDot color="bg-red-400" initials="RP" label="raj.p" />
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-xl px-4 py-2.5 border border-violet-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-gray-500 font-medium">
                Live session active
              </span>
            </div>
            <span className="text-xs text-violet-500 font-semibold">3 online</span>
          </div>
        </div>
      </div>

      {/* Floating badge — top right */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -top-4 -right-4 bg-white shadow-xl shadow-violet-100 rounded-2xl px-3 py-2 flex items-center gap-2 border border-violet-50"
      >
        <span className="text-base">🚀</span>
        <div>
          <p className="text-xs font-semibold text-gray-700 leading-tight">Deployed!</p>
          <p className="text-xs text-gray-400 leading-tight">2s ago</p>
        </div>
      </motion.div>

      {/* Floating badge — bottom left */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -bottom-4 -left-4 bg-white shadow-xl shadow-fuchsia-100 rounded-2xl px-3 py-2 flex items-center gap-2 border border-fuchsia-50"
      >
        <span className="text-base">✅</span>
        <div>
          <p className="text-xs font-semibold text-gray-700 leading-tight">PR merged</p>
          <p className="text-xs text-gray-400 leading-tight">feature/auth</p>
        </div>
      </motion.div>
    </motion.div>
  );
}