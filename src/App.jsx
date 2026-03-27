import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NotesProvider } from "./context/NotesContext";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import EntryPage from "./pages/EntryPage";
import BoardsPage from "./pages/BoardsPage";
import NotesPage from "./pages/NotesPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminPage from "./pages/AdminPage";
import WelcomePage from "./pages/WelcomePage";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/welcome" replace />;
}

function AdminRoute({ children }) {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <Navigate to="/welcome" replace />;
}

function AppRoutes() {
  const { isAuthenticated, isAdmin } = useAuth();
  return (
    <Routes>
      {/* Student routes */}
      <Route
        path="/welcome"
        element={
          isAdmin ? <Navigate to="/admin" replace /> :
          isAuthenticated ? <Navigate to="/" replace /> :
          <WelcomePage />
        }
      />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route path="/" element={<ProtectedRoute><EntryPage /></ProtectedRoute>} />
      <Route path="/class/:classId" element={<ProtectedRoute><BoardsPage /></ProtectedRoute>} />
      <Route
        path="/class/:classId/board/:board"
        element={<ProtectedRoute><NotesPage /></ProtectedRoute>}
      />

      {/* Admin routes */}
      <Route
        path="/admin/login"
        element={isAdmin ? <Navigate to="/admin" replace /> : <AdminLoginPage />}
      />
      <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NotesProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </NotesProvider>
    </AuthProvider>
  );
}
