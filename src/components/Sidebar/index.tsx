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
import React, { useState, useEffect, useMemo } from "react";

interface SidebarProps {
    collapsed: boolean;
    setCollapsed?: React.Dispatch<React.SetStateAction<boolean>>;
}

type MenuItemType = Required<MenuProps>["items"][number] & {
    path?: string;
    children?: MenuItemType[];
    disabled?: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const [selectedKey, setSelectedKey] = useState<string>("");

    const items: MenuItemType[] = useMemo(() => [
        {
            key: "/users",
            icon: <img className="menu-icon" src={DirectoryIcon} alt="Пользователи" />,
            label: "Пользователи",
            path: "/users",
            disabled: false
        },
        {
            key: "/refs",
            icon: <img className="menu-icon" src={ReferenceMaterialsIcon} alt="Справочники" />,
            label: "Справочники",
            path: "/refs",
            children: [
                {
                    key: "/refs/sections",
                    label: "Раздели",
                    path: "/refs/sections",
                    disabled: false
                },
                {
                    key: "/refs/material-types",
                    label: "Тип материалов",
                    path: "/refs/material-types",
                    disabled: false
                },
                {
                    key: "/refs/grade-quality",
                    label: "Сорт качество",
                    path: "/refs/grade-quality",
                    disabled: false
                },
                {
                    key: "/refs/responsible-employees",
                    label: "Ответственные сотрудники",
                    path: "/refs/responsible-employees",
                    disabled: false
                },
                {
                    key: "/refs/clients",
                    label: "Клиенты",   
                    path: "/refs/clients",
                    disabled: false
                },
                {
                    key: "/refs/packaging",
                    label: "Тара",
                    path: "/refs/packaging",
                    disabled: false
                },
                {
                    key: "/refs/parameters",
                    label: "Параметр",
                    path: "/refs/parameters",
                    disabled: false
                },
            ]
        },
        {
            key: "/stock",
            icon: <img className="menu-icon" src={WarehouseIcon} alt="Склад" />,
            label: "Склад",
            path: "/stock",
            children: [
                {
                    key: "/stock/raw-materials",
                    label: "Сырьё материалы",
                    path: "/stock/raw-materials",
                    disabled: false
                },
                {
                    key: "/stock/balance",
                    label: "Баланс",
                    path: "/stock/balance",
                    disabled: false
                }
            ]
        },
        {
            key: "/finished-products",
            icon: <img className="menu-icon" src={FinishedProductsIcon} alt="Готовая продукция" />,
            label: "Готовая продукция",
            path: "/finished-products",
            disabled: false
        },
        {
            key: "/active-sessions",
            icon: <img className="menu-icon" src={ActiveSessionsIcon} alt="Активные сеансы" />,
            label: "Активные сеансы",
            path: "/active-sessions",
            disabled: false
        },
    ], []);

    useEffect(() => {
        const path = location.pathname;
        const findSelected = (items: MenuItemType[]): string | null => {
            for (const item of items) {
                if ('path' in item && item.path === path) return item.key as string;
                if ('children' in item && item.children) {
                    const child = findSelected(item.children);
                    if (child) return child;
                }
            }
            return null;
        };

        const selected = findSelected(items);
        if (selected) {
            queueMicrotask(() => setSelectedKey(selected));
        }
        const findOpenKeys = (items: MenuItemType[]): string[] => {
            const keys: string[] = [];
            items.forEach(i => {
                if (i.children?.some(c => c && 'path' in c && typeof c.path === "string" && path.startsWith(c.path))) {
                    keys.push(i.key as string);
                }
            });
            return keys;
        };

        const openParents = findOpenKeys(items);
        queueMicrotask(() => setOpenKeys(openParents));

    }, [location.pathname, items]);

    const handleClick = ({ key }: { key: string }) => {
        setSelectedKey(key);
        setCollapsed?.(false);
        navigate(key);
    };

    const handleOpenChange = (keys: string[]) => {
        const latestOpenKey = keys.find(key => !openKeys.includes(key));
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    };

    const rootItems = items.filter(i => i.key !== "/settings");

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
                        items={rootItems}
                        inlineCollapsed={collapsed}
                        onClick={handleClick}
                        openKeys={openKeys}
                        onOpenChange={handleOpenChange}
                        selectedKeys={[selectedKey]}
                    />
                </div>

                <div className="sidebar__setting">
                    <button onClick={() => navigate('/settings')} className="setting__button">
                        <img className="setting__icon" src={SettingsIcon} alt="" />
                        Настройки
                    </button >
                </div>
            </div>
        </SideBarStyled>
    );
};

export default Sidebar;
