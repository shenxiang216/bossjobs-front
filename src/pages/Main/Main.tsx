import { useHistory } from 'react-router-dom'
import * as react from 'react'
import style from './style.module.css'
import HotJobs from '../../components/Main/Hot'
import RecommandJobs from '../../components/Main/RecommandJobs'
import CityModal from '../../components/CityModal'
import store from '../../store/store'
export default function Main() {
  let jobname2 = ''
  const [showCity, setShowCity] = react.useState<boolean>(true)
  const history = useHistory()
  function bodyHidden() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
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
                width="20px"
                src={`/api/file/download/${store.photo}`}
                alt=""
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
            <button className={style.btn_city}>全国</button>
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
              history.push(`/search?全国&query=${jobname2}`)
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
      {CityModal(showCity)}
    </react.Fragment>
  )
}
