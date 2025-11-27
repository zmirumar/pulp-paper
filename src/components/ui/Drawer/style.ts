import styled from "styled-components";

export const DrawerFooterStyled = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;

  .button {
    width: 50%;
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
  .cancel:disabled{
        background: #0000000A;
    color: #999;
    cursor: not-allowed;
    border: 1px solid #d9d9d9;
  }
`;