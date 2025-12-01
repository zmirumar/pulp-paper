import Home from "@/pages/home";
import { routes } from "../constants/routes";
import Users from "@/pages/users";

import Auth from "@/pages/auth";

import MaterialDetailsPage from "@/pages/materials/[id]";

import Materials from "@/pages/materials";

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
  {
    path: routes.MATERIALSPAGE,
    element: Materials,
  },
  {
    path: routes.MATERIALSPAGEID,
    element: MaterialDetailsPage,
  },
];
