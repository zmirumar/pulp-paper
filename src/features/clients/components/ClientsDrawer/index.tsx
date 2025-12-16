import { Drawer } from '@/components/ui/Drawer/Drawer';
import { Checkbox, Form, Input, Modal, notification } from 'antd';
import { useState, useEffect } from 'react';
import { ClientDrawerStyled } from './style';
import { CheckCircleFilled } from '@ant-design/icons';

interface ClientData {
  id?: number;
  name: string;
  country: string;
  city: string;
  account: string;
  inn: string;
  okonh: string;
  employeeName: string;
  phones: string;
  addresses: string;
  sections: string[];
  isResident: boolean;
}

interface ClientsDrawerProps {
  open: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  editData?: ClientData | null;
}

interface FormValues {
  name: string;
  country: string;
  city: string;
  account: string;
  inn: string;
  okonh: string;
  employeeName: string;
  phones: string;
  addresses: string;
  sections: string[];
  isResident: boolean;
}

function ClientsDrawer({ 
  open, 
  onClose, 
  mode,
  editData
}: ClientsDrawerProps) {
  const [form] = Form.useForm<FormValues>();
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && editData) {
        form.setFieldsValue({
          name: editData.name || '',
          country: editData.country || '',
          city: editData.city || '',
          account: editData.account || '',
          inn: editData.inn || '',
          okonh: editData.okonh || '',
          employeeName: editData.employeeName || '',
          phones: editData.phones || '',
          addresses: editData.addresses || '',
          sections: editData.sections || [],
          isResident: editData.isResident || false,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, mode, editData, form]);

  const closeDrawer = () => {
    form.resetFields();
    onClose();
  };

  const handleCancel = () => {
    const isFormTouched = form.isFieldsTouched();
    
    if (isFormTouched) {
      setShowCancelModal(true);
    } else {
      closeDrawer();
    }
  };

  const handleConfirmDiscard = () => {
    setShowCancelModal(false);
    closeDrawer();
  };

  const handleSubmit = async () => {
    try {
      // const values = await form.validateFields();
      
      if (isSubmitting) return;
      setIsSubmitting(true);

      await new Promise(resolve => setTimeout(resolve, 500));

      notification.success({
        message: mode === 'edit' ? 'Клиент обновлен' : 'Клиент создан',
        description: mode === 'edit' 
          ? 'Данные клиента успешно обновлены' 
          : 'Новый клиент успешно добавлен',
        placement: 'topRight',
        icon: <CheckCircleFilled className='circle_oulined' />,
        duration: 3,
        className: 'succes_message'
      });

      closeDrawer();
    } catch {
      // Validation errors handled by Ant Design
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = mode === 'create' ? 'Добавить клиента' : 'Редактировать клиента';
  const confirmButtonText = mode === 'create' ? 'Добавить' : 'Сохранить';

  return (
    <>
      <Drawer
        title={title}
        open={open}
        onClose={handleCancel}
        showFooter={true}
        cancelText="Отменить"
        confirmText={confirmButtonText}
        onCancel={handleCancel}
        onConfirm={handleSubmit}
        confirmDisabled={isSubmitting}
        closeButtonPosition="end"
      >
        <ClientDrawerStyled>
          <div className="drawer-content">
            <Form
              form={form}
              layout="vertical"
              disabled={isSubmitting}
              initialValues={{
                sections: [],
                isResident: false,
              }}
            >
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: 'Введите наименование' },
                  { whitespace: true, message: 'Наименование не может быть пустым' },
                  { min: 2, message: 'Минимум 2 символа' },
                ]}
              >
                <Input placeholder="Наименование" />
              </Form.Item>

              <Form.Item
                name="country"
                rules={[
                  { required: true, message: 'Введите страну' },
                  { whitespace: true, message: 'Страна не может быть пустой' },
                ]}
              >
                <Input placeholder="Страна" />
              </Form.Item>

              <Form.Item
                name="city"
                rules={[
                  { required: true, message: 'Введите город' },
                  { whitespace: true, message: 'Город не может быть пустым' },
                ]}
              >
                <Input placeholder="Город" />
              </Form.Item>

              <Form.Item
                name="account"
                rules={[
                  { required: true, message: 'Введите расчетный счет' },
                  { whitespace: true, message: 'Счет не может быть пустым' },
                ]}
              >
                <Input placeholder="Расчетный счет" />
              </Form.Item>

              <div className="section-divider" />
              
              <Form.Item
                label={<h3 className="section-title">Раздел</h3>}
                name="sections"
                rules={[
                  { 
                    required: true, 
                    message: 'Выберите хотя бы один раздел',
                    type: 'array',
                    min: 1
                  }
                ]}
              >
                <Checkbox.Group style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Checkbox value="finishedProducts">Готовая продукция</Checkbox>
                  <Checkbox value="warehouses">Склады</Checkbox>
                </Checkbox.Group>
              </Form.Item>

              <div className="section-divider" />
              
              <Form.Item
                name="isResident"
                valuePropName="checked"
              >
                <Checkbox>Резидент</Checkbox>
              </Form.Item>

              <Form.Item
                name="inn"
                rules={[
                  { required: true, message: 'Введите ИНН' },
                  { whitespace: true, message: 'ИНН не может быть пустым' },
                  { pattern: /^\d+$/, message: 'ИНН должен содержать только цифры' },
                ]}
              >
                <Input placeholder="ИНН" />
              </Form.Item>

              <Form.Item
                name="okonh"
                rules={[
                  { required: true, message: 'Введите ОКОНХ' },
                  { whitespace: true, message: 'ОКОНХ не может быть пустым' },
                ]}
              >
                <Input placeholder="ОКОНХ" />
              </Form.Item>

              <Form.Item
                name="employeeName"
                rules={[
                  { required: true, message: 'Введите имя сотрудника' },
                  { whitespace: true, message: 'Имя не может быть пустым' },
                  { min: 2, message: 'Минимум 2 символа' },
                ]}
              >
                <Input placeholder="Имя сотрудника" />
              </Form.Item>

              <Form.Item
                name="phones"
                rules={[
                  { required: true, message: 'Введите телефон' },
                  { whitespace: true, message: 'Телефон не может быть пустым' },
                ]}
              >
                <Input placeholder="Телефоны" />
              </Form.Item>

              <Form.Item
                name="addresses"
                rules={[
                  { required: true, message: 'Введите адрес' },
                  { whitespace: true, message: 'Адрес не может быть пустым' },
                ]}
              >
                <Input placeholder="Адреса" />
              </Form.Item>
            </Form>
          </div>
        </ClientDrawerStyled>
      </Drawer>

      <Modal
        open={showCancelModal}
        centered
        onCancel={() => setShowCancelModal(false)}
        onOk={handleConfirmDiscard}
        okText="Продолжить"
        cancelText="Отменить"
        title="Несохранённые изменения"
        width={400}
      >
        Все несохранённые изменения будут потеряны. Продолжить?
      </Modal>
    </>
  );
}

export default ClientsDrawer;