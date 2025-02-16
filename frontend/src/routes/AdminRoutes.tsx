import { Routes, Route } from "react-router-dom";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import NotFound from "../pages/errors/NotFound";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardAdmin />} />
      <Route path="/dashboard" element={<DashboardAdmin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
