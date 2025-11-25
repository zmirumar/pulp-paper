/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import DeleteSort from "../DeleteSort"
import EditSort from "../EditSort"
import { useMemo, useEffect } from "react"

interface SortTableProps {
  data: any[];
  searchText: string;
  currentPage: number;
  pageSize: number;
  onDataFiltered: (filteredLength: number) => void;
}

function SortTable({ data, searchText, currentPage, pageSize, onDataFiltered }: SortTableProps) {
  const SortColumns: ColumnsType = [
    {
      title: "Наименование",
      dataIndex: "name",
    },
    {
      title: "Названия сортов",
      dataIndex: "sort",
      sorter: (a, b) => a.sort.localeCompare(b.sort),
    },
    {
      title: "Разделы",
      dataIndex: "sections",
    },
    {
      title: "",
      render: (_, record) => (
        <div className="sort_columns_render">
          <EditSort record={record} />
          <DeleteSort/>
        </div>
      ),
    },
  ];

  const filteredData = useMemo(() => {
    if (!searchText.trim()) {
      return data;
    }

    const searchLower = searchText.toLowerCase().trim();
    
    return data.filter((item) => {
      return (
        item.name?.toLowerCase().includes(searchLower) ||
        item.sort?.toLowerCase().includes(searchLower) ||
        item.sections?.toLowerCase().includes(searchLower)
      );
    });
  }, [data, searchText]);

  useEffect(() => {
    onDataFiltered(filteredData.length);
  }, [filteredData.length, onDataFiltered]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, pageSize]);

  return (
    <Table
      columns={SortColumns}
      dataSource={paginatedData}
      rowKey="id"
      showSorterTooltip={{ target: "sorter-icon" }}
      pagination={false}
    />
  );
}

export default SortTable;