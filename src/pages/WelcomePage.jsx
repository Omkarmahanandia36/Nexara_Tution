import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./WelcomePage.css";

export default function WelcomePage() {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      <div className="welcome-bg">
        <div className="w-orb w-orb-1" />
        <div className="w-orb w-orb-2" />
      </div>

      <div className="welcome-content">
        <AnimatePresence mode="wait">
          {!showOptions ? (
            <motion.div
              key="quote-section"
              className="quote-section"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              transition={{ duration: 0.6 }}
            >
              <div className="quote-icon">“</div>
              <blockquote className="welcome-quote">
                Education is the passport to the future, for tomorrow belongs to those who prepare for it today.
              </blockquote>
              <cite className="welcome-author">— Malcolm X</cite>
              
              <button 
                className="get-started-btn"
                onClick={() => setShowOptions(true)}
              >
                Get Started
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="options-section"
              className="options-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Choose your role</h2>
              <p>Select how you want to log in to NEXT-GEN SCHOLARS</p>
              
              <div className="role-cards">
                <div 
                  className="role-card student-card"
                  onClick={() => navigate("/login")}
                >
                  <div className="role-icon">🧑‍🎓</div>
                  <h3>Student Login</h3>
                  <p>Access your PDF notes and study materials</p>
                </div>
                
                <div 
                  className="role-card admin-card"
                  onClick={() => navigate("/admin/login")}
                >
                  <div className="role-icon">👨‍🏫</div>
                  <h3>Admin Login</h3>
                  <p>Manage content, add notes and update materials</p>
                </div>
              </div>

              <button 
                className="back-btn"
                onClick={() => setShowOptions(false)}
              >
                ← Back
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
