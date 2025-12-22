import { StyledTable } from "./style";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/reset.css";
import { ParametersData } from "@/mockdata/parameters/ParametersData"

const Parameters = () => {
    const navigate = useNavigate();


    const columns = [
        { title: "Наименования", dataIndex: "name" },
    ];

    return (
        <StyledTable>
            <div className="parameters">
                <h1 className="parameters__title">Параметр</h1>

                <Table
                    dataSource={ParametersData}
                    columns={columns}
                    pagination={false}
                    rowClassName="clickable-row"
                    onRow={(record) => ({
                        onClick: () => navigate(`/refs/parameters/${record.key}`)
                    })}
                />
            </div>
        </StyledTable>
    );
};

export default Parameters;