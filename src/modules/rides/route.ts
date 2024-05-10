import {
    AppstoreOutlined
} from '@ant-design/icons';
import { Dashboard } from '../dashboard/page';

export const dashboardRoutes = [
    {
        key: "/dashboard",
        Element: Dashboard,
        label: "Dashboard",
        icon: AppstoreOutlined,
        children: [
        ],
        visible: true,
        access: "main",
    },
];
