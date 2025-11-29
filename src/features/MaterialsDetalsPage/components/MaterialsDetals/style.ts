import styled from "styled-components";

export const MaterialsDetalsStyled = styled.div`
  .materialsDetals {
    display: flex;
    flex-direction: column;

    .materialsDetals__wrapper {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      button {
        width: 162px;
        height: 32px;
        color: var(--white);
        background-color: var(--color-primary);
        border: none;
        cursor: pointer;

        &:hover {
          background-color: var(--color-primary) !important;
          color: var(--white) !important;
        }
      }
      input {
        width: 362px;
      }
    }
  }
`;
