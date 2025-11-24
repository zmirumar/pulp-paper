import { useState } from 'react'
import { AddButtonStyled } from './style'
import { Input, notification } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import CancelSort from '../CancelSort'
import { Drawer } from '@/components/ui/Drawer/Drawer' 

interface AddButtonProps {
  showDrawer: boolean;
  handleCancelDrawer: () => void;
}

const SortDrawer: React.FC<AddButtonProps> = ({ showDrawer, handleCancelDrawer }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [name, setName] = useState<string>("")
  const [category, setCategory] = useState<string>("")

  const isValid = name.trim() !== "" && category.trim() !== ""
  const hasUnsavedChanges = name.trim() !== "" || category.trim() !== ""

  const resetForm = () => {
    setName("")
    setCategory("")
  }

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      setIsModalOpen(true)
    } else {
      handleCancelDrawer()
      resetForm()
    }
  }

  const handleCancelModal = () => {
    setIsModalOpen(false)
  }

  const handleConfirmDiscard = () => {
    setIsModalOpen(false)
    resetForm()
    handleCancelDrawer()
  }

  const addSort = () => {
    notification.success({
      message: 'Успешно добавлено',
      description: `Сорт "${name}" был успешно добавлен`,
      placement: 'topRight',
      icon: <CheckCircleOutlined className='circle_oulined' />,
      duration: 3,
    })

    resetForm()
    handleCancelDrawer() 
  }

  return (
    <>
      <Drawer
        open={showDrawer}
        title="Добавить новый"
        closable={true}
        onClose={handleCancel}
        width={525}
        showFooter={true}
        cancelText="Отменить"
        confirmText="Добавить"
        onCancel={handleCancel}
        onConfirm={addSort}
        confirmDisabled={!isValid}
        maskClosable={false}
      >
        <AddButtonStyled>
          <div className="wrapper">
            <h2>Сорт</h2>
            <div className="inputs">
              <Input
                placeholder='Названия сортов'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder='Разделы'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
          </div>
        </AddButtonStyled>
      </Drawer>
      
      {isModalOpen && (
        <CancelSort
          isOpen={isModalOpen}
          onConfirm={handleConfirmDiscard}
          onCancel={handleCancelModal}
          title="Несохранённые изменения"
          description="Все несохранённые изменения будут потеряны. Продолжить?"
          cancelText="Отменить"
          confirmText="Продолжить"
        />
      )}
    </>
  )
}

export default SortDrawer