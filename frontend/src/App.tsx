import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import UsersRoutes from "./routes/UsersRoutes";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import NotFound from "./pages/errors/NotFound";
import ProtectedRouteAdmin from "./routes/ProtectedRouteAdmin";
import ProtectedRouteUser from "./routes/ProtectedRouteUser";
import ProtectedRouteAuth from "./routes/ProtectedRouteAuth";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Route pour la page d'accueil */}
        <Route path="/" element={<Home />} />

        {/* Route pour la page de login */}
        <Route
          path="/login"
          element={
            <ProtectedRouteAuth>
              <Login />
            </ProtectedRouteAuth>
          }
        />

        {/* Route pour la page de l'inscription */}
        <Route
          path="/register"
          element={
            <ProtectedRouteAuth>
              <Register />
            </ProtectedRouteAuth>
          }
        />

        {/* Route pour l'espace admin */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRouteAdmin>
              <AdminRoutes />
            </ProtectedRouteAdmin>
          }
        />

        {/* Route pour l'espace utilisateur simple */}
        <Route
          path="/user/*"
          element={
            <ProtectedRouteUser>
              <UsersRoutes />
            </ProtectedRouteUser>
          }
        />

        {/* Route pour les pages non trouvées */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
