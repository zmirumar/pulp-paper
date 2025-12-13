import styled from "styled-components";

export const PasswordStyles = styled.div`
display: flex;
align-items: center;
height: 100vh;
justify-content: center;


.password{
    display: flex;
    flex-direction: column;
    width:100%;
    max-width: 400px;
    gap: 20px;
}

.pasword__btn{
    height: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    gap: 10px;
    color: rgba(22, 119, 255, 1);
}

.pasword__btn button {
    color: rgba(22, 119, 255, 1);
    background-color: white;
    border: none;

}


.password_text{
    font-size: 12px;
    color: rgba(154, 154, 161, 1);
    margin-bottom: 10px;
    width: 100%;
    line-height: 20px;
    
}

.password_h1{
    font-size: 24px;
}
    
`