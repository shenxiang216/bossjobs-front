import style from './style.module.css'
import { useHistory } from 'react-router'
import MycollectionItem from '../../components/MycollectionItem/item'
import { useEffect, useState } from 'react'
import * as api from '../../services/api'
interface IInterest {
  title: string
  id: string
}
export default function Mycollection() {
  const history = useHistory()
  const [rows, setRows] = useState<IInterest[]>([])
  useEffect(() => {
    const getData = async function () {
      let result = await api.findInterest()
      if (result.stat === 'OK') {
        setRows(result.rows.interested ? result.rows.interested : [])
      }
    }
    getData()
  }, [])
  async function Del(id: string) {
    await api.deleteInterest(id)
    const newrows = rows.filter((item) => {
      return item.id !== id
    })
    setRows(newrows)
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
          <div className={style.text}>我的收藏</div>
        </div>
        <div className={style.itembox}>
          {rows.map((item, i) => (
            <div>
              <MycollectionItem
                key={i}
                title={item.title}
                id={item.id}
                onClick={() => Del(item.id)}
              ></MycollectionItem>{' '}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
