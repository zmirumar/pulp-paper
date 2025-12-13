import { Drawer } from "@/components/ui";
import styled from "styled-components";

export const MaterialsStyled = styled.div`
  .materials {
    display: flex;
    flex-direction: column;
  }

  h1 {
    margin-bottom: 20px;
    font-weight: 600;
    font-size: 24px;
  }

  .materials__site {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .materials__button {
      width: 240px;
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

    .materials__input {
      width: 364px;
      padding: 7px;
      border: 1px solid #d9d9d9 !important;
      border-radius: 10px;
    }

    .ant-input:focus::placeholder {
      color: transparent !important;
    }
  }

  .not-found {
    text-align: center;
    margin-top: 50px;

    h2 {
      font-size: 24px;
      margin-bottom: 10px;
    }

    p {
      font-size: 16px;
      color: #555;
    }
  }
`;

export const MaterialsDrawerStyled = styled(Drawer)`
  .drawer {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .info-notification {
    background-color: #ffffff !important;
    color: red;
  }

  .drawer__input {
    height: 40px;
  }

  .ant-input:focus::placeholder {
    color: transparent !important;
  }

  .drawer__text {
    font-weight: 400;
    font-size: 14;
  }
`;
