import React, { useMemo } from "react";
import { Table, Checkbox, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";

export interface MaterialsListItem {
  id: number;
  priyceList: boolean;
  order: number;
  name: string;
  code: string;
  unit: string;
  type: string;
  materialKind: string;
  section?: string;
}

interface TableProps {
  data: MaterialsListItem[];
  searchValue: string;
  onDelete: (record: MaterialsListItem) => void;
}

const MaterialsDetailTable: React.FC<TableProps> = ({
  data,
  searchValue,
  onDelete,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const columns: ColumnsType<MaterialsListItem> = [
    {
      title: "Прайс лист",
      dataIndex: "priceList",
      sorter: (a, b) => Number(a.priyceList) - Number(b.priyceList),
      render: () => <Checkbox onClick={(e) => e.stopPropagation()} />,
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
    {
      title: "Показать в списках",
      render: () => <Checkbox onClick={(e) => e.stopPropagation()} />,
    },
    {
      title: "Разделы",
      dataIndex: "section",
      sorter: (a, b) => (a.section ?? "").localeCompare(b.section ?? ""),
    },
    {
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "end", gap: 8 }}>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={
              () =>
                navigate(`/refs/material-types/${id}/edit`, { state: record }) // record ni yuborish
            }
          />

          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  const filteredData = useMemo(() => {
    const text = searchValue.trim().toLowerCase();
    if (!text) return data;
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(text) ||
        (item.section?.toLowerCase() ?? "").includes(text)
    );
  }, [data, searchValue]);

  return (
    <Table
      columns={columns}
      dataSource={filteredData || []}
      rowKey="id"
      scroll={{ x: 2649 }}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["10", "50", "100"],
        position: ["bottomCenter"],
        align: "center",
        showQuickJumper: false,
      }}
      onRow={(record) => ({
        onClick: (event) => {
          const target = event.target as HTMLElement;
          if (
            target.closest("button") ||
            target.closest("input[type='checkbox']")
          )
            return;
        },
      })}
    />
  );
};

export default MaterialsDetailTable;
