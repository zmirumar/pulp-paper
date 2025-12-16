import styled from "styled-components";

export const VerifyStyles = styled.div`

.verify{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    gap: 10px   
}


.verify_box{
    width: 48px;
    height: 48px;
}

.verify_boxes{
    display: flex;
    margin-top: 30px;
    align-items: center;
    justify-content: center;
    gap: 10px;
    text-align: center;
}

.verify_next{
    display: flex;
    align-items: center;
    gap:20px ;
    justify-content: center;
    margin: 20px;
}

.verify_boxes {
  display: flex;
  gap: 20px;
  margin-top: 25px;
}

.verify_box {
  width: 40px;
  height: 40px;
  border: none;
  border-bottom: 2px solid #d3d3d3;
  outline: none;
  background: transparent;
  text-align: center;
  font-size: 26px;
  transition: 0.2s ease;
  padding: 0;
}

.verify_box:focus {
  border-bottom: 2px solid #3b82f6; /* Ko‘k chiziq = rasmga mos */
}

.verify_box::-webkit-inner-spin-button,
.verify_box::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}


.confirm{
    width: 160px;
    height: 40px;
}

.verify-paragrap{
    color: gray;
}
`
