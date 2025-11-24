import styled from "styled-components";

export const AddButtonStyled = styled.div`
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

  .buttons {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-top: auto;
  }

  .button {
    width: 48%;
    padding: 13px;
    border-radius: 8px;
    font-size: 16px;
    border: none;
    transition: 0.2s ease;
    cursor: pointer;
  }

  .cancel {
    background: #0000000A;
    color: #333;
    border: 1px solid #333;
  }

  .cancel:hover {
    background: #f0f0f0;
  }

  .add {
    background: var(--color-primary);
    color: white;
  }

  .add:hover {
    background: var(--color-primary);
    opacity: 0.9;
  }

  .add:disabled {
    background: #0000000A;
    color: #999;
    cursor: not-allowed;
    border: 1px solid #d9d9d9;
  }

  .ant-input {
    padding: 11px;
  }

  .circle_outlined{
    color: #52c41a;
  }

`;