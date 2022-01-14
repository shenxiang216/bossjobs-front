import { useHistory } from 'react-router-dom'
import * as react from 'react'
import * as api from '../../services/api'
import style from './style.module.css'
import Toast from '../../components/Toast'
import { useEffect } from 'react'
import store from '../../store/store'
export default function Login() {
  const history = useHistory()
  const [username, setUsername] = react.useState<string>()
  const [password, setPassword] = react.useState<string>()

  useEffect(() => {
    if (store.username !== '') history.push('/home')
  }, [history])

  async function login() {
    if (username?.length !== 11) {
      return Toast('手机号码输入错误')
    } else if (password === undefined) {
      return Toast('密码不能为空')
    } else if (password.length < 6) {
      return Toast('密码不能少于6位')
    }
    const result = await api.login(username, password)
    if (result.data.stat === 'OK') {
      if (result.data.data === undefined) {
        const register = await api.login(username, password)
        history.push('/')
        store.setUsername(register.data.data.username)
        store.setAvater(register.data.data.photo)
        store.setNickname(register.data.data.nickname)
        store.setPhoto(register.data.data.photo)
        return Toast('注册成功')
      }
      history.push('/')
      store.setUsername(result.data.data.username)
      store.setAvater(result.data.data.photo)
      store.setNickname(result.data.data.nickname)
      store.setPhoto(result.data.data.photo)
    } else {
      return Toast('密码错误')
    }
  }

  return (
    <react.Fragment>
      <div id="login" className={style.page}>
        <h3 className={style.title}>BOSS直聘</h3>
      </div>
      <main className={style.main_page}>
        <div className={style.ipt_wrap}>
          <i className={`${style.icon_phone} ${style.icon}`}></i>
          <input
            className={`${style.ipt}`}
            placeholder="账号"
            onChange={(value) => {
              setUsername(value.target.value)
            }}
          ></input>
        </div>
        <div className={style.ipt_wrap}>
          <i className={`${style.icon_email} ${style.icon}`}></i>
          <form>
            <input
              className={`${style.ipt}`}
              type="password"
              placeholder="密码"
              autoComplete={'on'}
              onChange={(value) => {
                setPassword(value.target.value)
              }}
            ></input>
          </form>
        </div>
        <button className={style.btn} onClick={() => login()}>
          注册/登录
        </button>
      </main>
    </react.Fragment>
  )
}
