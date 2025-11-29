import { useState, useEffect, useCallback } from 'react'
import { CancelSortStyled, SortDrawerStyled } from './style'
import { Input, notification } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
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

  const isValid = name.trim() !== "" && category.trim() !== ""
  const hasUnsavedChanges = name.trim() !== "" || category.trim() !== ""

  const resetForm = useCallback(() => {
    setName("")
    setCategory("")
  }, [])

  useEffect(() => {
    if (mode === 'edit' && editData && showDrawer) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(editData.sort || "")
      setCategory(editData.sections || "")
    } else if (mode === 'create' && showDrawer) {
      resetForm()
    }
  }, [editData, mode, showDrawer, resetForm])

  useEffect(() => {
    if (!showDrawer) {
      const timer = setTimeout(resetForm, 300)
      return () => clearTimeout(timer)
    }
  }, [showDrawer, resetForm])

  const handleCancel = useCallback(() => {
    if (hasUnsavedChanges) {
      setIsModalOpen(true)
    } else {
      handleCancelDrawer()
    }
  }, [hasUnsavedChanges, handleCancelDrawer])

  const handleCancelModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const handleConfirmDiscard = useCallback(() => {
    setIsModalOpen(false)
    resetForm()
    handleCancelDrawer()
  }, [resetForm, handleCancelDrawer])

  const handleSubmit = useCallback(() => {
    if (!isValid || isSubmitting) return

    setIsSubmitting(true)

    setTimeout(() => {
      notification.success({
        message: mode === 'edit' ? 'Успешно обновлено' : 'Успешно добавлено',
        description: `Сорт "${name}" был успешно ${mode === 'edit' ? 'обновлен' : 'добавлен'}`,
        placement: 'topRight',
        icon: <CheckCircleOutlined className='circle_oulined' />,
        duration: 3,
      })

      setIsSubmitting(false)
      resetForm()
      handleCancelDrawer()
    }, 500)
  }, [isValid, isSubmitting, mode, name, resetForm, handleCancelDrawer])

  return (
    <>
      <Drawer
        open={showDrawer}
        title={mode === 'edit' ? "Редактировать" : "Добавить новый"}
        closable={true}
        onClose={handleCancel}
        showFooter={true}
        cancelText="Отменить"
        confirmText={mode === 'edit' ? "Сохранить" : "Добавить"}
        onCancel={handleCancel}
        onConfirm={handleSubmit}
        confirmDisabled={!isValid || isSubmitting}
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
        <CancelSortStyled
          open={isModalOpen}
          title='Несохранённые изменения'
          footer={[
            <button key="cancel" className="modal_stop" onClick={handleCancelModal}>
              Отмена
            </button>,
            <button key="submit" className="modal_cont" onClick={handleConfirmDiscard}>
              Продолжить
            </button>
          ]}
        >
          Все несохранённые изменения будут потеряны. Продолжить?
        </CancelSortStyled>
      )}
    </>
  )
}

export default SortDrawer