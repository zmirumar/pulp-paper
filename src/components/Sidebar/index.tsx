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

    const menuItems: MenuItemType[] = [
        {
            key: "users",
            icon: <img className="menu-icon" src={DirectoryIcon} alt="Пользователи" />,
            label: "Пользователи",
            disabled: false
        },
        {
            key: "refs",
            icon: <img className="menu-icon" src={ReferenceMaterialsIcon} alt="Справочники" />,
            label: "Справочники",
            disabled: false,
            children: [
                { key: "ref1", label: "Раздели", disabled: false },
                { key: "ref2", label: "Тип материалов", disabled: false },
                { key: "ref3", label: "Сорт качество (disabled)", disabled: true },
                { key: "ref4", label: "Ответственные сотрудники", disabled: false },
                { key: "ref5", label: "Клиенты", disabled: false },
                { key: "ref6", label: "Тара", disabled: false },
                { key: "ref7", label: "Параметр", disabled: false },
            ]
        },
        {
            key: "stock",
            icon: <img className="menu-icon" src={WarehouseIcon} alt="Склад" />,
            label: "Склад",
            children: [
                { key: "raw-materials", label: "Сырьё материалы", disabled: false },
                { key: "balance", label: "Баланс", disabled: false },
            ]
        },
        {
            key: "finished-products",
            icon: <img className="menu-icon" src={FinishedProductsIcon} alt="Готовая продукция" />,
            label: "Готовая продукция",
            disabled: false
        },
        {
            key: "active-sessions",
            icon: <img className="menu-icon" src={ActiveSessionsIcon} alt="Активные сеансы" />,
            label: "Активные сеансы",
            disabled: false
        }
    ];

    const handleMenuClick = ({ key }: { key: string }) => {
        switch (key) {
            case "users": navigate("/users"); break;
            case "ref1": navigate("/references/material-types"); break;
            case "ref2": navigate("/references/material-types"); break;
            case "ref4": navigate("/references/responsible-employees"); break;
            case "ref5": navigate("/references/clients"); break;
            case "ref6": navigate("/references/packaging"); break;
            case "ref7": navigate("/references/parameters"); break;
            case "raw-materials": navigate("/stock/raw-materials"); break;
            case "balance": navigate("/stock/balance"); break;
            case "finished-products": navigate("/finished-products"); break;
            case "active-sessions": navigate("/active-sessions"); break;
            case "settings": navigate("/settings"); break;
        }
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
                                label: "Настройки"
                            }
                        ]}
                    />
                </div>
            </div>
        </SideBarStyled>
    );
};

export default Sidebar;
