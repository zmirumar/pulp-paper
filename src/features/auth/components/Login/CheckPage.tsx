import { CheckingIcon } from '@/assets/Icons'
import { LoginStyled } from './style'


const CheckPage = () => {
  return (
    <LoginStyled>
    <div className='checking'>
        <img src={CheckingIcon} alt="" />
        <h1 className='checking_h1'>Успешно</h1>
        <p className='checking_p'>Ваш запрос отправлен администратору, вы скоро получите новый пароль.</p>
        <button className='checking_btn'>Вернуться назад</button>
    </div>
    </LoginStyled>
  )
}

export default CheckPage;