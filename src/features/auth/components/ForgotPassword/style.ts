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
    gap: 10px;
}

.pasword__btn{
    height: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    gap: 5px;
    color: blue;
}

.pasword__btn button {
    color: blue;
    background-color: white;
    border: none;

}


.password_text{
    font-size: 13px;
    color: gray;
    margin-bottom: 20px;
    
}
`