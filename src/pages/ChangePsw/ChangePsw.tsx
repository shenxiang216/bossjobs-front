import style from './style.module.css'
import { useHistory } from 'react-router'
import react from 'react'
import Toast from '../../components/Toast'
import * as api from '../../services/api'

export default function ChangePsw() {
  const [oldpassword, setOldpassword] = react.useState<string>('')
  const [newpassword, setNewpassword] = react.useState<string>('')
  const [againpassword, setAgainpassword] = react.useState<string>('')
  const history = useHistory()

  async function Changepsw(oldpsw: string, newpsw: string, againpsw: string) {
    if (newpsw.length < 6) return Toast('新密码至少6位！')
    else if (oldpsw === newpsw) return Toast('新旧密码不能相同！')
    else if (newpsw !== againpsw) return Toast('确认密码不正确！')

    await api.changePassword(oldpsw, newpsw)
    Toast('密码修改成功')
    history.push('/home')
  }

  return (
    <div className={style.bg}>
      <div className={style.header}>
        <div className={style.title}>
          <svg
            className={style.icon_back}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1038"
            width="20"
            height="30"
            onClick={() => {
              history.push('/home')
            }}
          >
            <path
              d="M510.41796875 903.20117188c-8.96484375 0-18.01757813-3.42773438-24.87304688-10.28320313L128.97265625 536.2578125c-6.59179688-6.59179688-10.28320313-15.55664063-10.28320313-24.87304688s3.69140625-18.28125 10.28320313-24.87304687L485.54492187 129.93945312c13.7109375-13.7109375 35.94726563-13.7109375 49.74609376 1e-8 13.7109375 13.7109375 13.7109375 35.94726563 0 49.74609375L203.50390625 511.38476562l331.69921875 331.69921876c13.7109375 13.7109375 13.7109375 35.94726563 0 49.74609374-6.76757813 6.94335938-15.8203125 10.37109375-24.78515625 10.37109375z"
              p-id="1039"
            ></path>
          </svg>
          <div className={style.text}>修改密码</div>
        </div>

        <div className={style.box}>
          <div className={style.item}>
            <div className={style.item_text}>原密码</div>
            <input
              className={style.input}
              type="password"
              placeholder="请填写原密码"
              onChange={(oldpsw) => {
                setOldpassword(oldpsw.target.value)
              }}
            ></input>
          </div>

          <div className={style.item}>
            <div className={style.item_text}>新密码</div>
            <input
              className={style.input}
              type="password"
              placeholder="请填写新密码"
              onChange={(newpsw) => {
                setNewpassword(newpsw.target.value)
              }}
            ></input>
          </div>

          <div className={style.item}>
            <div className={style.item_text}>确认密码</div>
            <input
              className={style.input1}
              type="password"
              placeholder="请重复输入密码"
              onChange={(againpsw) => {
                setAgainpassword(againpsw.target.value)
              }}
            ></input>
          </div>
        </div>

        <div className={style.exit}>
          <button
            className={style.btn}
            onClick={() => Changepsw(oldpassword, newpassword, againpassword)}
          >
            保存修改
          </button>
        </div>
      </div>
    </div>
  )
}
