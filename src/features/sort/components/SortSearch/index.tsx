import { Input } from "antd"
import { PlusOutlined, SearchOutlined } from "@ant-design/icons"
import { useState } from "react"

interface SortSearchProps {
  onSearch: (searchText: string) => void;
  onAddClick: () => void;
}

function SortSearch({ onSearch, onAddClick }: SortSearchProps) {
  const [searchText, setSearchText] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value); 
  };

  return (
    <div className="filter_add">
      <Input 
        placeholder="Поиск" 
        suffix={<SearchOutlined />}
        value={searchText}
        onChange={handleSearchChange}
        allowClear
      />
      <button className='add_button' onClick={onAddClick}>
        <PlusOutlined /> Добавить новый
      </button>
    </div>
  );
}

export default SortSearch;