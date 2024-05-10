import {Tariff } from "./page";
import {
    AppstoreOutlined
} from '@ant-design/icons';

export const tariffRoutes = [
    {
        key: "/tariff",
        Element: Tariff,
        label: "Tariff",
        icon: AppstoreOutlined,
        children: [
        ],
        visible: true,
        access: "main",
    },
];
