import { Routes, Route } from "react-router-dom";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import NotFound from "../pages/errors/NotFound";
import AdminLayout from "../layouts/AdminLayout";
import Notification from "../pages/admin/Notification";
import BetweenTwoDates from "../pages/admin/BetweenTwoDates";

export default function AdminRoutes() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<DashboardAdmin />} />
        <Route path="/dashboard" element={<DashboardAdmin />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/between-two-dates" element={<BetweenTwoDates />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AdminLayout>
  );
}
