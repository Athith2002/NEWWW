import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";

const RootLayout = () => {
  const queryClient = new QueryClient({});

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <AuthContextProvider>
        <Outlet />
        <div
          id="global-modal-container"
          className="relative z-[9999999999999999]"
        ></div>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
