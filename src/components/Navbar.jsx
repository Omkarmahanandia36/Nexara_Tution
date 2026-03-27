import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar({ breadcrumbs = [] }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">NGS</div>
          <div>
            <div className="navbar-logo-title">NEXT-GEN SCHOLARS</div>
            <div className="navbar-logo-sub">Learning Portal</div>
          </div>
        </Link>

        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="navbar-breadcrumb">
            <Link to="/" className="bc-item bc-home">Home</Link>
            {breadcrumbs.map((bc, i) => (
              <span key={i} className="bc-group">
                <span className="bc-sep">›</span>
                {bc.to ? (
                  <Link to={bc.to} className="bc-item">{bc.label}</Link>
                ) : (
                  <span className="bc-item bc-current">{bc.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Actions */}
        <div className="navbar-actions">
          <div className="user-avatar">
            <span>S</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
