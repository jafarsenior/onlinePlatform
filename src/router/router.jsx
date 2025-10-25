import { createBrowserRouter } from "react-router-dom";

// Importing Pages and Components
import App from "../App";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import About from "../pages/About";

export const router = createBrowserRouter([
  //Landing Pages
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  //Home Pages with Navbar
  {
    path: "/home",
    element: <App />, // App ichida Navbar va ichki sahifalar
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);
