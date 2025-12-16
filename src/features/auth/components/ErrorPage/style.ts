import styled from "styled-components";

export const ErrorStyle = styled.div `

.Error{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.error_title{
      font-size: 24px;
    font-weight: 500;
    margin-bottom: 5px;
    margin-top: 30px;
}

.error_text{
    width: 400px;
    font-size: 16px;
    text-align: center;
    color: rgba(140, 140, 140, 1);
    margin-bottom: 30px;
    line-height: 25px;
}

.error_btn{
      width: 414px;
    height: 40px;
    background-color: rgba(9, 88, 217, 1);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 400;
}
`;

