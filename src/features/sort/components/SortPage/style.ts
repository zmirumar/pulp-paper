import styled from "styled-components";

export const SortStyled = styled.div`
  h1 {
    margin: 20px 0;
  }

  .filter_add {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .ant-input-affix-wrapper {
    width: 400px;
    height: 40px;
  }

  .ant-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
    background-color: #fff;   
    padding: 10px 40px;
    border-radius: 8px;
  }

  .sort_columns_render {
    display: flex;
    justify-content: flex-end;
    gap: 12px;

    .sort_render_items {
      cursor: pointer;
      color: #807979ff;
    }
  }
`;
