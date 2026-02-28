import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────
   ANIMATED ILLUSTRATIONS — one per feature
───────────────────────────────────────────── */

/** 1. Real-Time Collaboration — cursors moving, messages typing, ping pulse */
const CollabIllustration = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Background screen */}
    <rect x="20" y="30" width="160" height="110" rx="12" fill="#1f0000" />
    <rect x="20" y="30" width="160" height="18" rx="12" fill="#5f0000" />
    <circle cx="34" cy="39" r="3.5" fill="#f87171" />
    <circle cx="46" cy="39" r="3.5" fill="#fbbf24" />
    <circle cx="58" cy="39" r="3.5" fill="#34d399" />

    {/* Static lines */}
    <rect x="32" y="58" width="50" height="5" rx="2.5" fill="#EA580C" opacity="0.4" />
    <rect x="32" y="68" width="35" height="5" rx="2.5" fill="#EA580C" opacity="0.3" />
    <rect x="32" y="78" width="44" height="5" rx="2.5" fill="#BE123C" opacity="0.3" />

    {/* Chat bubble 1 — slide in from left */}
    <motion.g
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
    >
      <rect x="32" y="95" width="68" height="22" rx="8" fill="#EA580C" />
      <rect x="36" y="101" width="40" height="4" rx="2" fill="#BE123C" opacity="0.8" />
      <rect x="36" y="108" width="28" height="4" rx="2" fill="#ede9fe" opacity="0.5" />
    </motion.g>

    {/* Chat bubble 2 — slide in from right, delayed */}
    <motion.g
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
    >
      <rect x="100" y="95" width="68" height="22" rx="8" fill="#BE123C" />
      <rect x="104" y="101" width="48" height="4" rx="2" fill="#fdf4ff" opacity="0.8" />
      <rect x="104" y="108" width="32" height="4" rx="2" fill="#fdf4ff" opacity="0.5" />
    </motion.g>

    {/* Typing indicator dots */}
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ delay: 1.6, duration: 1.8, repeat: Infinity, repeatDelay: 2 }}
    >
      <rect x="32" y="122" width="44" height="14" rx="7" fill="#312e6b" />
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={43 + i * 9}
          cy={129}
          r={2.5}
          fill="#a78bfa"
          animate={{ y: [0, -3, 0] }}
          transition={{ delay: 1.8 + i * 0.18, duration: 0.6, repeat: Infinity, repeatDelay: 1.5 }}
        />
      ))}
    </motion.g>

    {/* Cursor A — moves diagonally */}
    <motion.g
      animate={{ x: [0, 18, 6, 18, 0], y: [0, 8, 20, 8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <polygon points="130,55 130,70 134,66 137,73 140,72 137,65 142,65" fill="#EA580C" stroke="#1e1b4b" strokeWidth="1" />
      <rect x="131" y="73" width="18" height="8" rx="4" fill="#EA580C" />
      <text x="133" y="79.5" fontSize="5" fill="white" fontFamily="sans-serif">Ana</text>
    </motion.g>

    {/* Cursor B — moves differently */}
    <motion.g
      animate={{ x: [0, -14, -6, -14, 0], y: [0, -6, 14, -6, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
    >
      <polygon points="150,75 150,90 154,86 157,93 160,92 157,85 162,85" fill="#BE123C" stroke="#1e1b4b" strokeWidth="1" />
      <rect x="151" y="93" width="18" height="8" rx="4" fill="#BE123C" />
      <text x="153" y="99.5" fontSize="5" fill="white" fontFamily="sans-serif">Leo</text>
    </motion.g>

    {/* Live ping dot */}
    <motion.circle
      cx="172"
      cy="37"
      r="5"
      fill="#34d399"
      animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }}
      transition={{ duration: 1.4, repeat: Infinity }}
    />
    <circle cx="172" cy="37" r="3" fill="#34d399" />

    {/* Avatar row */}
    {[{ x: 32, fill: "#BE123C" }, { x: 44, fill: "#EA580C" }, { x: 56, fill: "#DC2626" }].map((a, i) => (
      <motion.circle
        key={i}
        cx={a.x}
        cy={155}
        r="7"
        fill={a.fill}
        animate={{ y: [0, -3, 0] }}
        transition={{ delay: i * 0.4, duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}
    <text x="70" y="159" fontSize="8" fill="#a78bfa" fontFamily="sans-serif">3 online</text>
    <motion.circle
      cx="162"
      cy="155"
      r="5"
      fill="none"
      stroke="#34d399"
      strokeWidth="1.5"
      animate={{ scale: [1, 2], opacity: [1, 0] }}
      transition={{ duration: 1.2, repeat: Infinity }}
    />
    <circle cx="162" cy="155" r="3" fill="#34d399" />
  </svg>
);

/** 2. Secure File Management — files uploading, shield lock animating */
const FileIllustration = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Cloud outline */}
    <motion.path
      d="M60 130 Q40 130 40 110 Q40 92 58 90 Q60 72 80 70 Q95 58 112 68 Q125 58 138 68 Q158 68 158 88 Q172 92 168 110 Q166 130 148 130 Z"
      fill="#1e1b4b"
      stroke="#7c3aed"
      strokeWidth="2"
    />

    {/* Upload arrow — bounces up */}
    <motion.g
      animate={{ y: [6, -4, 6] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <line x1="100" y1="115" x2="100" y2="88" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" />
      <polyline points="89,98 100,87 111,98" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </motion.g>

    {/* Flying file cards */}
    {[
      { startX: 30, startY: 160, endX: 84, endY: 115, color: "#7c3aed", delay: 0 },
      { startX: 100, startY: 168, endX: 100, endY: 120, color: "#d946ef", delay: 0.7 },
      { startX: 165, startY: 158, endX: 116, endY: 115, color: "#6366f1", delay: 1.4 },
    ].map((f, i) => (
      <motion.g
        key={i}
        animate={{
          x: [0, f.endX - f.startX],
          y: [0, f.endY - f.startY],
          opacity: [0, 1, 1, 0],
          scale: [0.8, 1, 1, 0.5],
        }}
        initial={{ x: 0, y: 0, opacity: 0 }}
        transition={{ delay: f.delay, duration: 1.6, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
        style={{ originX: f.startX + "px", originY: f.startY + "px" }}
      >
        <rect x={f.startX - 10} y={f.startY - 12} width="20" height="24" rx="3" fill={f.color} opacity="0.9" />
        <rect x={f.startX - 7} y={f.startY - 7} width="14" height="3" rx="1.5" fill="white" opacity="0.5" />
        <rect x={f.startX - 7} y={f.startY - 2} width="10" height="3" rx="1.5" fill="white" opacity="0.4" />
        <rect x={f.startX - 7} y={f.startY + 3} width="12" height="3" rx="1.5" fill="white" opacity="0.3" />
      </motion.g>
    ))}

    {/* Shield */}
    <motion.path
      d="M100 148 L86 140 L86 126 Q86 118 100 115 Q114 118 114 126 L114 140 Z"
      fill="#7c3aed"
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: "100px 132px" }}
    />
    <motion.path
      d="M94 131 L98 135 L107 126"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: [0, 1, 1, 0] }}
      transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
    />

    {/* Progress bar */}
    <rect x="40" y="162" width="120" height="6" rx="3" fill="#2d2a5e" />
    <motion.rect
      x="40"
      y="162"
      height="6"
      rx="3"
      fill="url(#progressGrad)"
      animate={{ width: [0, 120, 120, 0] }}
      transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
    />
    <defs>
      <linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#7c3aed" />
        <stop offset="100%" stopColor="#d946ef" />
      </linearGradient>
    </defs>
    <motion.text
      x="100"
      y="178"
      textAnchor="middle"
      fontSize="8"
      fill="#a78bfa"
      fontFamily="sans-serif"
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
    >
      Encrypting...
    </motion.text>
  </svg>
);

/** 3. Smart Task Organization — tasks checking off, priority badges appearing */
const TaskIllustration = () => {
  const tasks = [
    { label: "Design system", priority: "High", color: "#d946ef", done: true, delay: 0 },
    { label: "API integration", priority: "Med", color: "#7c3aed", done: true, delay: 0.7 },
    { label: "Write tests", priority: "Low", color: "#6366f1", done: false, delay: 1.4 },
    { label: "Deploy staging", priority: "High", color: "#d946ef", done: false, delay: 2.1 },
  ];

  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Card bg */}
      <rect x="18" y="20" width="164" height="160" rx="14" fill="#1e1b4b" />
      <rect x="18" y="20" width="164" height="28" rx="14" fill="#2d2a5e" />
      <rect x="18" y="34" width="164" height="14" fill="#2d2a5e" />
      <text x="30" y="38" fontSize="9" fill="#a78bfa" fontFamily="sans-serif" fontWeight="bold">MY TASKS</text>

      {/* Sprint progress arc */}
      <circle cx="162" cy="34" r="10" fill="#1e1b4b" stroke="#2d2a5e" strokeWidth="2" />
      <motion.circle
        cx="162"
        cy="34"
        r="10"
        fill="none"
        stroke="#7c3aed"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="62.8"
        strokeDashoffset="62.8"
        animate={{ strokeDashoffset: [62.8, 20, 62.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        transform="rotate(-90 162 34)"
      />
      <text x="162" y="37.5" textAnchor="middle" fontSize="6" fill="white" fontFamily="sans-serif">68%</text>

      {/* Task rows */}
      {tasks.map((task, i) => (
        <motion.g
          key={i}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}
        >
          {/* Row bg on hover simulation */}
          <motion.rect
            x="24"
            y={58 + i * 30}
            width="152"
            height="24"
            rx="6"
            fill={task.done ? "#7c3aed" : "#252252"}
            animate={{ opacity: task.done ? [0.15, 0.2, 0.15] : 0.4 }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          />

          {/* Checkbox */}
          <motion.rect
            x="32"
            y={64 + i * 30}
            width="12"
            height="12"
            rx="3"
            fill="none"
            stroke={task.color}
            strokeWidth="1.5"
          />
          {task.done && (
            <motion.path
              d={`M34,${70 + i * 30} L37,${73 + i * 30} L42,${67 + i * 30}`}
              stroke={task.color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4 + i * 0.2, duration: 0.4 }}
            />
          )}

          {/* Task label */}
          <text
            x="50"
            y={73 + i * 30}
            fontSize="8.5"
            fill={task.done ? "#a78bfa" : "#e2e8f0"}
            fontFamily="sans-serif"
            textDecoration={task.done ? "line-through" : "none"}
          >
            {task.label}
          </text>

          {/* Priority badge — pops in */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.2, type: "spring", stiffness: 300 }}
          >
            <rect x="144" y={62 + i * 30} width="26" height="12" rx="6" fill={task.color} opacity="0.25" />
            <text x="157" y={71 + i * 30} textAnchor="middle" fontSize="6.5" fill={task.color} fontFamily="sans-serif" fontWeight="bold">
              {task.priority}
            </text>
          </motion.g>
        </motion.g>
      ))}

      {/* Animated "new task" appearing */}
      <motion.g
        animate={{ opacity: [0, 1, 1, 0], y: [6, 0, 0, -4] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, delay: 2.5 }}
      >
        <rect x="24" y="178" width="152" height="0" rx="6" fill="#312e6b" />
        <motion.rect
          x="24"
          y="174"
          width="152"
          height="20"
          rx="6"
          fill="#312e6b"
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, delay: 2.5 }}
        />
        <text x="38" y="187" fontSize="8" fill="#6366f1" fontFamily="sans-serif">+ Add new task...</text>
        <motion.rect
          x="33"
          y="181"
          width="1.5"
          height="10"
          rx="1"
          fill="#a78bfa"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </motion.g>
    </svg>
  );
};

/** 4. Project-Based Access Control — lock animating, tokens flowing, role badges */
const AccessIllustration = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Background */}
    <rect x="15" y="15" width="170" height="170" rx="16" fill="#1e1b4b" />

    {/* Central lock */}
    <motion.g
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: "100px 95px" }}
    >
      <rect x="78" y="78" width="44" height="34" rx="8" fill="#7c3aed" />
      <motion.path
        d="M88 78 L88 68 Q88 56 100 56 Q112 56 112 68 L112 78"
        stroke="#a78bfa"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        animate={{ stroke: ["#a78bfa", "#d946ef", "#a78bfa"] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <circle cx="100" cy="93" r="6" fill="#ede9fe" />
      <motion.rect
        x="99"
        y="93"
        width="2"
        height="7"
        rx="1"
        fill="#7c3aed"
        animate={{ scaleY: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        style={{ transformOrigin: "100px 93px" }}
      />
    </motion.g>

    {/* Orbiting role nodes */}
    {[
      { angle: 0, label: "Admin", color: "#d946ef", r: 55 },
      { angle: 120, label: "Dev", color: "#7c3aed", r: 55 },
      { angle: 240, label: "View", color: "#6366f1", r: 55 },
    ].map((node, i) => {
      const rad = (node.angle * Math.PI) / 180;
      const cx = 100 + node.r * Math.cos(rad);
      const cy = 95 + node.r * Math.sin(rad);
      return (
        <motion.g
          key={i}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 95px" }}
        >
          {/* Dashed orbit line segment */}
          <motion.line
            x1="100"
            y1="95"
            x2={cx}
            y2={cy}
            stroke={node.color}
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.4"
          />
          <circle cx={cx} cy={cy} r="18" fill="#2d2a5e" stroke={node.color} strokeWidth="1.5" />
          <text
            x={cx}
            y={cy + 3}
            textAnchor="middle"
            fontSize="7"
            fill={node.color}
            fontFamily="sans-serif"
            fontWeight="bold"
          >
            {node.label}
          </text>
        </motion.g>
      );
    })}

    {/* Token packets shooting toward lock */}
    {[0, 1, 2].map((i) => {
      const angles = [0, 120, 240];
      const rad = (angles[i] * Math.PI) / 180;
      const startX = 100 + 55 * Math.cos(rad);
      const startY = 95 + 55 * Math.sin(rad);
      const colors = ["#d946ef", "#7c3aed", "#6366f1"];
      return (
        <motion.circle
          key={i}
          cx={startX}
          cy={startY}
          r="3"
          fill={colors[i]}
          animate={{
            cx: [startX, 100],
            cy: [startY, 95],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0],
          }}
          transition={{
            duration: 1.4,
            delay: i * 0.6,
            repeat: Infinity,
            repeatDelay: 2.4,
            ease: "easeIn",
          }}
        />
      );
    })}

    {/* JWT label */}
    <motion.g
      animate={{ opacity: [0, 1, 1, 0], y: [4, 0, 0, -4] }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
    >
      <rect x="62" y="148" width="76" height="16" rx="8" fill="#312e6b" />
      <text x="100" y="159.5" textAnchor="middle" fontSize="7.5" fill="#a78bfa" fontFamily="monospace">
        JWT ✓ verified
      </text>
    </motion.g>
  </svg>
);

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const features = [
  {
    id: 1,
    title: "Real-Time Collaboration",
    description:
      "Work together seamlessly with live task updates, project-based chat rooms, and instant notifications powered by WebSockets.",
    illustration: <CollabIllustration />,
    gradient: "from-orange-100 via-red-50 to-rose-100",
    glowColor: "rgba(251, 113, 133, 0.18)",
  },
  {
    id: 2,
    title: "Secure File Management",
    description:
      "Upload and manage attachments securely with AWS S3 private buckets and signed URL access.",
    illustration: <FileIllustration />,
    gradient: "from-orange-100 via-red-50 to-rose-100",
    glowColor: "rgba(251, 113, 133, 0.18)",
  },
  {
    id: 3,
    title: "Smart Task Organization",
    description:
      "Assign priorities, due dates, subtasks, and statuses to keep every project structured and on track.",
    illustration: <TaskIllustration />,
    gradient: "from-orange-100 via-red-50 to-rose-100",
    glowColor: "rgba(251, 113, 133, 0.18)",
  },
  {
    id: 4,
    title: "Project-Based Access Control",
    description:
      "JWT-based authentication and scoped access ensure data security across all teams.",
    illustration: <AccessIllustration />,
    gradient: "from-orange-100 via-red-50 to-rose-100",
    glowColor: "rgba(251, 113, 133, 0.18)",
  },
];

/* ─────────────────────────────────────────────
   ILLUSTRATION PANEL
───────────────────────────────────────────── */
const IllustrationPanel = ({ feature }) => (
  <motion.div
    key={feature.id}
    initial={{ opacity: 0, x: -24, scale: 0.96 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    exit={{ opacity: 0, x: 24, scale: 0.96 }}
    transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
    className="w-full h-full flex items-center justify-center"
  >
    <div className="w-52 h-52 sm:w-64 sm:h-64">{feature.illustration}</div>
  </motion.div>
);

//////////////////////////////////////////////////////////////
// MAIN SECTION
//////////////////////////////////////////////////////////////

export default function Features() {
  const [activeId, setActiveId] = useState(1);
  const activeFeature = features.find((f) => f.id === activeId);

  return (
    <section id="features" className="bg-gradient-to-b to-rose-200 from-white py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div className="flex justify-start">
            <div className="relative w-full max-w-sm">

              {/* Glow */}
              <motion.div
                key={activeFeature.id + "-glow"}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-3xl blur-3xl"
                style={{
                  background: `radial-gradient(circle at center, ${activeFeature.glowColor} 0%, transparent 70%)`,
                }}
              />

              {/* Card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className={`relative rounded-3xl bg-gradient-to-br ${activeFeature.gradient} shadow-xl overflow-hidden`}
                style={{ aspectRatio: "1 / 1" }}
              >
                {/* Top bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-600 via-red-600 to-rose-700 rounded-t-3xl" />

                {/* Window dots */}
                <div className="absolute top-4 left-5 flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 opacity-70" />
                </div>

                <div className="w-full h-full p-10 pt-12">
                  <AnimatePresence mode="wait">
                    <IllustrationPanel feature={activeFeature} />
                  </AnimatePresence>
                </div>

                {/* Badge */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2.5 flex items-center gap-2 shadow-md"
                  >
                    <motion.span
                      className="w-2 h-2 rounded-full bg-orange-600"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                    <span className="text-xs font-semibold text-rose-700 truncate">
                      {activeFeature.title}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-8">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-rose-600 bg-rose-50 rounded-full px-4 py-1.5 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                Built for modern teams
              </span>

              <h2 className="text-4xl font-extrabold text-gray-900">
                Everything Your<br />
                <span className="bg-gradient-to-r from-orange-600 via-red-600 to-rose-700 bg-clip-text text-transparent">
                  Team Needs
                </span>
              </h2>

              <p className="mt-3 text-gray-500 max-w-sm">
                CodeCrew brings your workflow, teammates, and tools into one unified space — so you can focus on shipping.
              </p>
            </div>

            {/* Feature List */}
            <div className="flex flex-col gap-1">
              {features.map((feature) => {
                const isActive = feature.id === activeId;

                return (
                  <motion.button
                    key={feature.id}
                    onClick={() => setActiveId(feature.id)}
                    whileHover={{ scale: 1.02 }}
                    className={`w-full text-left rounded-2xl px-5 py-4 flex gap-4 items-start transition-all ${
                      isActive
                        ? "bg-orange-50 shadow-sm"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="mt-0.5">
                      <motion.div
                        animate={{
                          height: isActive ? 40 : 20,
                          opacity: isActive ? 1 : 0.3,
                        }}
                        className="w-1 rounded-full bg-gradient-to-b from-orange-600 to-rose-700"
                      />
                    </div>

                    <div className="flex-1">
                      <span
                        className={`block font-bold mb-1 ${
                          isActive
                            ? "text-rose-600"
                            : "text-gray-600 hover:text-gray-800"
                        }`}
                      >
                        {feature.title}
                      </span>

                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-sm text-gray-500"
                          >
                            {feature.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}