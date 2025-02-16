import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import React from "react";

export default function ProtectedRouteAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" />;
  } else if (!user.isAdmin) {
    return <Navigate to="/user" />;
  } else {
    return <>{children}</>;
  }
}
