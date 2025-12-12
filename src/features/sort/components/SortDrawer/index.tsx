import { useState, useEffect } from 'react'
import {  SortDrawerStyled } from './style'
import { Input, Modal, notification } from 'antd'
import { CheckCircleFilled } from '@ant-design/icons'
import { Drawer } from '@/components/ui/Drawer/Drawer'

interface SortData {
  id: number; 
  name: string;
  sort: string;
  sections: string;
}

interface AddButtonProps {
  showDrawer: boolean;
  handleCancelDrawer: () => void;
  editData?: SortData | null;
  mode?: 'create' | 'edit'; 
}

const SortDrawer: React.FC<AddButtonProps> = ({ 
  showDrawer, 
  handleCancelDrawer, 
  editData = null,
  mode = 'create'
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [name, setName] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [initialName, setInitialName] = useState<string>("")
  const [initialCategory, setInitialCategory] = useState<string>("")

  const hasChanges = mode === 'edit' 
    ? (name !== initialName || category !== initialCategory)
    : (name.trim() !== "" || category.trim() !== "")

  const isValid = name.trim() !== "" && category.trim() !== "" && hasChanges

  const resetForm = () => {
    setName("")
    setCategory("")
    setInitialName("")
    setInitialCategory("")
  }

  useEffect(() => {
    if (mode === 'edit' && editData && showDrawer) {
      const initialNameValue = editData.sort || ""
      const initialCategoryValue = editData.sections || ""
      setName(initialNameValue)
      setCategory(initialCategoryValue)
      setInitialName(initialNameValue)
      setInitialCategory(initialCategoryValue)
    } else if (mode === 'create' && showDrawer) {
      resetForm()
    }
  }, [editData, mode, showDrawer])

  useEffect(() => {
    if (!showDrawer) {
      const timer = setTimeout(resetForm, 300)
      return () => clearTimeout(timer)
    }
  }, [showDrawer])

  const handleCancel = () => {
    if (hasChanges) {
      setIsModalOpen(true)
    } else {
      handleCancelDrawer()
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

  const handleSubmit = () => {
    if (!isValid || isSubmitting) return

    setIsSubmitting(true)

    setTimeout(() => {
      notification.success({
        message: mode === 'edit' ? 'Изменения сохранены' : 'Товар добавлен',
        description: `${mode === 'edit' ? 'Ваши изменения были успешно применены' : 'Новый товар успешно добавлен в список'}`,
        placement: 'topRight',
        icon: <CheckCircleFilled  className='circle_oulined' />,
        duration: 3,
        className: 'succes_message'
      })

      setIsSubmitting(false)
      resetForm()
      handleCancelDrawer()
    }, 500)
  }

  return (
    <>
      <Drawer
        open={showDrawer}
        title={mode === 'edit' ? "Редактировать" : "Добавить новый"}
        onClose={handleCancel}
        showFooter={true}
        cancelText="Отменить"
        confirmText={mode === 'edit' ? "Сохранить" : "Добавить"}
        onCancel={handleCancel}
        onConfirm={handleSubmit}
        confirmDisabled={!isValid || isSubmitting}
        closeButtonPosition="end" 
      >
        <SortDrawerStyled>
          <div className="wrapper">
            <h2>Сорт</h2>
            <div className="inputs">
              <Input
                placeholder='Названия сортов'
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
              />
              <Input
                placeholder='Разделы'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </SortDrawerStyled>
      </Drawer>

      {isModalOpen && (
        <Modal
          open={isModalOpen}
          centered
          title='Несохранённые изменения'
          onOk={handleConfirmDiscard}
          onCancel={handleCancelModal}
          okText="Продолжить"
          cancelText="Отменить"
          width={400}
        >
          Все несохранённые изменения будут потеряны. Продолжить?
        </Modal>
      )}
    </>
  )
}

export default SortDrawer