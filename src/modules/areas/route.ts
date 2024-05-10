import { Dashboard } from "./page";
import {
    AppstoreOutlined
} from '@ant-design/icons';

export const dashboardRoutes = [
    {
        key: "/dashboard",
        Element: Dashboard,
        label: "Dashboard",
        icon: AppstoreOutlined,
        children: [
            // {
            //     key: "/profile",
            //     Element: Dashboard,
            //     label: "Dashboard",
            //     icon: AppstoreOutlined,
            //     children: [],
            //     visible: true,
            //     access: "main",
            // },
        ],
        visible: true,
        access: "main",
    },
];
