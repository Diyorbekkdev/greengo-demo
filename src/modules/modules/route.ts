import { Modules } from "./page";
import {
    AppstoreOutlined
} from '@ant-design/icons';

export const modulesRoutes = [
    {
        key: "/modules",
        Element: Modules,
        label: "Dashboard",
        icon: AppstoreOutlined,
        children: [
        ],
        visible: true,
        access: "main",
    },
];
