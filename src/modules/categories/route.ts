import {
    UnorderedListOutlined
} from '@ant-design/icons';
import { lazy } from 'react';

const Category = lazy(() => import('./page/categories.component'));
const Bicycle = lazy(() => import('./page/bicycle/bicycle.component'));
export const categoryRoutes = [
    {
        key: "/category",
        Element: Category,
        label: "Category",
        icon: UnorderedListOutlined,
        children: [],
        visible: true,
        access: "main",
    },
    {
        key: "/category/:slug",
        Element: Bicycle,
        label: "Category",
        icon: UnorderedListOutlined,
        children: [
        ],
        visible: false,
        access: "main",
    },
];
