import Home from "@/pages/home";
import { routes } from "../constants/routes";
import Users from "@/pages/users";
import Sort from "@/pages/sort";
import Auth from "@/pages/auth";

import MaterialDetailsPage from "@/pages/materials/[id]";
import Materials from "@/pages/materials";
import MaterialsDetailCreate from "@/features/materials/components/MaterialsDetailCreate";
import MaterialsDetailEdit from "@/features/materials/components/MaterialsDetailEdit";

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
  {
    path: routes.MATERIALSDETAILCREATE,
    element: MaterialsDetailCreate,
  },
  {
    path: routes.MATERIALSDETAILEDIT,
    element: MaterialsDetailEdit,
  },

  {
    path: routes.HOME,
    element: Home,
  },
  {
    path: routes.USERS,
    element: Users,
  },
  {
    path: routes.SORT,
    element: Sort,
  },
];
