import React, { useMemo } from "react";
import { Table, Checkbox, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { MaterialsList as mockData } from "@/mockdata/MaterialsData/materialsList";

export interface MaterialsListItem {
  id: number;
  priceList: number;
  order: number;
  name: string;
  code: string;
  unit: string;
  type: string;
  materialKind: string;
  section?: string;
}

interface TableProps {
  searchValue: string;
  onDelete: (record: MaterialsListItem) => void;
}

const MaterialsDetalsTable: React.FC<TableProps> = ({
  searchValue,
  onDelete,
}) => {
  const navigate = useNavigate();

  const columns: ColumnsType<MaterialsListItem> = [
    {
      title: "Прайс лист",
      dataIndex: "priceList",
      sorter: (a, b) => a.priceList - b.priceList,
      render: () => <Checkbox />,
    },
    {
      title: "Порядок",
      dataIndex: "order",
      sorter: (a, b) => a.order - b.order,
    },
    {
      title: "Наименование",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Код",
      dataIndex: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Ед. изм",
      dataIndex: "unit",
      sorter: (a, b) => a.unit.localeCompare(b.unit),
    },
    {
      title: "Тип",
      dataIndex: "type",
      sorter: (a, b) => a.type.localeCompare(b.type),
    },
    {
      title: "Вид материала",
      dataIndex: "materialKind",
      sorter: (a, b) => a.materialKind.localeCompare(b.materialKind),
    },
    { title: "Показать в списках", render: () => <Checkbox /> },
    {
      title: "Разделы",
      dataIndex: "section",
      sorter: (a, b) => (a.section ?? "").localeCompare(b.section ?? ""),
    },
    {
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "end", gap: 8 }}>
          <Button type="text" icon={<EditOutlined />} />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record)}
          />
        </div>
      ),
    },
  ];

  const filteredData = useMemo(() => {
    const text = searchValue.trim().toLowerCase();
    if (!text) return mockData;
    return mockData.filter(
      (item) =>
        item.name.toLowerCase().includes(text) ||
        (item.section?.toLowerCase() ?? "").includes(text)
    );
  }, [searchValue]);

  return (
    <Table
      columns={columns}
      dataSource={filteredData}
      rowKey="id"
      scroll={{ x: 2630 }}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50"],
        position: ["bottomCenter"],
      }}
      onRow={(record) => ({
        onClick: () => navigate(`/materialspage/${record.id}`),
      })}
    />
  );
};

export default MaterialsDetalsTable;
