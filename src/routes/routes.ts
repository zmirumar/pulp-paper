import Home from "@/pages/home";
import { routes } from "../constants/routes";
import Users from "@/pages/users";
import Auth from "@/pages/auth";

// temperory imrots
import Sections from "@/pages/tempRefPage/sections";
import MaterialTypes from "@/pages/tempRefPage/meterialTypes";

export const publicRoutes = [
  {
    path: routes.AUTH,
    element: Auth,
  },
];

export const privateRoutes = [
  {
    path: routes.HOME,
    element: Home,
  },
  {
    path: routes.USERS,
    element: Users,
  },

  // temperory
  {
    path: routes.REFS_SECTIONS,
    element: Sections,
  },
  {
    path: routes.REFS_MATERIALTYPES,
    element: MaterialTypes,
  },
];
