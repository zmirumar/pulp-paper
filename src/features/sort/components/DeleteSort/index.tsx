import { DeleteOutlined } from '@ant-design/icons'
  import { useState } from "react"
import { DeleteSortStyled } from './style';

function DeleteSort() {
      const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <div>
        <DeleteOutlined
            onClick={() => setOpenModal(true)}
            className="sort_render_items"
          />
      <DeleteSortStyled
        open={openModal}
        onCancel={() => setOpenModal(false)}
        title="Удалить?"
        children={
          'Вы уверены, что хотите удалить этот элемент?'
        }
        footer={[
          <button key="cancel" className="modal_stop" onClick={() => setOpenModal(false)}>
            Отмена
          </button>,
          <button key="submit" className="modal_cont" onClick={() => setOpenModal(false)}>
            Удалить
          </button>,
        ]}
      />
    </div>
  )
}

export default DeleteSort