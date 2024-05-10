import { useState } from "react";
import { useLocation } from "react-router-dom";
import {theme} from 'antd';
export const useBaseLayoutProps = () => {
    const { pathname } = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    const items = [
        {
            label: "Мой профиль",
            key: "0",
        },
        {
            label: "Настройки",
            key: "1",
        },
        {
            type: "divider",
            key: "2"
        },
        {
            label: 'Logout',
            key: "3",
        },
    ];

    return {
        items,
        pathname,
        collapsed,
        setCollapsed,
        colorBgContainer,
        borderRadiusLG,
    }
}