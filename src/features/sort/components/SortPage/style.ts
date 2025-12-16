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
    .ant-pagination{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 25px;
      background-color: #fff;
      padding: 10px 40px;
      border-radius: 8px;
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
  .add_button:hover{
    background:  var(--color-primary) !important;
    color: white!important;
    padding: 10px 16px!important;
    border-radius: 6px!important;
    border: none!important;
    font-size: 15px!important;
    display: flex!important;
    align-items: center!important;
    gap: 6px!important;
    transition: 0.2s!important;
    cursor: pointer!important;
  }

`