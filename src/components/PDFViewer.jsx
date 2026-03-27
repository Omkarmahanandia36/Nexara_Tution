import { motion } from "framer-motion";
import "./PDFViewer.css";

export default function PDFViewer({ note, onClose }) {
  return (
    <motion.div
      className="pdf-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="pdf-modal"
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Header */}
        <div className="pdf-modal-header">
          <div className="pdf-modal-title">
            <div className="pdf-title-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <div>
              <div className="pdf-name">{note.title}</div>
              <div className="pdf-meta-small">{note.pages} pages · Updated {note.updatedOn}</div>
            </div>
          </div>

          <div className="pdf-header-actions">
            <a
              href={note.url}
              target="_blank"
              rel="noreferrer"
              className="pdf-download-btn"
              download
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download
            </a>
            <button className="pdf-close-btn" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* PDF iframe */}
        <div className="pdf-body">
          <iframe
            src={`${note.url}#toolbar=1`}
            title={note.title}
            className="pdf-frame"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
