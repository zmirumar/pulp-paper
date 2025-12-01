import { routes } from "../constants/routes";
import Users from "@/pages/users";
import Auth from "@/pages/auth";


export const publicRoutes = [
    {
        path: routes.AUTH,
        element: Auth ,
    },
];

export const privateRoutes = [
  {
    path: routes.USERS,
    element: Users,
  },
];
