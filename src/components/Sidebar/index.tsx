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
            label: (
                <span onClick={() => navigate("/")}>
                    Пользователи
                </span>
            ),
            disabled: false
        },
        {
            key: "refs",
            icon: <img className="menu-icon" src={ReferenceMaterialsIcon} alt="Справочники" />,
            label: "Справочники",
            disabled: false,
            children: [
                {
                    key: "ref1",
                    label: <span onClick={() => navigate("/")}>Тип материалов</span>,
                    disabled: false
                },
                {
                    key: "ref2",
                    label: <span onClick={() => navigate("/references/sort")}>Сорт качество</span>,
                    disabled: false
                }
            ]
        },
        {
            key: "stock",
            icon: <img className="menu-icon" src={WarehouseIcon} alt="Склад" />,
            label: "Склад",
            children: [
                {
                    key: "raw-materials",
                    label: <span onClick={() => navigate("/")}>Сырьё материалы</span>,
                    disabled: false
                },
                {
                    key: "balance",
                    label: <span onClick={() => navigate("/")}>Баланс</span>,
                    disabled: false
                },
            ]
        },
        {
            key: "finished-products",
            icon: <img className="menu-icon" src={FinishedProductsIcon} alt="Готовая продукция" />,
            label: <span onClick={() => navigate("/")}>Готовая продукция</span>,
            disabled: false
        },
        {
            key: "active-sessions",
            icon: <img className="menu-icon" src={ActiveSessionsIcon} alt="Активные сеансы" />,
            label: <span onClick={() => navigate("/")}>Активные сеансы</span>,
            disabled: false
        }
    ];

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
                    />
                </div>
                <div className="sidebar__setting">
                    <Menu
                        mode="inline"
                        inlineCollapsed={collapsed}
                        items={[
                            {
                                key: "settings",
                                icon: <img className="menu-icon" src={SettingsIcon} alt="Настройки"
                                />,
                                label: (
                                    <span onClick={() => navigate("/")}>

                                        Настройки
                                    </span>
                                )
                            }
                        ]}
                    />
                </div>
            </div>
        </SideBarStyled>
    );
};

export default Sidebar;
