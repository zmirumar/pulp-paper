import { Table, Button, Modal, notification, Input, Form } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Parameter1 } from "@/mockdata/parameters/ParametersData";
import { StyledTable } from "./style";
import { DeleteOutlined, EditOutlined, PlusOutlined, CheckCircleFilled } from "@ant-design/icons";
import { Drawer } from "@/components/ui/index";

interface ParameterRecord {
    key: string;
    name: string;
}

const ParametersDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [form] = Form.useForm();

    const [drawer, setDrawer] = useState(false);
    const [drawerMode, setDrawerMode] = useState<"create" | "edit">("create");
    const [isTouched, setIsTouched] = useState(false);
    const [initialValue, setInitialValue] = useState<string>("");
    const [modal, setModal] = useState<{ open: boolean; type: "unsaved" | "delete" | "" }>({
        open: false,
        type: "",
    });

    const handleCloseDrawer = () => {
        if (isTouched) {
            setModal({ open: true, type: "unsaved" });
            return;
        }
        setDrawer(false);
        form.resetFields();
        setIsTouched(false);
    };

    const handleConfirmDiscard = () => {
        setModal({ open: false, type: "" });
        setDrawer(false);
        form.resetFields();
        setIsTouched(false);
    };

    const handleFinish = (values: { varietyNames: string }) => {
        setDrawer(false);
        showNotification(drawerMode === "edit" ? "edit" : "add", values.varietyNames);
        form.resetFields();
        setIsTouched(false);
    };

    const fieldChange = () => {
        const currentValue = form.getFieldValue("varietyNames") || "";
        const isDirty = currentValue !== initialValue;
        setIsTouched(isDirty);
    };

    const showNotification = (type: "add" | "edit" | "delete", name?: string) => {
        const messages = {
            add: { msg: "Успешно добавлено", desc: `Наименование ${name} было успешно добавлено` },
            edit: { msg: "Изменения сохранены", desc: `Наименование ${name} было успешно обновлено` },
            delete: { msg: "Товар удален", desc: "Товар удален из списка" },
        };

        const { msg, desc } = messages[type] || { msg: "Операция выполнена", desc: "" };

        notification.success({
            message: msg,
            description: desc,
            placement: "topRight",
            icon: <CheckCircleFilled className="circle_oulined" />,
            duration: 3,
            className: "succes_message",
        });
    };

    const deleteParameter = () => {
        showNotification("delete");
        setModal({ open: false, type: "" })
    }

    const columns = [
        { title: "Наименования", dataIndex: "name", key: "name" },
        {
            render: (_: unknown, record: ParameterRecord) => (
                <div className="parameter_actions">
                    <Button
                        className="table_features"
                        type="link"
                        onClick={() => {
                            form.setFieldsValue({ varietyNames: record.name });
                            setDrawer(true);
                            setDrawerMode("edit");
                            setInitialValue(record.name);
                        }}
                    >
                        <EditOutlined />
                    </Button>
                    <Button
                        className="table_features"
                        type="link"
                        onClick={() => setModal({ open: true, type: "delete" })}
                    >
                        <DeleteOutlined />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <StyledTable>
            <h1>Параметр</h1>
            <div className="parameter">
                <div className="parameter_header">
                    <p>Параметр {id}</p>
                    <Button
                        className="parameter_add"
                        type="primary"
                        size="large"
                        onClick={() => {
                            form.resetFields();
                            setDrawer(true);
                            setDrawerMode("create");
                            setInitialValue("");
                        }}
                    >
                        <PlusOutlined /> Добавить новый
                    </Button>
                </div>

                <Drawer
                    open={drawer}
                    title={drawerMode === "edit" ? "Редактировать" : "Добавить новый"}
                    onClose={handleCloseDrawer}
                    showFooter
                    cancelText="Отменить"
                    confirmText={drawerMode === "edit" ? "Сохранить" : "Добавить"}
                    onCancel={handleCloseDrawer}
                    onConfirm={() => form.submit()}
                    confirmDisabled={!isTouched}
                >
                    <Form form={form} layout="vertical" onFieldsChange={fieldChange} onFinish={handleFinish}>
                        <h2>Наименование</h2>
                        <Form.Item
                            name="varietyNames"
                            rules={[{ required: true, message: "Введите значение" }]}
                        >
                            <Input placeholder="Названия сортов" />
                        </Form.Item>
                    </Form>
                </Drawer>

                <Table dataSource={Parameter1} columns={columns} pagination={false} rowKey="key" />

                <Modal className="parameter_modal"
                    open={modal.open}
                    onCancel={() => setModal({ open: false, type: "" })}
                    onOk={() => {
                        if (modal.type === "delete") {
                            deleteParameter();
                        } else {
                            handleConfirmDiscard();
                        }
                    }}
                    okText={modal.type === "unsaved" ? "Продолжить" : "Удалить"}
                    cancelText="Отменить"
                    title={modal.type === "delete" ? "Подтверждение удаления" : "Несохранённые изменения"}
                    centered
                    width={412}
                >
                    {modal.type === "delete"
                        ? "После удаления восстановить этот элемент будет невозможно. Продолжить?"
                        : "Все несохранённые изменения будут потеряны. Продолжить?"}
                </Modal>
            </div>
        </StyledTable>
    );
};

export default ParametersDetail;