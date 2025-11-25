/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditOutlined } from "@ant-design/icons"
import { useState } from "react"
import SortDrawer from "../SortDrawer";

interface EditSortProps {
  record: any; // The row data from the table
}

function EditSort({ record }: EditSortProps) {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  return (
    <div>
      <EditOutlined 
        className="sort_render_items" 
        onClick={() => setOpenDrawer(true)}
      />
      <SortDrawer 
        showDrawer={openDrawer}  
        handleCancelDrawer={() => setOpenDrawer(false)}
        editData={record}
        mode="edit"
      />
    </div>
  )
}

export default EditSort