import { CheckingIcon } from '@/assets/Icons'
import { CheckPageStyled } from './style';

const CheckPage = () => {
  return (
    <CheckPageStyled>
    <div className='checkpage'>
        <img src={CheckingIcon} alt="" />
        <h1 className='checkpage__title'>Успешно</h1>
        <p className='checkpage__text'>Ваш запрос отправлен администратору, вы скоро получите новый пароль.</p>
        <button className='checkpage__btn'>Вернуться назад</button>
    </div>
    </CheckPageStyled>
  )
}

export default CheckPage;