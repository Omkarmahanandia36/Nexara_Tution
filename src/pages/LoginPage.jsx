import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!id.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800)); // simulate network
    const success = login(id.trim(), password);
    if (success) {
      navigate("/");
    } else {
      setError("Invalid Student ID or Password. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      {/* Background orbs */}
      <div className="bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="login-grid">
        {/* Left panel – branding */}
        <motion.div
          className="login-brand"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="brand-logo">ST</div>
          <h1 className="brand-title">Sovan Tuition</h1>
          <p className="brand-tagline">Empowering students with quality education from Class 1 to Class 10</p>

          <div className="brand-features">
            {[
              { icon: "📚", label: "Structured Notes by Board" },
              { icon: "🎓", label: "CBSE · ICSE · CHSE Covered" },
              { icon: "📄", label: "PDF Notes Anytime, Anywhere" },
              { icon: "✨", label: "Class 1 to Class 10" },
            ].map((f) => (
              <div key={f.label} className="brand-feature">
                <span className="feature-icon">{f.icon}</span>
                <span>{f.label}</span>
              </div>
            ))}
          </div>

          {/* Floating card decoration */}
          <div className="brand-deco">
            <div className="deco-card">
              <div className="deco-circle" />
              <div className="deco-line" />
              <div className="deco-line short" />
            </div>
          </div>
        </motion.div>

        {/* Right panel – form */}
        <motion.div
          className="login-form-panel"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <div className="form-card">
            <div className="form-header">
              <div className="form-logo">ST</div>
              <h2>Student Login</h2>
              <p>Enter your credentials to access your notes</p>
            </div>

            <form onSubmit={handleSubmit} className="form-body">
              <div className="form-field">
                <label htmlFor="studentId">Student ID</label>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <input
                    id="studentId"
                    type="text"
                    placeholder="Enter your student ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="toggle-pass"
                    onClick={() => setShowPass((s) => !s)}
                  >
                    {showPass ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  className="error-box"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {error}
                </motion.div>
              )}

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <span className="spinner" />
                ) : (
                  <>
                    Sign In
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className="form-hint">
              <span className="hint-badge">Demo credentials</span>
              <span>ID: <strong>student</strong> · Password: <strong>sovan123</strong></span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
