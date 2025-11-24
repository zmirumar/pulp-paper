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
import { useNavigate } from "react-router-dom";

interface SidebarProps {
    collapsed: boolean;
}

type MenuItemType = Required<MenuProps>['items'][number];

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
    const navigate = useNavigate();

    const menuMap: Record<string, { path?: string; disabled?: boolean }> = {
        users: { path: "/users", disabled: false },
        ref1: { path: "/references/material-types", disabled: false },
        ref2: { path: "/references/material-types", disabled: true },
        ref3: { disabled: true },
        ref4: { path: "/references/responsible-employees", disabled: false },
        ref5: { path: "/references/clients", disabled: false },
        ref6: { path: "/references/packaging", disabled: false },
        ref7: { path: "/references/parameters", disabled: false },
        "raw-materials": { path: "/stock/raw-materials", disabled: false },
        balance: { path: "/stock/balance", disabled: false },
        "finished-products": { path: "/finished-products", disabled: false },
        "active-sessions": { path: "/active-sessions", disabled: false },
        settings: { path: "/settings", disabled: false },
    };

    const menuItems: MenuItemType[] = [
        {
            key: "users",
            icon: <img className="menu-icon" src={DirectoryIcon} alt="Пользователи" />,
            label: "Пользователи",
            disabled: menuMap["users"].disabled
        },
        {
            key: "refs",
            icon: <img className="menu-icon" src={ReferenceMaterialsIcon} alt="Справочники" />,
            label: "Справочники",
            children: [
                { key: "ref1", label: "Раздели", disabled: menuMap["ref1"].disabled },
                { key: "ref2", label: "Тип материалов", disabled: menuMap["ref2"].disabled },
                { key: "ref3", label: "Сорт качество", disabled: menuMap["ref3"].disabled },
                { key: "ref4", label: "Ответственные сотрудники", disabled: menuMap["ref4"].disabled },
                { key: "ref5", label: "Клиенты", disabled: menuMap["ref5"].disabled },
                { key: "ref6", label: "Тара", disabled: menuMap["ref6"].disabled },
                { key: "ref7", label: "Параметр", disabled: menuMap["ref7"].disabled },
            ]
        },
        {
            key: "stock",
            icon: <img className="menu-icon" src={WarehouseIcon} alt="Склад" />,
            label: "Склад",
            children: [
                { key: "raw-materials", label: "Сырьё материалы", disabled: menuMap["raw-materials"].disabled },
                { key: "balance", label: "Баланс", disabled: menuMap["balance"].disabled },
            ]
        },
        {
            key: "finished-products",
            icon: <img className="menu-icon" src={FinishedProductsIcon} alt="Готовая продукция" />,
            label: "Готовая продукция",
            disabled: menuMap["finished-products"].disabled
        },
        {
            key: "active-sessions",
            icon: <img className="menu-icon" src={ActiveSessionsIcon} alt="Активные сеансы" />,
            label: "Активные сеансы",
            disabled: menuMap["active-sessions"].disabled
        }
    ];

    const handleMenuClick = ({ key }: { key: string }) => {
        const selectedItem = menuMap[key];
        if (!selectedItem || selectedItem.disabled) return;
        if (selectedItem.path) navigate(selectedItem.path);
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
                        items={menuItems}
                        inlineCollapsed={collapsed}
                        onClick={handleMenuClick}
                    />
                </div>
                <div className="sidebar__setting">
                    <hr />
                    <Menu
                        mode="inline"
                        inlineCollapsed={collapsed}
                        onClick={handleMenuClick}
                        items={[
                            {
                                key: "settings",
                                icon: <img className="menu-icon" src={SettingsIcon} alt="Настройки" />,
                                label: "Настройки",
                                disabled: menuMap["settings"].disabled
                            }
                        ]}
                    />
                </div>
            </div>
        </SideBarStyled>
    );
};

export default Sidebar;
