import { Navigate, Outlet, useLocation } from "react-router-dom";
import { suspend } from "suspend-react";
import useAuthStore from "../store/authStore";
import { useAuth } from "../context/AuthContext";

const OnlyPublicRoutes = ({ fallbackUrl }) => {
  const { user } = useAuthStore();
  const location = useLocation();
  const { fetchUserPromise } = useAuth();

  async function fup() {
    return fetchUserPromise();
  }

  suspend(fup, ["intial-user-load-only-public-routes"]);

  console.log({ user });

  return user && user._id ? (
    <Navigate to={location?.state?.from ?? fallbackUrl} />
  ) : (
    <Outlet />
  );
};

export default OnlyPublicRoutes;
