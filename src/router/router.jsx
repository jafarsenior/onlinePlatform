import { createBrowserRouter } from "react-router-dom";

// Pages
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";              // ✅ bu Layout
import DashboardHome from "../pages/Dashboard/DashboardHome";
import Planner from "../pages/Dashboard/Planner";
import Health from "../pages/Dashboard/Health";
import Finance from "../pages/Dashboard/Finance";
import Assistent from "../pages/Dashboard/Assistent";
import Profile from "../pages/Account/Profile";
import Settings from "../pages/Account/Settings";

// Layouts
import AuthLayout from "../layouts/AuthLayout";

export const router = createBrowserRouter([
  // Landing sahifasi
  {
    path: "/",
    element: <Landing />,
  },

  // Auth sahifalari
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  // Dashboard layout va ichki sahifalar
  {
    path: "/dashboard",
    element: <Dashboard />, // ✅ bu layout sifatida ishlaydi (Navbar + Sidebar + Outlet)
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "planner", element: <Planner /> },
      { path: "health", element: <Health /> },
      { path: "finance", element: <Finance /> },
      { path: "aiassistent", element: <Assistent /> },
        // Account sahifalari
      { path: "profile", element: <Profile /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);
