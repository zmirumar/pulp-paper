import styled from "styled-components";

export const DrawerStyled = styled.div`
  .buttons {
    display: flex;
    justify-content: space-between;
    gap: 12px;

    .button {
      flex: 1;
      padding: 13px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;

      &.cancel {
        background: #0000000a;
        color: #333;
        border: 1px solid #d9d9d9;

        &:hover:not(:disabled) {
          background: #f0f0f0;
          border-color: #999;
        }

        &:disabled {
          background: #f5f5f5;
          color: #bfbfbf;
          border-color: #d9d9d9;
          cursor: not-allowed;
        }
      }

      &.add {
        background: var(--color-primary);
        color: white;

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
  }
`;