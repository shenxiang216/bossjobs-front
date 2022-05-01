/*
 * @Author: 赵亚鑫Deep Lane
 * @Date: 2021-08-04 13:56:11
 * @LastEditors: 赵亚鑫Deep Lane
 * @LastEditTime: 2022-04-16 16:19:29
 * @Description:
 */
import { useHistory } from 'react-router-dom'
import * as react from 'react'

import style from './style.module.css'
import HotJobs from '../../components/Main/Hot'
import RecommandJobs from '../../components/Main/RecommandJobs'
import CityModal from '../../components/CityModal'
import store from '../../store/store'
import { useState } from 'react'
export default function Main() {
  let jobname2 = ''
  const [showCity, setShowCity] = react.useState<boolean>(true)
  const history = useHistory()
  function bodyHidden() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  }
  const [cityres, setCityres] = useState<string>('全国')
  const handleCityRes = (city: string) => {
    setCityres(city)
  }
  return (
    <react.Fragment>
      <header className={style.head}>
        <div className={style.banner}>
          <div className={style.login}>
            <div className={style.logo}></div>
            <button
              style={
                store.username !== '' ? { display: 'none' } : { display: '' }
              }
              className={style.btn}
              onClick={() => {
                history.push('/login')
              }}
            >
              登录/注册
            </button>
            <div
              style={
                store.username === '' ? { display: 'none' } : { display: '' }
              }
              className={style.avatar_area}
              onClick={() => history.push('/home')}
            >
              <img
                width='25px'
                src={
                  store.username !== ''
                    ? `/api/file/download/${store.photo}`
                    : ''
                }
                alt='avatar'
                className={style.avatar}
              />
            </div>
          </div>
          <div className={style.title}></div>
        </div>
        <div className={style.img_building}></div>
        <div className={style.search_area}>
          <span
            className={style.span_city}
            onClick={() => {
              bodyHidden()
              setShowCity(!showCity)
            }}
          >
            <button className={style.btn_city}>{cityres}</button>
            <div className={style.icon_right}></div>
          </span>
          <input
            className={style.ipt_search}
            onChange={(value) => {
              jobname2 = value.target.value
            }}
          ></input>
          <button
            className={style.btn_search}
            onClick={() => {
              history.push(`/search?${cityres}&query=${jobname2}`)
            }}
          >
            搜索
          </button>
        </div>
      </header>
      <main>
        <div className={style.main_page}>{HotJobs()}</div>
        {RecommandJobs()}
      </main>
      {CityModal(showCity, handleCityRes)}
    </react.Fragment>
  )
}
