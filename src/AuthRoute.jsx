import { useAuth } from "./AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthRoute = () => {
  const { user } = useAuth();
  const location = useLocation();


  debugger

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={"/signin"} replace state={{ path: location.pathname }} />
  );
};

export default AuthRoute;