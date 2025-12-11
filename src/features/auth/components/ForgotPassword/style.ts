import styled from "styled-components";

export const PasswordStyles = styled.div`
 @import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;800;900&display=swap);
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
    font-size: 13px;
    color: rgba(154, 154, 161, 1);
    margin-bottom: 10px;
    width: 430px;
    line-height: 20px;
    
}

.password_h1{
    font-size: 24px;
     font-family: 'Inter', sans-serif;

}
    
`