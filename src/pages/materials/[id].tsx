import { useParams } from "react-router-dom";
import MaterialsDetail from "@/features/materials/components/MaterialsDetail";

const MaterialDetailsPage = () => {
  const { id } = useParams();

  return (
    <div>
      <MaterialsDetail />
    </div>
  );
};

export default MaterialDetailsPage;
