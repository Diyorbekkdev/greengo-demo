import {
  CarOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import { AvailableAreas, ProhibitedAreas, Stations } from "./page";
import { lazy } from "react";
const Reagions = lazy(() => import("./page/regions/regions.component"));
export const regionsRoutes = [
  {
    key: "/regions",
    Element: Reagions,
    label: "Regions",
    icon: PushpinOutlined,
    children: [
      {
        key: "/regions",
        Element: Reagions,
        label: "Regions",
        icon: PushpinOutlined,
        children: [],
        visible: true,
        access: "main",
      },
      {
        key: "/available-areas",
        Element: AvailableAreas,
        label: "Available Areas",
        icon: PushpinOutlined,
        children: [],
        visible: true,
        access: "main",
      },
      {
        key: "/prohibited-areas",
        Element: ProhibitedAreas,
        label: "Prohibited Areas",
        icon: PushpinOutlined,
        children: [],
        visible: true,
        access: "main",
      },
      {
        key: "/stations",
        Element: Stations,
        label: "Stations",
        icon: CarOutlined,
        children: [],
        visible: true,
        access: "main",
      },
    ],
    visible: true,
    access: "main",
  },
];
