import { Table, Checkbox } from "antd";
import { MaterialsList as mockData } from "@/mockdata/MaterialsData/materialsList";

export const MaterialsList = () => {
  const columns = [
    {
      title: "Прайс лист",
      dataIndex: "priyceList",
      render: () => <Checkbox />,
    },
    {
      title: "Порядок",
      dataIndex: "order",
    },
    {
      title: "Наименование",
      dataIndex: "name",
    },
    {
      title: "Код",
      dataIndex: "code",
    },
    {
      title: "Ед. изм",
      dataIndex: "unit",
    },
    {
      title: "Тип",
      dataIndex: "type",
    },
    {
      title: "Вид материала",
      dataIndex: "materialKind",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={mockData}
      rowKey="id"
      pagination={false}
    />
  );
};

export default MaterialsList;
