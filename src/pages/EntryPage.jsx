import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import "./EntryPage.css";
import "./EntryPage.css";

const CLASS_COLORS = [
  "cls-violet", "cls-blue", "cls-emerald", "cls-gold", "cls-pink",
  "cls-cyan", "cls-orange", "cls-rose", "cls-indigo", "cls-teal",
];

const CLASS_ICONS = ["🌱", "🌿", "🌳", "🌟", "🔥", "⚡", "🎯", "🏆", "🚀", "🎓"];

const stats = [
  { value: "10", label: "Classes", icon: "🏫" },
  { value: "3", label: "Boards", icon: "📋" },
  { value: "100+", label: "PDF Notes", icon: "📄" },
  { value: "∞", label: "Learning", icon: "🚀" },
];

export default function EntryPage() {
  const navigate = useNavigate();

  return (
    <div className="page entry-page">
      <div className="bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>
      <Navbar />

      <main className="entry-main container">
        {/* Hero */}
        <motion.section
          className="hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="badge badge-purple" style={{ marginBottom: 24 }}>
            <span>⭐</span> Welcome Back, Student
          </div>
          <h1 className="hero-title">
            Your Gateway to
            <span className="gradient-text"> Quality Education</span>
          </h1>
          <p className="hero-subtitle">
            Access structured, board-specific PDF notes for every subject — from Class 1 to Class 10.
            Study smarter, score better.
          </p>
          <div className="hero-quote">
            <span className="quote-mark">"</span>
            Knowledge is the lamp that lights the path — use it well.
            <span className="quote-mark">"</span>
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section
          className="stats-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.08 }}
            >
              <span className="stat-icon">{s.icon}</span>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </motion.section>

        {/* Boards quick-info */}
        <motion.section
          className="boards-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="section-title">Supported Boards</h2>
          <div className="board-cards">
            {[
              { name: "CBSE", desc: "Central Board of Secondary Education", color: "blue", icon: "🇮🇳" },
              { name: "ICSE", desc: "Indian Certificate of Secondary Education", color: "purple", icon: "📘" },
              { name: "CHSE", desc: "Council of Higher Secondary Education (Odisha)", color: "gold", icon: "🌟" },
            ].map((b, i) => (
              <motion.div
                key={b.name}
                className={`board-info-card glass-card board-${b.color}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.1 }}
              >
                <div className="board-info-icon">{b.icon}</div>
                <div className="board-info-name">{b.name}</div>
                <div className="board-info-desc">{b.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Classes Explorer */}
        <motion.section
          className="explorer-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="section-header">
            <h2 className="section-title">Explore by Class</h2>
            <p className="section-subtitle">Select your class to browse board-specific notes</p>
          </div>
          
          <div className="classes-grid">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((cls, i) => (
              <motion.button
                key={cls}
                className={`class-card ${CLASS_COLORS[i]}`}
                onClick={() => navigate(`/class/${cls}`)}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.6 + (i * 0.05), duration: 0.4 }}
                whileHover={{ scale: 1.04, y: -6 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="class-icon">{CLASS_ICONS[i]}</div>
                <div className="class-number">Class {cls}</div>
                <div className="class-sub">3 Boards · PDF Notes</div>
                <div className="class-arrow">›</div>
              </motion.button>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
