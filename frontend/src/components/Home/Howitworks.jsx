import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AUTO_INTERVAL = 4000;

// ─── Animated Illustrations ────────────────────────────────────────────────

function IllustrationCreateProject() {
  return (
    <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="cardGrad1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#FB923C" />
        </linearGradient>
      </defs>
      <rect x="36" y="40" width="268" height="180" rx="16" fill="white" />
      <rect x="36" y="40" width="268" height="44" rx="16" fill="url(#cardGrad1)" />
      <rect x="36" y="68" width="268" height="16" rx="0" fill="url(#cardGrad1)" />
      <circle cx="58" cy="62" r="5" fill="#c4b5fd" />
      <circle cx="74" cy="62" r="5" fill="#DC2626" />
      <circle cx="90" cy="62" r="5" fill="#EF4444" />
      <motion.rect x="108" y="57" width="120" height="10" rx="5" fill="#7c3aed" opacity="0.25"
        animate={{ width: [60, 120, 60] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />

      <rect x="54" y="100" width="80" height="8" rx="4" fill="#e5e7eb" />
      <motion.rect x="54" y="116" width="180" height="12" rx="6" fill="#ede9fe"
        animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
      <rect x="54" y="136" width="80" height="8" rx="4" fill="#e5e7eb" />
      <rect x="54" y="152" width="140" height="12" rx="6" fill="#ede9fe" />

      {[0, 1, 2].map((i) => (
        <motion.circle key={i} cx={198 + i * 18} cy={130} r="12"
          fill={["#EF4444", "#FB923C", "#f0abfc"][i]}
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.4, duration: 0.6, repeat: Infinity, repeatDelay: 3, ease: "easeOut" }}
        />
      ))}

      <motion.rect x="54" y="192" width="100" height="20" rx="10" fill="#EF4444"
        animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "104px", originY: "202px" }}
      />
      <rect x="80" y="198" width="48" height="8" rx="4" fill="white" opacity="0.8" />

      <motion.g animate={{ y: [0, -6, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
        <rect x="210" y="175" width="76" height="24" rx="12" fill="#EF4444" />
        <text x="248" y="190" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">✓ Created!</text>
      </motion.g>
    </svg>
  );
}

function IllustrationOrganizeTasks() {
  return (
    <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="24" y="30" width="292" height="200" rx="16" fill="white" />
      <rect x="24" y="30" width="292" height="42" rx="16" fill="#f5f3ff" />
      <rect x="24" y="56" width="292" height="16" fill="#f5f3ff" />
      <rect x="40" y="44" width="56" height="14" rx="7" fill="#EF4444" opacity="0.2" />
      <rect x="104" y="44" width="56" height="14" rx="7" fill="#e5e7eb" />
      <rect x="168" y="44" width="56" height="14" rx="7" fill="#e5e7eb" />

      {[0, 1, 2, 3].map((i) => {
        const checked = i < 2;
        return (
          <g key={i}>
            <motion.rect x="40" y={85 + i * 36} width="16" height="16" rx="4"
              fill={checked ? "#FB923C" : "#f3f4f6"}
              animate={checked ? { scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
            />
            {checked && (
              <motion.path d={`M44 ${93 + i * 36} L47 ${96 + i * 36} L53 ${90 + i * 36}`}
                stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: i * 0.3 }}
              />
            )}
            <motion.rect x="64" y={89 + i * 36} width={[140, 110, 155, 90][i]} height="8" rx="4"
              fill={checked ? "#d1d5db" : "#374151"} opacity={checked ? 0.5 : 0.9}
              animate={!checked ? { opacity: [0.6, 1, 0.6] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
            <rect x="220" y={87 + i * 36} width="36" height="12" rx="6"
              fill={["#fce7f3", "#ede9fe", "#d1fae5", "#fef3c7"][i]} />
            <rect x="264" y={89 + i * 36} width="44" height="8" rx="4" fill="#e5e7eb" />
          </g>
        );
      })}

      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -5] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
      >
        <rect x="40" y="220" width="240" height="16" rx="8" fill="#ede9fe" opacity="0.8" />
        <rect x="48" y="224" width="80" height="8" rx="4" fill="#DC2626" opacity="0.6" />
      </motion.g>
    </svg>
  );
}

function IllustrationCollaborate() {
  return (
    <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="24" y="20" width="292" height="220" rx="16" fill="white" />
      <rect x="24" y="20" width="76" height="220" rx="16" fill="#f5f3ff" />
      <rect x="84" y="20" width="4" height="220" fill="#ede9fe" />

      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx="52" cy={60 + i * 50} r="16" fill={["#EF4444", "#FB923C", "#c4b5fd"][i]} opacity="0.85" />
          <motion.circle cx="64" cy={48 + i * 50} r="5"
            fill={i === 0 ? "#22c55e" : i === 1 ? "#f59e0b" : "#d1d5db"}
            animate={{ scale: i < 2 ? [1, 1.4, 1] : 1, opacity: i < 2 ? [0.7, 1, 0.7] : 0.4 }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
          />
        </g>
      ))}

      <rect x="100" y="36" width="188" height="38" rx="12" fill="#ede9fe" />
      <rect x="110" y="46" width="120" height="8" rx="4" fill="#7c3aed" opacity="0.4" />
      <rect x="110" y="58" width="80" height="6" rx="3" fill="#a78bfa" opacity="0.3" />

      <rect x="100" y="84" width="168" height="32" rx="12" fill="#f3f4f6" />
      <rect x="110" y="92" width="100" height="8" rx="4" fill="#6b7280" opacity="0.5" />
      <rect x="110" y="104" width="60" height="6" rx="3" fill="#9ca3af" opacity="0.3" />

      <rect x="128" y="126" width="160" height="38" rx="12" fill="#EF4444" />
      <rect x="138" y="136" width="100" height="8" rx="4" fill="white" opacity="0.8" />
      <rect x="138" y="148" width="70" height="6" rx="3" fill="white" opacity="0.4" />

      <motion.g animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
        <rect x="100" y="176" width="70" height="26" rx="13" fill="#f3f4f6" />
        {[0, 1, 2].map((d) => (
          <motion.circle key={d} cx={113 + d * 12} cy={189} r="3.5" fill="#9ca3af"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }}
          />
        ))}
      </motion.g>

      <motion.g animate={{ scale: [1, 1.2, 1], y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>
        <circle cx="284" cy="38" r="13" fill="#ef4444" />
        <text x="284" y="43" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">3</text>
      </motion.g>

      <motion.g
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 3.3, ease: "easeOut" }}
      >
        <rect x="100" y="214" width="140" height="20" rx="10" fill="#f0fdf4" />
        <rect x="110" y="220" width="80" height="8" rx="4" fill="#22c55e" opacity="0.5" />
      </motion.g>
    </svg>
  );
}

