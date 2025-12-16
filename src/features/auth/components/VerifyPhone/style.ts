import styled from "styled-components";

export const VerifyStyles = styled.div`

.verify{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  gap: 10px

  &__box{
    width: 48px;
    height: 48px;
  }

  &__boxes{
      display: flex;
      margin-top: 30px;
      align-items: center;
      justify-content: center;
      gap: 10px;
      text-align: center;
  }

  &__next{
      display: flex;
      align-items: center;
      gap:20px ;
      justify-content: center;
      margin: 20px;
  }

  &__boxes {
    display: flex;
    gap: 20px;
    margin-top: 25px;
  }

  &__box {
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

  &__box:focus {
    border-bottom: 2px solid #3b82f6; /* Ko‘k chiziq = rasmga mos */
  }

  &__box::-webkit-inner-spin-button,
  &__box::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }


  &__confirm{
      width: 160px;
      height: 40px;
  }

  &__paragrap{
      color: gray;
  }
}

`
