import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import FallbackLoading from "./layout/FallBackLoading.jsx";
import NavbarFooter from "./layout/NavbarFooter.jsx";
import RootLayout from "./layout/RootLayout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CreateEmployee from "./pages/employee/CreateEmployee.jsx";
import EditEmployee from "./pages/employee/EditEmployee.jsx";
import EmployeeDetail from "./pages/employee/EmployeeDetail.jsx";
import Employees from "./pages/employee/Employees.jsx";
import OnlyPublicRoutes from "./router/OnlyPublicRoutes.jsx";
import PrivateRoutes from "./router/PrivateRoute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<NavbarFooter />}>
        <Route index element={<Home />} />
      </Route>

      <Route
        path="/user"
        element={
          <Suspense fallback={<FallbackLoading />}>
            <OnlyPublicRoutes fallbackUrl="/" />
          </Suspense>
        }
      >
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="/employee" element={<NavbarFooter />}>
        <Route
          path="/employee"
          element={
            <Suspense fallback={<FallbackLoading />}>
              <PrivateRoutes fallbackUrl="/user/login" />
            </Suspense>
          }
        >
          <Route path="create" element={<CreateEmployee />} />
          <Route index element={<Employees />} />
          <Route path="edit/:id" element={<EditEmployee />} />
          <Route path="view/:id" element={<EmployeeDetail />} />
        </Route>
      </Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
