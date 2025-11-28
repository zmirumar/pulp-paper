import { useState, useEffect } from 'react'
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


  useEffect(() => {
    if (mode === 'edit' && editData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(editData.sort || "")
      setCategory(editData.sections || "")
    } else {
      setName("")
      setCategory("")
    }
  }, [editData, mode, showDrawer])


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


  const handleSubmit = () => {
    if (mode === 'edit') {
      notification.success({
        message: 'Успешно обновлено',
        description: `Сорт "${name}" был успешно обновлен`,
        placement: 'topRight',
        icon: <CheckCircleOutlined className='circle_oulined' />,
        duration: 3,
      })
    } else {
      notification.success({
        message: 'Успешно добавлено',
        description: `Сорт "${name}" был успешно добавлен`,
        placement: 'topRight',
        icon: <CheckCircleOutlined className='circle_oulined' />,
        duration: 3,
      })
    }


    resetForm()
    handleCancelDrawer() 
  }


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
        confirmDisabled={!isValid}
      >
        <SortDrawerStyled>
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
        </SortDrawerStyled>
      </Drawer>

        {isModalOpen && (
        <CancelSortStyled
          open={isModalOpen}
          title='Несохранённые изменения'
                  children={
          'Все несохранённые изменения будут потеряны.  Продолжить?'
        }
          footer={[
          <button key="cancel" className="modal_stop" onClick={handleCancelModal}>
            Отменить
          </button>,
          <button key="submit" className="modal_cont" onClick={handleConfirmDiscard}>
            Продолжить
          </button>
        ]}
        />
      )}



    </>
  )
}


export default SortDrawer