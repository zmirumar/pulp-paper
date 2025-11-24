import { CancelSortStyled } from "./style"

interface CancelSortProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description: string;
  cancelText: string;
  confirmText: string;
  zIndex?: number;
}

function CancelSort({
  isOpen,
  onConfirm,
  onCancel,
  title,
  description,
  cancelText,
  confirmText,
  zIndex = 3000,
}: CancelSortProps) {

  return (
    <div>
      <CancelSortStyled
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isOpen}
        onCancel={onCancel}
        zIndex={zIndex}
        getContainer={false}
        footer={[
          <button key="cancel" className="modal_stop" onClick={onCancel}>
            {cancelText}
          </button>,
          <button key="submit" className="modal_cont" onClick={onConfirm}>
            {confirmText}
          </button>,
        ]}
      >
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </CancelSortStyled>
    </div>
  )
}

export default CancelSort