import { CancelSortStyled } from "./style"

interface CancelSortProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;}
  
 function CancelSort({
  isOpen,
  onConfirm,
  onCancel,
}: CancelSortProps) {

  return (
    <div>
      <CancelSortStyled
        open={isOpen}
        onCancel={onCancel}
        title='Несохранённые изменения'
        children={
          'Все несохранённые изменения будут потеряны.  Продолжить?'
        }
        footer={[
          <button key="cancel" className="modal_stop" onClick={onCancel}>
            Отменить
          </button>,
          <button key="submit" className="modal_cont" onClick={onConfirm}>
            Продолжить
          </button>
        ]}
      >
      </CancelSortStyled>
    </div>
  )
}

export default CancelSort