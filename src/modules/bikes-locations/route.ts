import { AppstoreOutlined } from "@ant-design/icons";
import { BikeStatus } from "./page";
import { BikeSingle } from "./page/bike-single";
// import { Children } from "react";
// import { access } from "fs";

export const bikesMonitoringRoutes = [
  {
    key: "/bikes-status",
    Element: BikeStatus,
    label: "Bikes Status",
    icon: AppstoreOutlined,
    children: [],
    visible: true,
    access: "main",
  },
  {
    key: "/bikes-status/:bikeId",
    Element: BikeSingle,
    label: "Bike Single",
    icon: AppstoreOutlined,
    children: [],
    visible: false,
    access: "main",
  },
];
