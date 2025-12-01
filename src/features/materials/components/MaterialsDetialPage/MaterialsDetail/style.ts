import styled from "styled-components";

export const MaterialsDetialStyled = styled.div`
  .materialsDetail {
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 20px;
      cursor: pointer;
    }

    .materialsDetail__wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;

      .detial__input {
        flex: 1;
        max-width: 300px;
        padding: 7px 10px;
        border: 1px solid #ddd;
        border-radius: 10px;
      }

      button {
        width: 162px;
        height: 32px;
        color: #fff;
        background-color: #1890ff;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
          background-color: #40a9ff;
          color: #fff;
        }
      }
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
