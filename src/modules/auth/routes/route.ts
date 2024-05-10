import { Login } from "./login";
import { Register } from "./register";

export const authRoutes = [
    {
      key: "/login",
      Element: Login,
      label: "Login",
      children: [],
      visible: false,
    },
    {
      key: "/register",
      Element: Register,
      label: "Register",
      children: [],
      visible: false,
    },
  ];