function IllustrationTrackDeliver() {
  return (
    <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="trackGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
      </defs>
      <rect x="16" y="20" width="308" height="220" rx="16" fill="white" />

      {[0, 1, 2].map((col) => (
        <g key={col}>
          <rect x={28 + col * 100} y="40" width="86" height="170" rx="10"
            fill={["#f5f3ff", "#fdf2f8", "#f0fdf4"][col]} />
          <rect x={36 + col * 100} y="50" width="70" height="12" rx="6"
            fill={["#7c3aed", "#d946ef", "#22c55e"][col]} opacity="0.5" />
          {Array.from({ length: [3, 2, 1][col] }).map((_, card) => (
            <g key={card}>
              <rect x={36 + col * 100} y={74 + card * 46} width="70" height="36" rx="8" fill="white"
                style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.08))" }} />
              <rect x={42 + col * 100} y={80 + card * 46} width={[46, 38, 52][card % 3]} height="7" rx="3"
                fill="#374151" opacity="0.5" />
              <rect x={42 + col * 100} y={92 + card * 46} width={[30, 46, 28][card % 3]} height="5" rx="2"
                fill={["#7c3aed", "#d946ef", "#22c55e"][col]} opacity="0.35" />
            </g>
          ))}
        </g>
      ))}

      <motion.g
        animate={{ x: [0, 100, 100, 100], y: [0, -10, 0, 0], opacity: [1, 1, 1, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut", times: [0, 0.4, 0.7, 1] }}
      >
        <rect x="36" y="166" width="70" height="36" rx="8" fill="white" opacity="0.95"
          style={{ filter: "drop-shadow(0 6px 16px rgba(124,58,237,0.25))" }} />
        <rect x="42" y="172" width="46" height="7" rx="3" fill="#374151" opacity="0.5" />
        <rect x="42" y="184" width="30" height="5" rx="2" fill="#7c3aed" opacity="0.4" />
      </motion.g>

      <rect x="28" y="216" width="284" height="14" rx="7" fill="#e5e7eb" />
      <motion.rect x="28" y="216" height="14" rx="7" fill="url(#trackGrad)"
        animate={{ width: [80, 220, 80] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.text x="290" y="227" fill="#7c3aed" fontSize="9" fontWeight="700"
        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
        68%
      </motion.text>

      <motion.text x="318" y="48" fontSize="18"
        animate={{ x: [0, -270], y: [0, -20, 0, 20, 0], opacity: [0, 1, 1, 1, 0] }}
        transition={{ duration: 5, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
      >🚀</motion.text>
    </svg>
  );
}

// ─── Steps Data ────────────────────────────────────────────────────────────

const steps = [
  {
    id: 1, label: "Step 01", title: "Create Your Project",
    description: "Start by creating a dedicated workspace for your team. Generate a unique project code and invite members instantly.",
    highlights: ["Unique project code", "Instant team invites", "Role-based access"],
    Illustration: IllustrationCreateProject,
    color: "from-orange-50 to-rose-50",
  },
  {
    id: 2, label: "Step 02", title: "Organize Tasks",
    description: "Break down work into structured tasks with priorities, due dates, subtasks, and clear ownership.",
    highlights: ["Priority tagging", "Due date tracking", "Subtask nesting"],
    Illustration: IllustrationOrganizeTasks,
    color: "from-red-50 to-rose-50",
  },
  {
    id: 3, label: "Step 03", title: "Collaborate in Real Time",
    description: "Chat, update tasks, and receive notifications instantly with socket-powered real-time updates.",
    highlights: ["Live presence indicators", "Instant messaging", "Push notifications"],
    Illustration: IllustrationCollaborate,
    color: "from-orange-50 to-red-50",
  },
  {
    id: 4, label: "Step 04", title: "Track & Deliver",
    description: "Monitor progress visually and move tasks across stages to ensure smooth delivery.",
    highlights: ["Visual kanban board", "Progress analytics", "Delivery milestones"],
    Illustration: IllustrationTrackDeliver,
    color: "from-red-50 to-orangered-50",
  },
];

// ─── Zigzag SVG Path Node Bar ──────────────────────────────────────────────

const ZW = 560;
const ZH = 100;
// Zigzag: nodes alternate between y=20 (top) and y=80 (bottom)
const NODE_COORDS = [
  { x: 40,  y: 20 },
  { x: 190, y: 80 },
  { x: 370, y: 20 },
  { x: 520, y: 80 },
];

const ZIGZAG_PATH = NODE_COORDS.map((p, i) => (i === 0 ? `M${p.x} ${p.y}` : `L${p.x} ${p.y}`)).join(" ");

function ZigzagProgressBar({ activeStep, onStepClick }) {
  const pathRef = useRef(null);
  const [pathLen, setPathLen] = useState(600);

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

  const progress = activeStep === 0 ? 0 : activeStep / (steps.length - 1);
  const dashOffset = pathLen * (1 - progress);

  return (
    <div className="flex justify-center w-full overflow-x-auto pb-6">
      <div className="relative" style={{ minWidth: ZW, height: ZH + 40 }}>
        <svg width={ZW} height={ZH} viewBox={`0 0 ${ZW} ${ZH}`} fill="none" className="overflow-visible">
          <defs>
            <linearGradient id="zgGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#BE123C" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Gray base */}
          <path d={ZIGZAG_PATH} stroke="#e5e7eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

          {/* Animated progress overlay */}
          <motion.path
            ref={pathRef}
            d={ZIGZAG_PATH}
            stroke="url(#zgGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            strokeDasharray={pathLen}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            filter="url(#glow)"
          />

          {/* Nodes */}
          {NODE_COORDS.map((coord, index) => {
            const isCompleted = index < activeStep;
            const isActive = index === activeStep;
            return (
              <g key={index}>
                {/* Pulse ring for active */}
                {isActive && (
                  <motion.circle cx={coord.x} cy={coord.y} r="18" fill="#EA580C" opacity="0.15"
                    animate={{ r: [14, 22, 14], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                <motion.circle
                  cx={coord.x} cy={coord.y} r="12"
                  fill={isCompleted ? "#DC2626" : isActive ? "#BE123C" : "white"}
                  stroke={isActive || isCompleted ? "#DC2626" : "#BE123C"}
                  strokeWidth="2.5"
                  animate={{ scale: isActive ? [1, 1.1, 1] : 1 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  onClick={() => onStepClick(index)}
                  className="cursor-pointer"
                  style={{ filter: isActive ? "drop-shadow(0 0 6px rgba(124,58,237,0.6))" : "none" }}
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.9 }}
                />
                {isCompleted && (
                  <path
                    d={`M${coord.x - 4} ${coord.y} L${coord.x - 1} ${coord.y + 3} L${coord.x + 5} ${coord.y - 4}`}
                    stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                    style={{ pointerEvents: "none" }}
                  />
                )}
                {isActive && (
                  <circle cx={coord.x} cy={coord.y} r="4" fill="white" style={{ pointerEvents: "none" }} />
                )}
              </g>
            );
          })}
        </svg>

        {/* Labels positioned relative to each node */}
        {NODE_COORDS.map((coord, index) => {
          const above = coord.y < ZH / 2;
          return (
            <button
              key={index}
              onClick={() => onStepClick(index)}
              className="absolute cursor-pointer focus:outline-none"
              style={{
                left: coord.x,
                top: above ? coord.y + 20 : coord.y - 32,
                transform: "translateX(-50%)",
              }}
            >
              <span className={`text-xs font-semibold tracking-wide whitespace-nowrap
                ${index === activeStep ? "text-orange-600" : index < activeStep ? "text-orange-400" : "text-gray-400"}
              `}>
                {steps[index].label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}




// ─── Main Component ────────────────────────────────────────────────────────

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [timerProgress, setTimerProgress] = useState(0);
  const timerRef = useRef(null);
  const startRef = useRef(Date.now());

  const resetTimer = () => {
    startRef.current = Date.now();
    setTimerProgress(0);
  };

  useEffect(() => {
    if (paused) {
      clearInterval(timerRef.current);
      return;
    }
    resetTimer();
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const progress = Math.min(elapsed / AUTO_INTERVAL, 1);
      setTimerProgress(progress);
      if (elapsed >= AUTO_INTERVAL) {
        setActiveStep((prev) => (prev + 1) % steps.length);
        startRef.current = Date.now();
        setTimerProgress(0);
      }
    }, 50);
    return () => clearInterval(timerRef.current);
  }, [activeStep, paused]);

  const handleStepClick = (index) => {
    setActiveStep(index);
    resetTimer();
  };

  const step = steps[activeStep];
  const { Illustration } = step;

  return (
    <section id="how it works" className="py-24 bg-gradient-to-b from-rose-200 to-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.h2
          className="text-4xl font-bold text-center text-gray-900 mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          How CodeCrew Works
        </motion.h2>
        <p className="text-center text-gray-400 text-sm mb-14">
          Four steps. From idea to delivery — together.
        </p>

        <ZigzagProgressBar activeStep={activeStep} onStepClick={handleStepClick} />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -28 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="flex flex-col md:flex-row items-center gap-12 mt-4"
          >
            {/* Illustration */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div
                className="relative w-full max-w-sm cursor-pointer"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <motion.div
                  className={`rounded-3xl bg-gradient-to-br ${step.color} shadow-2xl p-6`}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Illustration />
                </motion.div>
                {/* <TimerRing progress={timerProgress} /> */}
                {paused && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-white-100">
                    <span className="text-xs text-blue-400 font-semibold bg-white bg-opacity-400 px-3 py-1 rounded-full">
                      Auto-play paused
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Text content */}
            <div className="w-full md:w-1/2 space-y-4">
              <motion.p className="text-sm uppercase tracking-wide text-orange-600 font-semibold"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                {step.label}
              </motion.p>
              <motion.h3 className="text-2xl font-semibold text-gray-900"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                {step.title}
              </motion.h3>
              <motion.p className="text-gray-600 leading-relaxed"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                {step.description}
              </motion.p>
              <motion.ul className="mt-4 space-y-2"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
                {step.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700 text-sm">
                    <span className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4 7L8 3" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </motion.ul>

              <motion.div className="flex flex-wrap gap-3 mt-8"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <button
                  onClick={() => { setActiveStep((p) => Math.max(0, p - 1)); resetTimer(); }}
                  disabled={activeStep === 0}
                  className="px-5 py-2 rounded-full border border-gray-300 text-gray-600 text-sm font-medium disabled:opacity-30 hover:border-orange-400 hover:text-orange-600 transition-colors cursor-pointer"
                >
                  Previous
                </button>
                <button
                  onClick={() => { setActiveStep((p) => (p + 1) % steps.length); resetTimer(); }}
                  className="px-5 py-2 rounded-full bg-orange-600 text-white text-sm font-medium hover:bg-orange-700 transition-colors cursor-pointer"
                >
                  {activeStep === steps.length - 1 ? "Restart" : "Next Step"}
                </button>
                <button
                  onClick={() => setPaused((p) => !p)}
                  className="px-5 py-2 rounded-full border border-violet-200 text-orange-600 text-sm font-medium hover:bg-violet-50 transition-colors cursor-pointer"
                >
                  {paused ? "▶ Resume" : "⏸ Pause"}
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}