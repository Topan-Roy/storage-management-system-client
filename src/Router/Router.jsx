import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "../Layout/RootLayout";
import Home from "../Page/Home/Home";
import Onboarding from "../Authentication/Onboarding/Onboarding";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
            path:"onboarding",
            Component:Onboarding
            },

        ]
    }
]);