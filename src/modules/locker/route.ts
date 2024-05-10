import { Locker } from "./page";
import {
 LockOutlined
} from '@ant-design/icons';

export const lockerRoutes = [
    {
        key: "/locker",
        Element: Locker,
        label: "Locker",
        icon: LockOutlined,
        children: [
        ],
        visible: true,
        access: "main",
    },
];
