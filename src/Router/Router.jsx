import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "../Layout/RootLayout";
import Home from "../Page/Home/Home";
import Onboarding from "../Authentication/Onboarding/Onboarding";
import Login from "../Authentication/Login/Login";
import Signup from "../Authentication/Signup/Signup";
import ForgotPassword from "../Authentication/ForgotPassword/ForgotPassword";
import VerifyCode from "../Authentication/VerifyCode/VerifyCode";
import ResetPassword from "../Authentication/ResetPassword/ResetPassword";

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
            {
            path:"login",
            Component:Login
            },
            {
            path:"signup",
            Component:Signup
            },
            {
            path:"forgotpassword",
            Component:ForgotPassword
            },
            {
            path:"verifycode",
            Component:VerifyCode
            },
            {
            path:"resetpassword",
            Component:ResetPassword
            },

        ]
    }
]);