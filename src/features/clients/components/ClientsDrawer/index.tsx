import { Drawer } from '@/components/ui/Drawer/Drawer';
import { Checkbox, Input, Modal } from 'antd';
import { useState } from 'react';
import { ClientDrawerStyled } from './style';

interface ClientsDrawerProps {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  mode?: 'create' | 'edit';
  editData?: any;
}

function ClientsDrawer({ 
  open, 
  onClose, 
  onCancel, 
  onConfirm,
  mode = 'create',
}: ClientsDrawerProps) {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const handleCancel = () => {
    setShowCancelConfirm(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelConfirm(false);
    onCancel();
  };

  const handleCancelConfirmClose = () => {
    setShowCancelConfirm(false);
  };

  const title = mode === 'create' ? 'Добавить клиента' : 'Редактировать клиента';
  const confirmButtonText = mode === 'create' ? 'Добавить' : 'Сохранить';

  return (
    <>
      <Drawer
        title={title}
        open={open}
        onClose={onClose}
        showFooter={true}
        cancelText="Отменить"
        confirmText={confirmButtonText}
        onCancel={handleCancel}
        onConfirm={onConfirm}
        closeButtonPosition="end"
        >
        <ClientDrawerStyled>
        <div className="drawer-content">
          <div className="form-group">
            <Input placeholder="Наименование" />
          </div>

          <div className="form-group">
            <Input placeholder="Страна" />
          </div>

          <div className="form-group">
            <Input placeholder="Город" />
          </div>

          <div className="form-group">
            <Input placeholder="Расчетный счет" />
          </div>

          <div className="section-divider" />
          
          <div className="form-group">
            <h3 className="section-title">Раздел</h3>
            <div className="checkbox-group">
              <Checkbox>Все</Checkbox>
              <Checkbox>Готовая продукция</Checkbox>
              <Checkbox>Склады</Checkbox>
            </div>
          </div>

          <div className="section-divider" />
          
          <div className="form-group">
            <Checkbox>Резидент</Checkbox>
         </div>

          <div className="form-group">
            <Input placeholder="ИНН" />
          </div>

          <div className="form-group">
            <Input placeholder="ОКОНХ" />
          </div>

          <div className="form-group">
            <Input placeholder="Имя сотрудника" />
          </div>

          <div className="form-group">
            <Input placeholder="Телефоны" />
          </div>

          <div className="form-group">
            <Input placeholder="Адреса" />
          </div>
        </div>
  </ClientDrawerStyled>
      </Drawer>

      <Modal
        open={showCancelConfirm}
        onCancel={handleCancelConfirmClose}
        onOk={handleConfirmCancel}
        okText="Продолжить"
        cancelText="Отменить"
        title="Несохранённые изменения"
        width={400}
      >
        <p>Все несохранённые изменения будут потеряны. Продолжить?</p>
      </Modal>
    </>
  );
}

export default ClientsDrawer;