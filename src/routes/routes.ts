import Home from "@/pages/home";
import { routes } from "../constants/routes";
import Users from "@/pages/users";
import Auth from "@/pages/auth";
import ForgotPasswordPage from "@/pages/auth/forgot-password";



export const publicRoutes = [
    {
        path: routes.AUTH,
        element: Auth ,
    },
    {
        path: routes.PASSWORD,
        element: ForgotPasswordPage,
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
];
