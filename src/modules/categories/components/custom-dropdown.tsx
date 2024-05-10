import { Button, Dropdown, Menu} from "antd";
import { InfoCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { memo } from "react";
import { three_dots } from "@/assets";


interface CustomDropdownTypes {
    onClickEdit?: () => void,
    onClickDelete: () => void,
    onClickInfo: () => void,
}
export const CustomDropdown = memo(({ onClickEdit, onClickDelete, onClickInfo }: CustomDropdownTypes) => {
    const menuItems = [
        { key: 'info', icon: <InfoCircleOutlined />, label: 'Info' },
        { key: 'edit', icon: <EditOutlined />, label: 'Edit' },
        { key: 'delete', icon: <DeleteOutlined />, label: "Delete", danger: true },
    ];
    const menu = (
        <Menu>
            {menuItems.map(item => (
                <Menu.Item key={item.key} onClick={item.key === 'edit' ? onClickEdit : (item.key === 'delete' ? onClickDelete : onClickInfo)} danger={item.danger}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                    </div>
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={["click"]}>
            <Button type="link" icon={<img style={{ rotate: '90deg' }} src={three_dots} alt='three dots icon' />} />
        </Dropdown>
    );
});