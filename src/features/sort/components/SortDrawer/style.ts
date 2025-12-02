import styled from "styled-components";
import { Modal } from "antd";
export const SortDrawerStyled = styled.div`
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .ant-drawer-title {
    font-size: 25px;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    height: calc(4vh - 110px); 
    justify-content: space-between;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    gap: 12px;

  }

  .ant-input {
    padding: 11px;
  } 

  .circle_outlined{
    color: #52c41a;
  }
  .succes_message{
    background-color: white !important;
  }
  .circle_outlined {
  color: #52c41a !important;
}
  
  `;
  export const CancelSortStyled = styled(Modal)`
  .modal_cont{
      border-radius: 8px;
      padding: 10px 15px;
      color: #fff;
      background-color: var(--color-primary);
      border: none;
  }
  .modal_stop{
      margin-right: 8px;
      border-radius: 8px;
      padding: 10px 15px;
      color: #333;
      background-color: #fff;
      border: 1px solid #393939ff;
  }`