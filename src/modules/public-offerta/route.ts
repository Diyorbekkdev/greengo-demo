import { PublicOfferta } from "./page";
import { BlockOutlined
} from '@ant-design/icons';

export const publicOffertaRoutes = [
    {
        key: "/offerta",
        Element: PublicOfferta,
        label: "Public Offerta",
        icon: BlockOutlined,
        children: [
        ],
        visible: true,
        access: "main",
    },
];
