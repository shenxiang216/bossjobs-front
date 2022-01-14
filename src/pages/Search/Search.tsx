import { Link, useHistory, useLocation } from 'react-router-dom'
import Job from '../../components/Search/item'
import * as api from '../../services/api'
import style from './style.module.css'
import CityModal from '../../components/CityModal'
import { useEffect, useState } from 'react'
import { IJobs, salary } from '../../types'
import store from '../../store/store'

// CityModal 滚动穿透
let isDo1 = true
let noMore1: boolean = true
let array1: IJobs[] = []
export default function Search() {
  const history = useHistory()
  const [rowNull, setRowNull] = useState<boolean>(false)
  const [havemore, setHavemore] = useState<boolean>(true)
  const location = useLocation()
  let City = decodeURI(
    location.search.substring(1, location.search.lastIndexOf('&'))
  )
  let jobname1 = decodeURI(
    location.search.substring(
      location.search.lastIndexOf('=') + 1,
      location.search.length
    )
  ) //相当于获得了热招职位的职位名称 &query=
  const [showCity, setShowCity] = useState<boolean>(true)
  const [style1, setStyle1] = useState({ display: 'block' })
  const [style2] = useState({ overflow: 'visible' })
  let [style3, setStyle3] = useState({ display: 'none' })
  const [liStyle, setLiStyle] = useState<string[]>([
    style.filter_li,
    style.filter_li,
    style.filter_li,
    style.filter_li,
  ])
  const [liColor, setLiColor] = useState<string[]>(['', '', '', ''])
  const [liselect1, setLiselect1] = useState<string[]>([
    style.selected,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ])
  const [liselect2, setLiselect2] = useState<string[]>([
    style.selected,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ])
  const [liselect3, setLiselect3] = useState<string[]>([
    style.selected,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ])
  const [liselect4, setLiselect4] = useState<string[]>([
    style.selected,
    '',
    '',
    '',
    '',
    '',
    '',
  ])
  const [rows, setRows] = useState<IJobs[]>([])
  const [jobName, setJobName] = useState<string>(jobname1)
  const [city, setCity] = useState<string>(City)
  const [ageLimit, setAgeLimit] = useState<number>()
  const [degree, setDegree] = useState<number>()
  const [salary, setSalary] = useState<salary>({ min: 0, max: 0 })
  const [companySize, setCompanySize] = useState<number>()

  const [litext] = useState<string[]>(['经验', '学历', '薪资', '规模'])
  const [ageLimittext] = useState<string[]>([
    '不限',
    '在校生',
    '应届生',
    '1年以内',
    '1-3年',
    '3-5年',
    '5-10年',
    '10年以上',
  ])
  const [degreetext] = useState<string[]>([
    '不限',
    '初中及以下',
    '中专/中技',
    '高中',
    '大专',
    '本科',
    '硕士',
    '博士',
  ])
  const [companysizetext] = useState<string[]>([
    '不限',
    '0-20人',
    '20-99人',
    '100-499人',
    '500-999人',
    '1000-9999人',
    '10000人以上',
  ])
  const [inputvalue, setInputvalue] = useState<string>(jobname1)

  useEffect(() => {
    setCity(City)
  }, [City])

  useEffect(() => {
    async function getData() {
      let result = await api.search(
        '',
        jobName,
        city,
        ageLimit,
        degree,
        salary,
        companySize
      )
      if (result.stat === 'OK') {
        let iJobs = result.rows.filter((item) => item.state !== 2)
        array1 = iJobs
        setRows([...iJobs])
        if (iJobs.length === 0) {
          setRowNull(true)
        } else setRowNull(false)
      }
    }
    getData()
  }, [ageLimit, city, companySize, degree, jobName, rowNull, salary])

  async function loadmore1() {
    const newarray = (
      await api.search(
        array1[array1.length - 1]._id,
        jobName,
        city,
        ageLimit,
        degree,
        salary,
        companySize
      )
    ).rows
    if (newarray.length < 5) {
      //判断后端API取不到数据了
      array1.push(...newarray)
      setRows([...array1])
      noMore1 = false
      return setHavemore(false)
    } else {
      array1.push(...newarray)
      setRows([...array1])
    }
  }
  async function scrollHandle1(isdo: boolean) {
    const offset = document.getElementById('load')
    if (offset === null) return null
    const offsetTop = offset.offsetTop
    if (
      offsetTop <= window.pageYOffset + window.innerHeight &&
      noMore1 === true
    ) {
      await loadmore1()
    }
  }
  function throttle1(handle: Function, delay: any, noMore: boolean) {
    return function () {
      if (noMore === false) return false
      if (!isDo1) {
        return false
      }
      isDo1 = false
      setTimeout(() => {
        handle()
        isDo1 = true
      }, delay)
    }
  }
  window.addEventListener('scroll', throttle1(scrollHandle1, 500, noMore1))

  useEffect(() => {
    setJobName(jobname1)
  }, [jobname1])

  function changeLi(li: number) {
    for (let i = 0; i < liStyle.length; i++) {
      if (i !== li) {
        liStyle[i] = style.filter_li
        liColor[i] = ''
      } else {
        liStyle[i] = style.filter_li + ' ' + style.selected
        document.getElementsByTagName('body')[0].style.overflow = 'hidden'
        liColor[i] = style.selected
      }
      setLiStyle(liStyle)
      setLiColor(liColor)
    }
  }

  function changeLiselect(
    setLiselect: (value: React.SetStateAction<string[]>) => void,
    liselect: string[],
    li: number
  ) {
    for (let i = 0; i < liselect.length; i++) {
      if (i !== li) {
        liselect[i] = ''
      } else {
        liselect[i] = style.selected
      }
      setLiselect(liselect)
    }
  }

  function lishow(n: number) {
    if (
      style3.display !== 'none' &&
      liStyle[n] === style.filter_li + ' ' + style.selected
    ) {
      setStyle3({ display: 'none' })
      document.getElementsByTagName('body')[0].style.overflow = ''
      liColor[n] = ''
    } else {
      setStyle3({ display: 'block' })
      changeLi(n)
    }
  }

  function bodyHidden() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  }

  return (
    <div className={style.wrap}>
      <div className={style.header}>
        <div className={style.search_bar}>
          <div className={style.top_search}>
            <p className={`${style.ipt_wrap} ${style.ipt_wrap_new}`}>
              <Link
                className={`${style.icon_home} ${style.icon_home_new}`}
                to="/"
              >
                <span className={style.logo_x}></span>
              </Link>
              <Link
                className={`${style.icon_home} ${style.icon_home_old}`}
                to="/"
              >
                <span className={style.home_logo_new}></span>
              </Link>
              <input
                type="search"
                value={inputvalue}
                className={`${style.ipt_search} ${style.ipt_search_new}`}
                placeholder="搜索职位"
                onChange={(value) => {
                  setInputvalue(value.target.value)
                }}
              ></input>
              <button
                type="submit"
                className={`${style.btn_search} ${style.btn}`}
                onClick={() => {
                  setJobName(inputvalue)
                  history.push(`/search${location.search}${inputvalue}`)
                }}
              >
                搜索
              </button>
            </p>

            <div
              className={`${style.chat_wrap} ${style.chat_wrap_new} ${style.lead_flow_enter}`}
              data-min-source="4"
            >
              <div className={`${style.has_chat} ${style.chat_icon}`}>
                <div className={style.chat_img}></div>
              </div>
              <span className={`${style.chat_text} ${style.chat_text_active}`}>
                消息
              </span>
            </div>
          </div>

          <div className={style.filter_bar_wrap}>
            <div
              className={`${style.city_selector} ${style.city_text}`}
              style={style2}
              onClick={() => {
                bodyHidden()
                if (style3.display === 'none') {
                  setShowCity(!showCity)
                }
              }}
            >
              全国
            </div>
            <div className={`${style.filter_bar} ${style.filter_bar_new}`}>
              <ul>
                {litext.map((element, i) => {
                  return (
                    <li
                      key = {i}
                      className={liColor[i]}
                      onClick={() => {
                        lishow(i)
                      }}
                    >
                      {element}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          <div className={style.filter_content} style={style3}>
            <div className={`${style.scroller} ${style.change}`}>
              <ul>
                <li className={liStyle[0]}>
                  {ageLimittext.map((item, i) => {
                    return (
                      <ul key={i}>
                        <li key={i}>
                          <div key={i}
                            className={liselect1[i]}
                            onClick={() => {
                              lishow(0)
                              if (i === 0) setAgeLimit(undefined)
                              else setAgeLimit(i)
                              changeLiselect(setLiselect1, liselect1, i)
                            }}
                          >
                            {item}
                          </div>
                        </li>
                      </ul>
                    )
                  })}
                </li>
                <li className={liStyle[1]}>
                  {degreetext.map((item, i) => {
                    return (
                      <ul key = {i}>
                        <li key = {i}>
                          <div
                            key = {i}
                            className={liselect2[i]}
                            onClick={() => {
                              lishow(1)
                              if (i === 0) setDegree(undefined)
                              else setDegree(i)
                              changeLiselect(setLiselect2, liselect2, i)
                            }}
                          >
                            {item}
                          </div>
                        </li>
                      </ul>
                    )
                  })}
                </li>
                <li className={liStyle[2]}>
                  <ul>
                    <li>
                      <div
                        className={liselect3[0]}
                        onClick={() => {
                          lishow(2)
                          setSalary({ min: 0, max: 0 })
                          changeLiselect(setLiselect3, liselect3, 0)
                        }}
                      >
                        不限
                      </div>
                    </li>
                    <li>
                      <div
                        className={liselect3[1]}
                        onClick={() => {
                          lishow(2)
                          setSalary({ min: 0, max: 3 })
                          changeLiselect(setLiselect3, liselect3, 1)
                        }}
                      >
                        3K以下
                      </div>
                    </li>
                    <li>
                      <div
                        className={liselect3[2]}
                        onClick={() => {
                          lishow(2)
                          setSalary({ min: 3, max: 5 })
                          changeLiselect(setLiselect3, liselect3, 2)
                        }}
                      >
                        3-5K
                      </div>
                    </li>
                    <li>
                      <div
                        className={liselect3[3]}
                        onClick={() => {
                          lishow(2)
                          setSalary({ min: 5, max: 10 })
                          changeLiselect(setLiselect3, liselect3, 3)
                        }}
                      >
                        5-10K
                      </div>
                    </li>
                    <li>
                      <div
                        className={liselect3[4]}
                        onClick={() => {
                          lishow(2)
                          setSalary({ min: 10, max: 15 })
                          changeLiselect(setLiselect3, liselect3, 4)
                        }}
                      >
                        10-15K
                      </div>
                    </li>
                    <li>
                      <div
                        className={liselect3[5]}
                        onClick={() => {
                          lishow(2)
                          setSalary({ min: 15, max: 20 })
                          changeLiselect(setLiselect3, liselect3, 5)
                        }}
                      >
                        15-20K
                      </div>
                    </li>
                    <li>
                      <div
                        className={liselect3[6]}
                        onClick={() => {
                          lishow(2)
                          setSalary({ min: 20, max: 30 })
                          changeLiselect(setLiselect3, liselect3, 6)
                        }}
                      >
                        20-30K
                      </div>
                    </li>
                    <li>
                      <div
                        className={liselect3[7]}
                        onClick={() => {
                          lishow(2)
                          setSalary({ min: 30, max: 50 })
                          changeLiselect(setLiselect3, liselect3, 7)
                        }}
                      >
                        30-50K
                      </div>
                    </li>
                    <li>
                      <div
                        className={liselect3[8]}
                        onClick={() => {
                          lishow(2)
                          setSalary({ min: 50, max: 999 })
                          changeLiselect(setLiselect3, liselect3, 8)
                        }}
                      >
                        50K以上
                      </div>
                    </li>
                  </ul>
                </li>
                <li className={liStyle[3]}>
                  {companysizetext.map((item, i) => {
                    return (
                      <ul key = {i}>
                        <li key = {i}>
                          <div key = {i}
                            className={liselect4[i]}
                            onClick={() => {
                              lishow(3)
                              if (i === 0) setCompanySize(undefined)
                              else setCompanySize(i)
                              changeLiselect(setLiselect4, liselect4, i)
                            }}
                          >
                            {item}
                          </div>
                        </li>
                      </ul>
                    )
                  })}
                </li>
              </ul>
            </div>
            <div
              className={style.mask}
              onClick={() => {
                setStyle3({ display: 'none' })
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className={`${style.job_list} ${style.job_list_new}`}>
        <ul>
          {rows.map((item ,i) => (
            <li 
            key = {i}
            className={style.item}>
              <Job rows={item} key={i} status={false}></Job>
            </li>
          ))}
        </ul>
        <div style={!rowNull ? { display: 'block' } : { display: 'none' }}>
          <div
            id="load"
            style={havemore ? { display: 'block' } : { display: 'none' }}
            className={style.loadmore}
          >
            加载更多
          </div>
          <div
            style={!havemore ? { display: 'block' } : { display: 'none' }}
            className={style.loadmore}
          >
            没有更多了
          </div>
        </div>
        <div style={rowNull ? { display: 'block' } : { display: 'none' }}>
          <div className={style.data_tips}>
            <img
              src="https://static.zhipin.com/zhipin-geek/v452/h5/wap/images/icon-empty.png"
              alt=""
              className={style.tips_img}
            ></img>
            <p>没有找到相关职位</p>
          </div>
        </div>
      </div>

      <div
        className={style.login_mask_tips}
        style={store.username === '' ? style1 : { display: 'none' }}
      >
        <div>
          <div
            className={style.close}
            onClick={() => {
              setStyle1({ display: 'none' })
            }}
          ></div>
          <Link to="/Login">
            <div className={style.text}>更多高薪职位推荐，跳槽薪资翻倍</div>
            <div className={style.go_to}>立即注册</div>
          </Link>
        </div>
      </div>
      {CityModal(showCity)}
    </div>
  )
}
