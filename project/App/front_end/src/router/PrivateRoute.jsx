import { Navigate, Outlet, useLocation } from "react-router-dom";
import { suspend } from "suspend-react";
import useAuthStore from "../store/authStore";
import { useAuth } from "../context/AuthContext";

const PrivateRoutes = ({ fallbackUrl }) => {
  const { user } = useAuthStore();
  const { pathname } = useLocation();
  const location = useLocation();
  const { fetchUserPromise } = useAuth();

  async function fup() {
    return fetchUserPromise();
  }

  suspend(fup, ["intial-user-load-pivate-routes"]);

  return user && user._id ? (
    <Outlet />
  ) : (
    <Navigate
      to={location?.state?.from ?? fallbackUrl}
      state={{
        from: pathname,
      }}
    />
  );
};

export default PrivateRoutes;
