import { useState } from "react";
import { Input, Button, Tabs, Table, Checkbox } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { MaterialsStyled } from "./style";
import { MaterilesTable } from "@/mockdata/materials";

const items = [
  { key: "1", label: "Склад" },
  { key: "2", label: "Готовая продукция" },
];

const MaterialsPage = () => {
  const [activeTab, setActiveTab] = useState("1");

  const columns = [
    { title: "Наименование", dataIndex: "name", key: "name" },
    { title: "Разделы", dataIndex: "section", key: "section" },
    {
      title: "Показать",
      key: "show",
      render: () => (
        <Checkbox
          style={{
            marginLeft: "10px",
            backgroundColor: "#ffffff",
            padding: "5px",
            borderRadius: "4px",
          }}
        />
      ),
    },
    {
      render: () => (
        <div style={{ display: "flex", justifyContent: "end", gap: "8px" }}>
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" icon={<DeleteOutlined />} />
        </div>
      ),
    },
  ];

  return (
    <MaterialsStyled>
      <div>
        <h1>Тип материалов</h1>

        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          items={items}
        />

        <div className="materiles_site">
          {activeTab === "1" && (
            <>
              <Input
                className="materiles_input"
                placeholder="Поиск"
                suffix={<SearchOutlined />}
              />
              <Button className="add-btn" icon={<PlusOutlined />}>
                Добавить новый материал
              </Button>
            </>
          )}
        </div>
      </div>

      {activeTab === "1" ? (
        <Table
          dataSource={MaterilesTable}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      ) : (
        <div className="not-found">Not Found</div>
      )}
    </MaterialsStyled>
  );
};

export default MaterialsPage;
