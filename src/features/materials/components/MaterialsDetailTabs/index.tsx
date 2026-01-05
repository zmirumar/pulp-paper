import React from "react";
import { Table, Button, Input } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { MaterialsListItem } from "@/interface";
import { MaterialsDetailStyled } from "../MaterialsDetail/style";

interface MaterialsDetailTabsProps {
  data: MaterialsListItem[];
  navigate: any;
  columns: ColumnsType<MaterialsListItem>;
}

export const MaterialsDetailTabs: React.FC<MaterialsDetailTabsProps> = ({
  data,
  navigate,
  columns,
}) => {
  return (
    <MaterialsDetailStyled>
      <p className="detail__text">
        Разделы / Тип материалов / Материалы Деталь / <span>Склад</span>
      </p>
      <div className="materialsDetail__wrapper">
        <Input
          type="text"
          placeholder="Поиск"
          className="detail__input"
          suffix={<SearchOutlined style={{ color: "#00000073" }} />}
          allowClear
        />

        <Button
          onClick={() => navigate(`/refs/material-types/1/create`)}
          icon={<PlusOutlined />}
          type="primary"
          className="materialsDetail__button"
        >
          Добавить новый
        </Button>
      </div>

      <Table<MaterialsListItem>
        columns={columns}
        dataSource={data}
        rowKey="id"
        scroll={{ x: 2649 }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "50", "100"],
          position: ["bottomCenter"],
        }}
      />
    </MaterialsDetailStyled>
  );
};
