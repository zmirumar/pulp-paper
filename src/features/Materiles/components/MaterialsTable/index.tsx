import { Table, Checkbox, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import type { ColumnsType } from "antd/es/table";

export interface MaterialItem {
  id: number;
  name: string;
  section: string;
}

interface MaterialsTableProps {
  data: MaterialItem[];
  searchText?: string;
  onDeleteClick?: (record: MaterialItem) => void;
}

const MaterialsTable = ({
  data,
  searchText = "",
  onDeleteClick,
}: MaterialsTableProps) => {
  const columns: ColumnsType<MaterialItem> = [
    {
      title: "Наименование",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Разделы",
      dataIndex: "section",

      sorter: (a, b) => a.section.localeCompare(b.section),
    },
    {
      title: "Показать",

      render: () => <Checkbox />,
    },
    {
      key: "actions",
      render: (_, record: MaterialItem) => (
        <div style={{ display: "flex", justifyContent: "end", gap: 8 }}>
          <Button type="text" icon={<EditOutlined />} />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => onDeleteClick && onDeleteClick(record)}
          />
        </div>
      ),
    },
  ];

  const filteredData = useMemo(() => {
    if (!searchText.trim()) return data;
    const lower = searchText.toLowerCase();
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(lower) ||
        item.section.toLowerCase().includes(lower)
    );
  }, [data, searchText]);

  return (
    <Table
      columns={columns}
      dataSource={filteredData}
      rowKey="id"
      pagination={false}
    />
  );
};

export default MaterialsTable;
