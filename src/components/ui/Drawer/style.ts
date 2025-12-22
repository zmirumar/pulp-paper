import styled from "styled-components";

export const DrawerStyled = styled.div`
  .buttons_wrapper {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 10px;



      .cancel_button {
        background: #0000000a;
        color: #333;
        border: 1px solid #d9d9d9;
        padding: 20px 40px !important;

        &:hover:not(:disabled) {
          background: #fff;
          border-color: #999;
          color: var(--color-primary);
          padding: 20px;
        }

        &:disabled {
          background: #f5f5f5;
          color: #bfbfbf;
          border-color: #d9d9d9;
          cursor: not-allowed;
        }
      }

      .confirm_button {
        color: white;
                padding: 20px 40px !important;

        &:hover:not(:disabled) {
          opacity: 0.85;
        }

        &:disabled {
          background: #f5f5f5;
          color: #bfbfbf;
          cursor: not-allowed;
        }
      }
    }
  
  
`;