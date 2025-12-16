import { ErrorStyle } from './style'
import { ProblemIcon } from '@/assets/Icons'

const  ErrorPage = () => {
  return (
    <ErrorStyle>
    <div className='Error'>
       <img src={ProblemIcon} alt="" />
       <h1 className='error_title'>Что-то пошло не так</h1>
       <p className='error_text'>При обработке вашего запроса произошла ошибка. Повторите попытку позже</p>
       <button className='error_btn'>Повторить</button>
    </div>
    </ErrorStyle>
  )
}

export default ErrorPage