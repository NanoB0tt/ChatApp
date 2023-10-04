import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "@context/index";

export function RequireAuth() {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.email ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
}
