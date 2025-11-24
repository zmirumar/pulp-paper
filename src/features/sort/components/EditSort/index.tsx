import { EditOutlined } from "@ant-design/icons"
  import { useState } from "react"
import AddButton from "../SortDrawer";


function EditSort() {
      const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  return (
    <div>
     <EditOutlined className="sort_render_items" onClick={() => setOpenDrawer(true)}/>
    <AddButton showDrawer={openDrawer}  handleCancelDrawer={() => setOpenDrawer(false)}/>
    </div>
  )
}

export default EditSort 
