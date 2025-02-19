import { Routes, Route } from "react-router-dom";
import Factures from "../pages/user/Factures";
import NotFound from "../pages/errors/NotFound";
import UserLayout from "../layouts/UserLayout";

export default function UsersRoutes() {
  return (
    <UserLayout>
      <Routes>
        <Route path="/" element={<Factures />} />
        <Route path="/factures" element={<Factures />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserLayout>
  );
}
