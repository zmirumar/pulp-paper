import styled from "styled-components";

export const MaterialsStyled = styled.div`
  .materials {
    display: flex;
    flex-direction: column;
  }

  .materials__site {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .materials__input {
      width: 364px;
      padding: 7px;
      border: 1px solid #ddd;
      border-radius: 10px;
    }

    button {
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
  }

  .slide-in-left {
    transform: translateX(-100%);
    animation: slideInLeft 0.5s forwards;
  }

  .slide-in-right {
    transform: translateX(100%);
    animation: slideInRight 0.5s forwards;
  }

  @keyframes slideInLeft {
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    to {
      transform: translateX(0);
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
