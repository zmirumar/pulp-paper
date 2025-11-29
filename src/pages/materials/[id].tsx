import { useParams } from "react-router-dom";
import MaterialsDetels from "@/features/MaterialsDetalsPage/components/MaterialsDetals";

const MaterialDetailsPage = () => {
  const { id } = useParams();

  return (
    <div>
      <MaterialsDetels />
    </div>
  );
};

export default MaterialDetailsPage;
