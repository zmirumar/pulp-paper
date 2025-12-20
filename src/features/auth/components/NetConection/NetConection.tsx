import { NoInternetIcon } from '@/assets/Icons'
import { ConectionStyle } from './style'

const NetConection = () => {
  return (
    <ConectionStyle>
    <div className='Conection'>
       <img src={NoInternetIcon} alt="" />
       <h1 className='checking_title'>Нет подключения</h1>
       <p className='checking_paragraph'>Подключение к интернету не обнаружено. Проверьте подключение и повторите попытку.</p>
       <button className='checking_btn'>Повторить</button>
    </div>
    </ConectionStyle>
  )
}

export default NetConection