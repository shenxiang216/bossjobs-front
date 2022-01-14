import style from './style.module.css'
import { useHistory } from 'react-router'
import Checkbox from '../../components/Checkbox'
import { useState, useRef } from 'react'
import axios from 'axios'

export default function Setting() {
  const history = useHistory()
  const [select, setSelect] = useState<boolean>(true)
  const [sex, setSex] = useState<boolean>(false)
  function onChange(sexy: boolean) {
    if (sexy === sex) setSelect(!select)
  }
  let fileref = useRef<HTMLInputElement>(null)
  const [src, setSrc] = useState<string>('')
  async function upload(e: any) {
    const file = e.target.files[0]
    console.log(file)
    let data = new FormData()
    data.append('file', file)
    console.log(data.get('file'))
    const res = await axios.post('/api/file/upload', data)
    setSrc(`url(/api/file/download/${res.data.data})`)
  }
  const btn = async () => {
    if (fileref.current !== null) {
      fileref.current.click()
    }
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
          <div className={style.text}>个人设置</div>
        </div>

        <div className={style.box}>
          <div className={style.item}>
            <div className={style.item_text}>姓名</div>
            <input
              className={style.input}
              type="text"
              placeholder="请填写姓名"
            ></input>
          </div>

          <div className={style.item}>
            <div className={style.item_text}>职位</div>
            <input
              className={style.input}
              type="text"
              placeholder="请填写职位"
            ></input>
          </div>

          <div className={style.item}>
            <div className={style.item_sextext}>性别</div>

            <Checkbox
              value={select}
              className={style.CartCheckbox}
              onChange={() => {
                onChange(true)
                setSex(false)
              }}
            />
            <div className={style.sex_text}>先生</div>

            <Checkbox
              value={!select}
              className={style.CartCheckbox}
              onChange={() => {
                onChange(false)
                setSex(true)
              }}
            />
            <div className={style.sex_text}>女士</div>
          </div>

          <div className={style.item_avator}>
            <div className={style.avator_text}>头像</div>
            <div className={style.upload}>
              <div className={style.wrap} style={{ backgroundImage: `${src}` }}>
                <div onClick={btn} className={style.mask}>
                  <i className="iconfont icon-camera"></i>
                </div>
                <input
                  onChange={upload}
                  ref={fileref}
                  type="file"
                  className={style.uploadbtn}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={style.exit}>
          <button
            className={style.btn}
            onClick={() => {
              history.push('/home')
            }}
          >
            保存修改
          </button>
        </div>
      </div>
    </div>
  )
}
