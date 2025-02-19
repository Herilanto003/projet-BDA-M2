import React from "react";
import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { MdDashboard } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
// import { IoNotifications } from "react-icons/io5";
import { FaCalendarDays } from "react-icons/fa6";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    // window.location.reload();
  };

  return (
    <div>
      <header className="w-full h-14 bg-slate-800 px-14 flex items-center justify-between sticky top-0 z-10">
        <nav className="w-full h-full flex items-center justify-start px-4">
          <ul className="flex items-center space-x-10 justify-center font-semibold text-white">
            <li>
              <Link to={"/"} className="flex items-center space-x-2">
                <GoHomeFill /> <span>Accueil</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/dashboard"}
                className="flex items-center space-x-2"
              >
                <MdDashboard />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/between-two-dates"}
                className="flex items-center space-x-2"
              >
                <FaCalendarDays />
                <span>Entre deux dates</span>
              </Link>
            </li>
            {/* <li>
              <Link
                to={"/admin/notification"}
                className="flex items-center space-x-2"
              >
                <IoNotifications />
                <span>Notifications</span>
                <span className="font-semibold text-sm rounded-full bg-blue-500 text-white p-1">
                  15
                </span>
              </Link>
            </li> */}
          </ul>
        </nav>

        <div className="flex justify-start items-center space-x-4 grow text-white text-xs text-center">
          <div className="text-2xl">
            <FaUser />
          </div>
          <div>
            <h2>
              {user.email} ({user.name})
            </h2>
          </div>
          <p className="bg-orange-500 text-lg px-3 rounded-xl font-semibold">
            Administrateur
          </p>

          <button
            className="flex items-center space-x-2"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Déconnexion</span>
          </button>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
