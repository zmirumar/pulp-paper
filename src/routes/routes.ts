import Home from "@/pages/home";
import { routes } from "../constants/routes";
import Users from "@/pages/users";
import Sort from "@/pages/sort";
import Auth from "@/pages/auth";
import ForgotPasswordPage from "@/pages/auth/forgot-password";
import VerifyPhonePage from "@/pages/auth/verify-phone";

export const publicRoutes = [
    {
        path: routes.AUTH,
        element: Auth ,
    },
    {
        path: routes.VERIFYPHONE,
        element: VerifyPhonePage,
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
        {
        path: routes.SORT,
        element: Sort,
    },
];
