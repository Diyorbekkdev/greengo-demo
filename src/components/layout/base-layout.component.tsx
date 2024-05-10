import { hoc } from "@/utils";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";

import { Layout, Menu, Button, Dropdown, Avatar } from "antd";
import { useBaseLayoutProps } from "./base-layout.props";
import { Link, Outlet } from "react-router-dom";
import { routes } from "@/modules/routes";

const { Header, Sider, Content } = Layout;
interface RouteData {
    key: string;
    icon?: React.ReactNode | any;
    label: React.ReactNode;
    children?: RouteData[];
    visible?: boolean;
}
const generateMenuItems = (route: RouteData[], basePath = ''): RouteData[] => {
    return route?.reduce((acc: RouteData[], { key, icon: IconComponent, label, children, visible }) => {
        if (!visible) {
            return acc;
        }
        const fullPath = `${basePath}${key}`;
        const menuItem: RouteData = {
            key: fullPath,
            icon: IconComponent ? <IconComponent /> : null,
            label: !children ? label : <Link to={fullPath}>{label}</Link>,
            visible,
        };
        if (children && children.length > 0) {
            menuItem.children = generateMenuItems(children, `${fullPath}`);
        }
        return [...acc, menuItem];
    }, []);
};
export const BaseLayout = hoc(useBaseLayoutProps, ({ borderRadiusLG, collapsed, colorBgContainer, items, pathname, setCollapsed }) => {
    const menuItems = generateMenuItems(routes);

    return (
        <Layout
            className={`h-screen pt-[70px] relative duration-300 ${collapsed ? "pl-[80px]" : "pl-[200px]"
                }`}
        >
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className="base_layout_aside fixed top-0 z-[9999] left-0 h-screen bg-primary"
            >
                <div className={`text-white flex items-center justify-center py-3`}>
                    <h1
                        className={`duration-150 ${collapsed ? "text-[0px]" : "text-[25px]"
                            }`}
                    >
                        GREENGO
                    </h1>
                    {/* <img
                            src={''}
                            alt="Site logo"
                            className={`${!collapsed ? "w-[30px]" : "w-[50px]"}`}
                        /> */}
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[pathname]}
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header
                    className={`shadow-md flex items-center justify-between duration-200 px-4 fixed top-0 right-0 z-[999] ${!collapsed ? "w-[calc(100%-200px)]" : "w-[calc(100%-80px)]"
                        }`}
                    style={{
                        background: colorBgContainer,
                        height: "55px",
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                    />
                    <div>
                        <Dropdown menu={{ items }} trigger={["click"]}>
                            <div className="flex items-center gap-2 cursor-pointer">
                                <h1 className="text-[17px] cursor-pointer">Профиль:</h1>
                                <Avatar
                                    size={"default"}
                                    style={{ backgroundColor: "green" }}
                                >A</Avatar>
                            </div>
                        </Dropdown>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: 0,
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflowY: 'scroll'
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
})
