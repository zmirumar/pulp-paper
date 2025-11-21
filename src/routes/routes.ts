import Home from "@/pages/home";
import { routes } from "../constants/routes";
import Users from "@/pages/users";
import { MaterialsPage } from "@/features/Materiles";

export const publicRoutes = [
  {
    path: routes.AUTH,
    element: "auth",
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
    element: MaterialsPage,
  },
];
