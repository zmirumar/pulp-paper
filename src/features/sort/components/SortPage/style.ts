import styled from "styled-components";

export const SortStyled = styled.div`


h1{
  margin-top: 20px;
  margin-bottom: 20px;
}
.filter_add{
  display:flex;
  align-items: center;
  justify-content: space-between;
    margin-bottom: 20px;
}
.ant-input-affix-wrapper{
  width: 400px;
  height: 40px;
}
    .sort_pagination{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 25px;
      background-color: #fff;
      padding: 10px 40px;
    }
    .sort_columns_render{
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
    .sort_render_items{
      cursor: pointer;
      color: #00000073;
    }

  .add_button {
    background:  var(--color-primary);
    color: white;
    padding: 10px 16px;
    border-radius: 6px;
    border: none;
    font-size: 15px;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: 0.2s;
    cursor: pointer;
  }
 `