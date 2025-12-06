import styled from "styled-components";
export const SortDrawerStyled = styled.div`
  h2 {
    font-size: 22px;
    font-weight: lighter;
    margin-bottom: 10px;
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
