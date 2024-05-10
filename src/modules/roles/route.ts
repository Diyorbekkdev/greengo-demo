import {Roles } from "./page";
import {
    ApartmentOutlined,
} from '@ant-design/icons';

export const rolesRoutes = [
    {
        key: "/roles",
        Element: Roles,
        label: "Roles",
        icon: ApartmentOutlined,
        children: [],
        visible: true,
        access: "main",
    },
];
