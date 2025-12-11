import styled from "styled-components";

export const LoginStyled = styled.div `
display: flex;
align-items: center;
justify-content: center;
width: 100%;
height: 100vh;
    .login{
        max-width: 400px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap:15px;
    }



.login__btn:not(:disabled) {
  background: #1677ff !important;
  color: #fff !important;
}


  .login__remember{
    display: flex;
    justify-content: space-between;
    padding: 0px 10px 0px 10px;
  }


  /* Cheking CSS  */

  .checking{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .checking_btn{
    width: 414px;
    height: 40px;
    background-color: rgba(9, 88, 217, 1);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 400;
  }

  .checking_p{
    width: 414px;
    font-size: 16px;
    text-align: center;
    color: rgba(19, 19, 20, 1);
    margin-bottom: 30px;
  }

  .checking_h1{
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 5px;
    margin-top: 30px;
  }


  /* Conection CSS */

.Conection{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.c_h1{
      font-size: 24px;
    font-weight: 500;
    margin-bottom: 5px;
    margin-top: 30px;
}

.c_p{
      width: 414px;
    font-size: 16px;
    text-align: center;
    color: rgba(140, 140, 140, 1);
    margin-bottom: 30px;
}

.c_btn{
      width: 414px;
    height: 40px;
    background-color: rgba(9, 88, 217, 1);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 400;
}


/* Error CSS */


.Error{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.e_h1{
      font-size: 24px;
    font-weight: 500;
    margin-bottom: 5px;
    margin-top: 30px;
}

.e_p{
    width: 400px;
    font-size: 16px;
    text-align: center;
    color: rgba(140, 140, 140, 1);
    margin-bottom: 30px;
    line-height: 25px;
}

.e_btn{
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