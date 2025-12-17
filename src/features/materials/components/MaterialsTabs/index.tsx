import { Input, Button, Table } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import type { MaterialItem } from "@/interface";

interface MaterialsTabsProps {
  columns: any[];
  navigate: (path: string) => void;
  openCreateDrawer: () => void;
  data: MaterialItem[];
}

export function MaterialsTabs({
  columns,
  navigate,
  openCreateDrawer,
  data,
}: MaterialsTabsProps) {
  return (
    <>
      <div className="materials__site">
        <Input
          placeholder="Поиск"
          className="materials__input"
          suffix={<SearchOutlined />}
          allowClear
        />

        <Button
          className="materials__button"
          icon={<PlusOutlined />}
          onClick={openCreateDrawer}
        >
          Добавить новый материал
        </Button>
      </div>

      <Table<MaterialItem>
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        onRow={(record) => ({
          onClick: () => navigate(`/refs/material-types/${record.id}`),
        })}
      />
    </>
  );
}
