import { useRoutes } from "react-router-dom";

import { Item, Inventory, Home, Dashboard, UserProfile } from '../pages/pages';

const routes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: "dashboard",
        element: <Dashboard />
    },
    {
        path: "inventory",
        element: <Inventory />
    },
    {
        path: "inventory/:itemId",
        element: <Item />
    },
    {
        path: "profile",
        element: <UserProfile />
    }
];

export default function Router(){
    return useRoutes(routes);
}