import { routes } from "../constants/routes";


export const publicRoutes = [
    {
        path: routes.AUTH,
        element: 'auth',
    },
];

export const privateRoutes = [
    {
        path: routes.HOME,
        element: 'home',
    },
];
