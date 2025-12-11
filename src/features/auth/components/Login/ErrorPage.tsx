import { LoginStyled } from './style'
import { ProblemIcon } from '@/assets/Icons'

const  ErrorPage = () => {
  return (
    <LoginStyled>
    <div className='Error'>
       <img src={ProblemIcon} alt="" />
       <h1 className='e_h1'>Что-то пошло не так</h1>
       <p className='e_p'>При обработке вашего запроса произошла ошибка. Повторите попытку позже</p>
       <button className='c_btn'>Повторить</button>
    </div>
    </LoginStyled>
  )
}

export default ErrorPage