import {
    IdcardOutlined
} from "@ant-design/icons";
import { Simcard } from './page';

export const simcardRoutes = [
    {
        key: "/simcard",
        Element: Simcard,
        label: "Simcard",
        icon: IdcardOutlined,
        children: [
        ],
        visible: true,
        access: "main",
    },
];
