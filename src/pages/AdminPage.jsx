import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNotes } from "../context/NotesContext";
import baseNotes from "../data/notes";
import "./AdminPage.css";

const BOARDS = ["CBSE", "ICSE", "CHSE"];
const CLASSES = Array.from({ length: 10 }, (_, i) => i + 1);

const BOARD_COLORS = {
  CBSE: { accent: "#60a5fa", glow: "rgba(96,165,250,0.18)", border: "rgba(96,165,250,0.3)" },
  ICSE: { accent: "#a78bfa", glow: "rgba(167,139,250,0.18)", border: "rgba(167,139,250,0.3)" },
  CHSE: { accent: "#fbbf24", glow: "rgba(251,191,36,0.18)", border: "rgba(251,191,36,0.3)" },
};

function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <motion.div
      className="admin-toast"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      {message}
    </motion.div>
  );
}

function SubjectRow({ note, classId, board }) {
  const { updateNote, clearNote, overrides } = useNotes();
  const [editing, setEditing] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [toast, setToast] = useState(null);

  const key = `class${classId}`;
  const hasOverride = !!overrides?.[key]?.[board]?.[note.id];
  const currentUrl = overrides?.[key]?.[board]?.[note.id] ?? note.url;

  const startEdit = () => {
    setInputVal(currentUrl === note.url && !hasOverride ? "" : currentUrl);
    setEditing(true);
  };

  const save = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;
    updateNote(classId, board, note.id, trimmed);
    setEditing(false);
    setToast(`PDF for "${note.title}" updated!`);
  };

  const clear = () => {
    clearNote(classId, board, note.id);
    setEditing(false);
    setToast(`"${note.title}" reset to default.`);
  };

  return (
    <div className={`admin-subject-row ${editing ? "editing" : ""}`}>
      <div className="asr-left">
        <div className="asr-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
        <div className="asr-info">
          <span className="asr-title">{note.title}</span>
          <span className={`asr-url ${hasOverride ? "has-override" : ""}`}>
            {hasOverride ? "✓ Custom PDF set" : "Using default placeholder"}
          </span>
        </div>
      </div>

      <div className="asr-actions">
        {!editing ? (
          <>
            <button className="asr-btn edit-btn" onClick={startEdit}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              {hasOverride ? "Edit" : "Set PDF"}
            </button>
            {hasOverride && (
              <button className="asr-btn clear-btn" onClick={clear}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14H6L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4h6v2" />
                </svg>
                Clear
              </button>
            )}
          </>
        ) : (
          <div className="asr-edit-inline">
            <input
              type="url"
              className="asr-url-input"
              placeholder="Paste PDF URL here (Google Drive, direct link…)"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              autoFocus
              onKeyDown={(e) => { if (e.key === "Enter") save(); if (e.key === "Escape") setEditing(false); }}
            />
            <div className="asr-edit-btns">
              <button className="asr-btn save-btn" onClick={save} disabled={!inputVal.trim()}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Save
              </button>
              <button className="asr-btn cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
              {hasOverride && (
                <button className="asr-btn clear-btn" onClick={clear}>Clear</button>
              )}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {toast && <Toast message={toast} onDone={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}

export default function AdminPage() {
  const { adminLogout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [selectedBoard, setSelectedBoard] = useState("CBSE");
  const [selectedClass, setSelectedClass] = useState(1);

  const key = `class${selectedClass}`;
  const subjects = baseNotes?.[key]?.[selectedBoard] ?? [];
  const colors = BOARD_COLORS[selectedBoard];

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login");
  };

  return (
    <div className="admin-page">
      <div className="admin-bg-orbs">
        <div className="admin-orb admin-orb-1" />
        <div className="admin-orb admin-orb-2" />
      </div>

      {/* Top navbar */}
      <header className="admin-header">
        <div className="admin-header-left">
          <div className="admin-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <div className="admin-header-title">Sovan Tuition</div>
            <div className="admin-header-sub">Admin Panel — PDF Manager</div>
          </div>
        </div>
        <button className="admin-logout-btn" onClick={handleLogout}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Log Out
        </button>
      </header>

      <div className="admin-body">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          {/* Board selector */}
          <div className="sidebar-section">
            <div className="sidebar-label">Board</div>
            {BOARDS.map((b) => {
              const bc = BOARD_COLORS[b];
              return (
                <button
                  key={b}
                  className={`sidebar-item board-item ${selectedBoard === b ? "active" : ""}`}
                  style={selectedBoard === b ? { color: bc.accent, background: bc.glow, borderColor: bc.border } : {}}
                  onClick={() => setSelectedBoard(b)}
                >
                  <span className="si-dot" style={{ background: bc.accent }} />
                  {b}
                </button>
              );
            })}
          </div>

          {/* Class selector */}
          <div className="sidebar-section">
            <div className="sidebar-label">Class</div>
            <div className="class-grid">
              {CLASSES.map((c) => (
                <button
                  key={c}
                  className={`class-btn ${selectedClass === c ? "active" : ""}`}
                  style={selectedClass === c ? { borderColor: colors.accent, color: colors.accent, background: colors.glow } : {}}
                  onClick={() => setSelectedClass(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="admin-main">
          <motion.div
            key={`${selectedBoard}-${selectedClass}`}
            className="admin-section-header"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="section-breadcrumb">
              <span className="board-badge" style={{ color: colors.accent, background: colors.glow, border: `1px solid ${colors.border}` }}>
                {selectedBoard}
              </span>
              <span className="section-arrow">›</span>
              <span className="section-class">Class {selectedClass}</span>
            </div>
            <h2>Manage PDFs</h2>
            <p>{subjects.length} subjects — click <strong>Set PDF</strong> to paste a URL, or <strong>Clear</strong> to revert to default.</p>
          </motion.div>

          <div className="admin-subjects-list">
            {subjects.length === 0 ? (
              <div className="admin-empty">No subjects found for this combination.</div>
            ) : (
              subjects.map((note, i) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <SubjectRow note={note} classId={selectedClass} board={selectedBoard} />
                </motion.div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
