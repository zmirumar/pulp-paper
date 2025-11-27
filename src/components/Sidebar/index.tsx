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
    setCollapsed?: React.Dispatch<React.SetStateAction<boolean>>;
}

type MenuItem = Required<MenuProps>["items"][number] & {
    path?: string;
    disabled?: boolean;
    children?: MenuItem[];
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
    const navigate = useNavigate();
    const items: MenuItem[] = [
        {
            key: "users",
            icon: <img className="menu-icon" src={DirectoryIcon} alt="Пользователи" />,
            label: "Пользователи",
            path: "/users",
            disabled: false
        },
        {
            key: "refs",
            icon: <img className="menu-icon" src={ReferenceMaterialsIcon} alt="Справочники" />,
            label: "Справочники",
            children: [
                { key: "ref1", label: "Раздели", path: "/references/material-types", disabled: false },
                { key: "ref2", label: "Тип материалов", path: "/references/material-types", disabled: true },
                { key: "ref3", label: "Сорт качество", path: "/references/grade-quality", disabled: true },
                { key: "ref4", label: "Ответственные сотрудники", path: "/references/responsible-employees", disabled: false },
                { key: "ref5", label: "Клиенты", path: "/references/clients", disabled: false },
                { key: "ref6", label: "Тара", path: "/references/packaging", disabled: false },
                { key: "ref7", label: "Параметр", path: "/references/parameters", disabled: false },
            ],
        },
        {
            key: "stock",
            icon: <img className="menu-icon" src={WarehouseIcon} alt="Склад" />,
            label: "Склад",
            children: [
                { key: "raw-materials", label: "Сырьё материалы", path: "/stock/raw-materials", disabled: false },
                { key: "balance", label: "Баланс", path: "/stock/balance", disabled: false },
            ],
        },
        {
            key: "finished-products",
            icon: <img className="menu-icon" src={FinishedProductsIcon} alt="Готовая продукция" />,
            label: "Готовая продукция",
            path: "/finished-products",
            disabled: false
        },
        {
            key: "active-sessions",
            icon: <img className="menu-icon" src={ActiveSessionsIcon} alt="Активные сеансы" />,
            label: "Активные сеансы",
            path: "/active-sessions",
            disabled: false
        },
        {
            key: "settings",
            icon: <img className="menu-icon" src={SettingsIcon} alt="Настройки" />,
            label: "Настройки",
            path: "/settings",
            disabled: false
        },
    ];

    const handleClick = ({ key }: { key: string }) => {
        const findPath = (items: MenuItem[]): string | undefined => {
            for (const item of items) {
                if (item.key === key && item.path && !item.disabled) return item.path;
                if (item.children) {
                    const found = findPath(item.children as MenuItem[]);
                    if (found) return found;
                }
            }
        };
        const path = findPath(items);
        if (path) navigate(path);
    };

    const menuItems = items.filter(i => i.key !== "settings");
    const settingsItem = items.find(i => i.key === "settings");

    return (
        <SideBarStyled collapsed={collapsed}>
            <div className="sidebar">
                <div className="sidebar__header">
                    <img src={Logo} alt="Pulp & paper logo" />
                    {!collapsed && <h1>Pulp & paper</h1>}
                </div>
                <div className="sidebar__wrapper">
                    <Menu mode="inline" items={menuItems} inlineCollapsed={collapsed} onClick={handleClick} />
                </div>
                <div className="sidebar__setting">
                    <Menu mode="inline" items={settingsItem ? [settingsItem] : []} inlineCollapsed={collapsed} onClick={handleClick} />
                </div>
            </div>
        </SideBarStyled>
    );
};

export default Sidebar;