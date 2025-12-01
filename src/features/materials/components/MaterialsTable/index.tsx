import { useMemo } from "react";
import { Table, Checkbox, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";

export interface MaterialItem {
  id: number;
  name: string;
  section: string;
}

interface MaterialsTableProps {
  data: MaterialItem[];
  searchValue: string;
  onDeleteClick?: (record: MaterialItem) => void;
  onRowClick?: (record: MaterialItem) => void;
}

const MaterialsTable = ({
  data,
  searchValue,
  onDeleteClick,
  onRowClick,
}: MaterialsTableProps) => {
  const navigate = useNavigate();

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
      render: () => <Checkbox onClick={(e) => e.stopPropagation()} />,
    },
    {
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "end", gap: 8 }}>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={(e) => e.stopPropagation()}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick && onDeleteClick(record);
            }}
          />
        </div>
      ),
    },
  ];

  const filteredData = useMemo(() => {
    const lower = searchValue.toLowerCase();
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(lower) ||
        item.section.toLowerCase().includes(lower)
    );
  }, [data, searchValue]);

  return (
    <Table
      columns={columns}
      dataSource={filteredData}
      rowKey="id"
      pagination={false}
      onRow={(record) => ({
        onClick: (event) => {
          const target = event.target as HTMLElement;

          if (
            target.closest("button") ||
            target.closest("input[type='checkbox']")
          )
            return;

          onRowClick && onRowClick(record);
          navigate(`/materialspage/${record.id}`);
        },
      })}
    />
  );
};

export default MaterialsTable;
