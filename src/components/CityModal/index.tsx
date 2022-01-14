import React from 'react'
import style from './style.module.css'
import js from '../../assets/data/data.json'
import { useHistory } from 'react-router-dom'

const hotCitys: string[] = [
  '全国',
  '北京',
  '上海',
  '广州',
  '深圳',
  '杭州',
  '天津',
  '西安',
  '苏州',
  '武汉',
  '厦门',
  '长沙',
  '成都',
  '郑州',
  '重庆',
]
const hotKey = '0'

export default function CityModal(status: boolean) {
  const history = useHistory()
  const province = Object.values(js[86])
  const provinceKeys = Object.keys(js[86])
  const country = Object.values(js)
  const [isshow, setIsshow] = React.useState<boolean>(status)
  const [citys, setCitys] = React.useState<string[]>(hotCitys)
  // 数组每一个元素都是一个对象
  // 此对象的第一个元素即用来判断是否是省内的城市
  function bodyShow() {
    document.getElementsByTagName('body')[0].style.overflow = ''
  }
  const [nowCity, setNowCity] = React.useState(Object.keys(js[86])[0])
  function showCity(cityKeys: string) {
    if (cityKeys === hotKey) return '热门城市'
    for (let i = 0; i < provinceKeys.length; i++) {
      if (cityKeys === provinceKeys[i]) {
        return province[i]
      }
    }
  }
  function changeCity(nowCity: string) {
    setNowCity(nowCity)
    if (nowCity === '0') {
      setCitys(hotCitys)
    }
    for (let i = 1; i < country.length; i++) {
      if (Number(Object.keys(country[i])[0]) === Number(nowCity) + 100) {
        if (Object.values(country[i])[0] === '市辖区') {
          for (let j = 0; j < provinceKeys.length; j++) {
            if (nowCity === provinceKeys[j]) {
              setCitys([province[j]])
              return null
            }
          }
        } else {
          setCitys(Object.values(country[i]))
        }
        return null
      }
    }
  }
  let show = style.CityModal + ' '
  if (status !== isshow) {
    show += style.city_show
  }
  return (
    <div className={show}>
      <header className={style.city_head}>
        <div
          className={style.back}
          onClick={() => {
            bodyShow()
            setIsshow(!isshow)
          }}
        ></div>
        选择城市
      </header>
      <main className={style.main_page}>
        <div className={style.city_box}>
          {provinceKeys.map((item, index) => {
            if (item === nowCity) {
              return (
                <div
                  className={`${style.city_text} ${style.selected}`}
                  onClick={() => changeCity(item)}
                  key={index}
                >
                  {showCity(item)}
                </div>
              )
            }
            return (
              <div
                className={style.city_text}
                onClick={() => changeCity(item)}
                key={index}
              >
                {showCity(item)}
              </div>
            )
          })}
        </div>
        <div className={style.city_child}>
          {citys.map((item, index) => {
            return (
              <div
                onClick={() => {
                  setIsshow(!isshow)
                  bodyShow()
                  return history.push('/search?' + item + '&query=')
                }}
                key={index}
              >
                {item}
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
