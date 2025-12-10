import Home from "@/pages/home";
import { routes } from "../constants/routes";
import Users from "@/pages/users";
import Sort from "@/pages/sort";
import Auth from "@/pages/auth";
import Clients from "@/features/clients/components/ClientsPage";

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
        path: routes.SORT,
        element: Sort,
    },
    {
      path: routes.CLINENTS,
      element: Clients,
    },
];
