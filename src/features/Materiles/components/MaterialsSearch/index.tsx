import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { MaterialsStyled } from "../MaterialsPage/style";

interface MaterialsSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const MaterialsSearch = ({ value, onChange }: MaterialsSearchProps) => {
  return (
    <MaterialsStyled>
      <Input
        placeholder="Поиск"
        suffix={<SearchOutlined />}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="materiles_input"
      />
    </MaterialsStyled>
  );
};

export default MaterialsSearch;
