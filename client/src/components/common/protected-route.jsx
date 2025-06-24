import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const ProtectedRoute = () => {
  const { user } = useAuthStore();
  const location = useLocation();

  if (user && location.pathname.includes("/auth/login")) {
    return <Navigate to="/" />;
  }

  if (user && location.pathname.includes("/auth/register")) {
    return <Navigate to="/" />;
  }

  return user ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
