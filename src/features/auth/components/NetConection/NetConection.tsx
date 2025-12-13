import { NoInternetIcon } from '@/assets/Icons'
import { ConectionStyle } from './style'

const NetConection = () => {
  return (
    <ConectionStyle>
    <div className='Conection'>
       <img src={NoInternetIcon} alt="" />
       <h1 className='c_h1'>Нет подключения</h1>
       <p className='c_p'>Подключение к интернету не обнаружено. Проверьте подключение и повторите попытку.</p>
       <button className='c_btn'>Повторить</button>
    </div>
    </ConectionStyle>
  )
}

export default NetConection