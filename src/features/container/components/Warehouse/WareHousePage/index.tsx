import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Form, Input, Table, Tabs, Checkbox, Modal, notification } from "antd";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { CheckCircleFilled } from "@ant-design/icons";
import { SortStyled } from "@/features/sort/components/SortPage/style";
import { ContainerTableData } from "@/mockdata/container/storage/TableData";

interface ContainerData {
  id: number;
  name: string;
  weight: number;
  unit: string;
  showInList: boolean;
}




function ContainerProducts() {
  return (
    <div>
      <h2>Готовая продукция - Тара</h2>
    </div>
  );
}

function ContainerPage() {
  const [activeTab, setActiveTab] = useState<string>("1");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);


  const handleDelete = () => {
    notification.success({
      message: "Элемент удален",
      description: "Элемент удалён из списка",
      icon: <CheckCircleFilled className="circle_oulined" />,
      placement: "topRight",
      className: "succes_message"
    });
    setShowDeleteModal(false);
  };

  const columns: ColumnsType<ContainerData> = [
    {
      title: "Наименование",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Вес",
      dataIndex: "weight",
      sorter: (a, b) => a.weight - b.weight,
    },
    {
      title: "Единицы измерения",
      dataIndex: "unit",
      sorter: (a, b) => a.unit.localeCompare(b.unit),
    },
    {
      title: "Показывать в списках",
      dataIndex: "showInList",
      align: "center",
      render: () => (
        <Checkbox
          onChange={() => {}}
        />
      ),
    },
    {
      title: "",
      align: "center",
      width: 100,
      render: () => (
        <div className="sort_columns_render">
          <EditOutlined 
           className="sort_render_items" 
          />
          <DeleteOutlined
                 className="sort_render_items" 
            onClick={() => {
             
              setShowDeleteModal(true);
            }}
          />
        </div>
      ),
    },
  ];
  
  return (
    <SortStyled>
      <h2>Тара</h2>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: "1",
            label: "Склад",
            children: (
              <>
                <div className="filter_add">
                  <Form >
                    <Form.Item name="search" noStyle>
                      <Input
                        placeholder="Поиск"
                        suffix={<SearchOutlined />}
                        allowClear
                      />
                    </Form.Item>
                  </Form>

                  <Button type="primary">
                    <PlusOutlined /> Добавить новый
                  </Button>
                </div>

                <Table
                  rowKey="id"
                  columns={columns}
                  dataSource={ContainerTableData}
                  pagination={{ pageSize: 10 }}
                />

                <Modal
                  open={showDeleteModal}
                  title="Подтверждение удаления"
                  okText="Удалить"
                  cancelText="Отменить"
                  centered
                  width={400}
                  onOk={handleDelete}
                  onCancel={() => setShowDeleteModal(false)}
                >
                  Вы уверены, что хотите удалить этот элемент?
                </Modal>
              </>
            ),
          },
          {
            key: "2",
            label: "Готовая продукция",
            children: <ContainerProducts />,
          },
        ]}
      />
    </SortStyled>
  );
}

export default ContainerPage; 