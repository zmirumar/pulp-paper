import { Menu } from "antd";
import type { MenuProps } from "antd";
import { SideBarStyled } from "./style";
import { Logo } from "@/assets/Images";
import {
    DirectoryIcon,
    ReferenceMaterialsIcon,
    WarehouseIcon,
    FinishedProductsIcon,
    ActiveSessionsIcon,
    SettingsIcon
} from "@/assets/Icons/index";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useMemo } from "react";

interface SidebarProps {
    collapsed: boolean;
    setCollapsed?: React.Dispatch<React.SetStateAction<boolean>>;
}

type MenuItemType = Required<MenuProps>["items"][number] & {
    path?: string;
    children?: MenuItemType[];
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const items: MenuItemType[] = useMemo(() => [
        {
            key: "/users",
            icon: <img className="menu-icon" src={DirectoryIcon} alt="Пользователи" />,
            label: "Пользователи",
            path: "/users",
        },
        {
            key: "/refs",
            icon: <img className="menu-icon" src={ReferenceMaterialsIcon} alt="Справочники" />,
            label: "Справочники",
            path: "/refs",
            children: [
                { key: "/refs/sections", label: "Раздели", path: "/refs/sections" },
                { key: "/refs/material-types", label: "Тип материалов", path: "/refs/material-types" },
                { key: "/refs/grade-quality", label: "Сорт качество", path: "/refs/grade-quality" },
                { key: "/refs/responsible-employees", label: "Ответственные сотрудники", path: "/refs/responsible-employees" },
                { key: "/refs/clients", label: "Клиенты", path: "/refs/clients" },
                { key: "/refs/packaging", label: "Тара", path: "/refs/packaging" },
                { key: "/refs/parameters", label: "Параметр", path: "/refs/parameters" },
            ]
        },
        {
            key: "/stock",
            icon: <img className="menu-icon" src={WarehouseIcon} alt="Склад" />,
            label: "Склад",
            path: "/stock",
            children: [
                { key: "/stock/raw-materials", label: "Сырьё материалы", path: "/stock/raw-materials" },
                { key: "/stock/balance", label: "Баланс", path: "/stock/balance" }
            ]
        },
        {
            key: "/finished-products",
            icon: <img className="menu-icon" src={FinishedProductsIcon} alt="Готовая продукция" />,
            label: "Готовая продукция",
            path: "/finished-products",
        },
        {
            key: "/active-sessions",
            icon: <img className="menu-icon" src={ActiveSessionsIcon} alt="Активные сеансы" />,
            label: "Активные сеансы",
            path: "/active-sessions",
        },
    ], []);

    const { selectedKey, parentKey } = useMemo(() => {
        let selected = "";
        let parent = "";

        const traverse = (menuItems: MenuItemType[], pKey?: string) => {
            for (const item of menuItems) {
                const itemPath = item.path as string;
                if (itemPath && (path === itemPath || path.startsWith(`${itemPath}/`))) {
                    selected = item.key as string;
                    if (pKey) parent = pKey;
                }
                if (item.children) traverse(item.children, item.key as string);
            }
        };

        traverse(items);
        return { selectedKey: selected, parentKey: parent };
    }, [path, items]);
    const [openKeys, setOpenKeys] = useState<string[]>(parentKey ? [parentKey] : []);

    const handleClick: MenuProps['onClick'] = ({ key }) => {
        setCollapsed?.(false);
        navigate(key);
    };

    const handleOpenChange = (keys: string[]) => {
        const latestOpenKey = keys.find(key => !openKeys.includes(key));
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    };

    return (
        <SideBarStyled collapsed={collapsed}>
            <div className="sidebar">
                <div className="sidebar__header">
                    <img src={Logo} alt="Pulp & paper logo" />
                    {!collapsed && <h1>Pulp & paper</h1>}
                </div>

                <div className="sidebar__wrapper">
                    <Menu
                        mode="inline"
                        items={items}
                        inlineCollapsed={collapsed}
                        onClick={handleClick}
                        openKeys={collapsed ? [] : openKeys}
                        onOpenChange={handleOpenChange}
                        selectedKeys={[selectedKey]}
                    />
                </div>

                <div className="sidebar__setting">
                    <button
                        onClick={() => navigate('/settings')}
                        className={`setting__button ${path.startsWith('/settings') ? 'active' : ''}`}
                    >
                        <img className="setting__icon" src={SettingsIcon} alt="" />
                        {!collapsed && "Настройки"}
                    </button >
                </div>
            </div>
        </SideBarStyled>
    );
};

export default Sidebar;