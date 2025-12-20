import styled from "styled-components";

export const CheckPageStyled = styled.div `

  .checkpage{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__btn{
      width: 414px;
      height: 40px;
      background-color: rgba(9, 88, 217, 1);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 400;
    }

    &__text{
      width: 414px;
      font-size: 16px;
      text-align: center;
      color: rgba(19, 19, 20, 1);
      margin-bottom: 30px;
    }

    &__title{
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 5px;
      margin-top: 30px;
    }
  }

 
`