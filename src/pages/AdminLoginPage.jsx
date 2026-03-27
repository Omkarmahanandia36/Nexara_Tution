import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import "./AdminLoginPage.css";

export default function AdminLoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!id.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const success = adminLogin(id.trim(), password);
    if (success) {
      navigate("/admin");
    } else {
      setError("Invalid Admin ID or Password.");
    }
    setLoading(false);
  };

  return (
    <div className="admin-login-page">
      <div className="al-bg-orbs">
        <div className="al-orb al-orb-1" />
        <div className="al-orb al-orb-2" />
        <div className="al-orb al-orb-3" />
      </div>

      <div className="al-grid">
        {/* Left branding */}
        <motion.div
          className="al-brand"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="al-brand-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <h1 className="al-brand-title">Admin Panel</h1>
          <p className="al-brand-tagline">NEXT-GEN SCHOLARS — Content Management</p>

          <div className="al-brand-features">
            {[
              { icon: "📁", label: "Upload PDFs per Board & Class" },
              { icon: "🎓", label: "Manage CBSE · ICSE · CHSE" },
              { icon: "✏️", label: "Edit Notes Per Subject" },
              { icon: "💾", label: "Changes saved instantly" },
            ].map((f) => (
              <div key={f.label} className="al-brand-feature">
                <span className="al-feature-icon">{f.icon}</span>
                <span>{f.label}</span>
              </div>
            ))}
          </div>

          <div className="al-deco">
            <div className="al-deco-card">
              <div className="al-deco-icon">🛡️</div>
              <div className="al-deco-text">Secure Admin Access</div>
            </div>
          </div>
        </motion.div>

        {/* Right form */}
        <motion.div
          className="al-form-panel"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="al-form-card">
            <div className="al-form-header">
              <div className="al-form-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h2>Admin Login</h2>
              <p>Access restricted to administrators only</p>
            </div>

            <form onSubmit={handleSubmit} className="al-form-body">
              <div className="al-form-field">
                <label htmlFor="adminId">Admin ID</label>
                <div className="al-input-wrapper">
                  <svg className="al-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input
                    id="adminId"
                    type="text"
                    placeholder="Enter admin ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="al-form-field">
                <label htmlFor="adminPass">Password</label>
                <div className="al-input-wrapper">
                  <svg className="al-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    id="adminPass"
                    type={showPass ? "text" : "password"}
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <button type="button" className="al-toggle-pass" onClick={() => setShowPass((s) => !s)}>
                    {showPass ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  className="al-error-box"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </motion.div>
              )}

              <button type="submit" className="al-submit-btn" disabled={loading}>
                {loading ? (
                  <span className="al-spinner" />
                ) : (
                  <>
                    Sign In as Admin
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className="al-back-link">
              <Link to="/login">← Back to Student Login</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
