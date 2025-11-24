import { DeleteOutlined } from '@ant-design/icons'
  import CancelSort from "../CancelSort"
  import { useState } from "react"

function DeleteSort() {
      const [openModal, setOpenModal] = useState<boolean>(false);
    
  return (
    <div>
        <DeleteOutlined
            onClick={() => setOpenModal(true)}
            className="sort_render_items"
          />
      <CancelSort
        isOpen={openModal}
        onCancel={() => setOpenModal(false)}
        onConfirm={() => {
          setOpenModal(false);
        }}
        title="Удалить?"
        description="Вы уверены, что хотите удалить этот элемент?"
        cancelText="Отмена"
        confirmText="Удалить"
      />
    </div>
  )
}

export default DeleteSort
