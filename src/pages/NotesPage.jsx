import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import PDFViewer from "../components/PDFViewer";
import { useNotes } from "../context/NotesContext";
import "./NotesPage.css";

const BOARD_COLORS = {
  CBSE: { text: "#60a5fa", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.25)" },
  ICSE: { text: "#a78bfa", bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.25)" },
  CHSE: { text: "#fbbf24", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)" },
};

export default function NotesPage() {
  const { classId, board } = useParams();
  const [activePDF, setActivePDF] = useState(null);
  const { getNotes } = useNotes();

  const notes = getNotes(classId, board);
  const colors = BOARD_COLORS[board] ?? BOARD_COLORS.CBSE;

  return (
    <div className="page notes-page">
      <div className="bg-orbs">
        <div className="orb orb-1" /><div className="orb orb-2" />
      </div>
      <Navbar
        breadcrumbs={[
          { label: "Classes", to: "/" },
          { label: `Class ${classId}`, to: `/class/${classId}` },
          { label: board },
        ]}
      />

      <main className="notes-main container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div
            className="board-pill"
            style={{ color: colors.text, background: colors.bg, border: `1px solid ${colors.border}` }}
          >
            {board} Board
          </div>
          <h1>Class {classId} — {board} Notes</h1>
          <p>{notes.length} subjects available for download & viewing</p>
        </motion.div>

        {notes.length === 0 ? (
          <div className="empty-state">
            <span>📭</span>
            <p>No notes uploaded yet for this combination. Check back soon!</p>
          </div>
        ) : (
          <div className="notes-grid">
            {notes.map((note, i) => (
              <motion.div
                key={note.id}
                className={`note-card glass-card ${!note.url ? "coming-soon-card" : ""}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => note.url && setActivePDF(note)}
              >
                <div className="note-card-top">
                  <div className="note-pdf-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10 9 9 9 8 9"/>
                    </svg>
                  </div>
                  <span className="pdf-badge">PDF</span>
                </div>

                <div className="note-title">{note.title}</div>
                <div className="note-desc">{note.description}</div>

                <div className="note-meta">
                  <span>📄 {note.pages} pages</span>
                  <span>📅 {note.updatedOn}</span>
                </div>

                <div className={`note-open-btn ${!note.url ? "disabled-btn" : ""}`}>
                  {note.url ? (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                      View Notes
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: '13px' }}>⏳</span>
                      Coming Soon
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <AnimatePresence>
        {activePDF && (
          <PDFViewer note={activePDF} onClose={() => setActivePDF(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
