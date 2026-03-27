import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import "./BoardsPage.css";

const BOARDS = [
  {
    id: "CBSE",
    label: "CBSE",
    full: "Central Board of Secondary Education",
    icon: "🇮🇳",
    desc: "National-level board followed across India. Focuses on analytical understanding and application of concepts.",
    color: "blue",
  },
  {
    id: "ICSE",
    label: "ICSE",
    full: "Indian Certificate of Secondary Education",
    icon: "📘",
    desc: "Provides comprehensive and balanced education with emphasis on English language and practical skills.",
    color: "purple",
  },
  {
    id: "CHSE",
    label: "CHSE",
    full: "Council of Higher Secondary Education",
    icon: "🌟",
    desc: "Odisha state board offering an excellent curriculum aligned with higher secondary standards.",
    color: "gold",
  },
];

export default function BoardsPage() {
  const { classId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="page boards-page">
      <div className="bg-orbs">
        <div className="orb orb-1" /><div className="orb orb-2" />
      </div>
      <Navbar
        breadcrumbs={[
          { label: "Classes", to: "/" },
          { label: `Class ${classId}` },
        ]}
      />

      <main className="boards-main container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="class-badge">Class {classId}</div>
          <h1>Select Your Board</h1>
          <p>Choose your education board to access subject-specific PDF notes</p>
        </motion.div>

        <div className="boards-grid">
          {BOARDS.map((board, i) => (
            <motion.button
              key={board.id}
              className={`board-card board-card-${board.color}`}
              onClick={() => navigate(`/class/${classId}/board/${board.id}`)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ scale: 1.02, y: -6 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="board-card-top">
                <div className="board-emoji">{board.icon}</div>
                <div className={`board-glow-badge ${board.color}`}>{board.label}</div>
              </div>
              <div className="board-full-name">{board.full}</div>
              <p className="board-desc">{board.desc}</p>
              <div className="board-go">
                View Notes
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );
}
