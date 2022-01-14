import { Link, useParams } from 'react-router-dom'
import style from './style.module.css'
import Header from '../../components/Detail/Header'
import MapItem from '../../components/MapItem/index'
import Recomend from '../../components/Detail/Recomend'
import { IJobs, ICompany, ageLimit, Degree, IMap, size } from '../../types'
import * as api from '../../services/api'
import { useEffect, useState } from 'react'
import Toast from '../../components/Toast'

interface Params {
  id: string
}

export default function Detail() {
  const [company, setCompany] = useState<ICompany>()
  const [job, setjob] = useState<IJobs>()
  const [similarjobs, setSimilarjobs] = useState<IJobs[]>([])
  let [interest, setInterest] = useState<string>('感兴趣')
  const params = useParams<Params>()
  const address: IMap = { longitude: 114.39316, latitude: 30.48668 }
  function scale(companySize: number) {
    switch (parseInt(companySize.toString())) {
      case size.less20:
        return '少于20人'
      case size.f20t99:
        return '20-99人'
      case size.f100t499:
        return '100-499人'
      case size.f500t999:
        return '500-999人'
      case size.f1000t9999:
        return '1000-9999人'
      case size.more:
        return '10000人以上'
      default:
        break
    }
  }
  function Limit(Limit: number) {
    switch (parseInt(Limit.toString())) {
      case ageLimit.student:
        return '在校生'
      case ageLimit.graduate:
        return ' 应届生'
      case ageLimit.within1:
        return '1年以内'
      case ageLimit.f1to3:
        return '1-3年'
      case ageLimit.fo3to5:
        return '3-5年'
      case ageLimit.fo5to10:
        return '5-10年'
      case ageLimit.more:
        return '10年以上'
      default:
        return '经验不限'
    }
  }
  function jobDegree(degree: number) {
    switch (parseInt(degree.toString())) {
      case Degree.middle:
        return '初中及以下'
      case Degree.zhongzhuan:
        return '中专'
      case Degree.gaozhong:
        return '高中'
      case Degree.dazhuan:
        return '大专'
      case Degree.college:
        return '本科'
      case Degree.master:
        return ' 硕士'
      case Degree.doctor:
        return '博士'
      default:
        return '不限'
    }
  }
  async function addInterest(id: string) {
    const result = await api.addInterest(id)
    if (result.stat === 'OK') {
      setInterest('不感兴趣')
      Toast('添加成功')
    }
  }
  async function deleteInterest(id: string) {
    const result = await api.deleteInterest(id)
    if (result.stat === 'OK') {
      setInterest('感兴趣')
      Toast('删除成功')
    }
  }
  async function findInterest(id: string) {
    if (interest === '不感兴趣') {
      deleteInterest(params.id)
    }
    if (interest === '感兴趣') {
      addInterest(params.id)
    }
  }
  useEffect(() => {
    const getDate = async () => {
      const result = await api.getJobDetail(params.id)
      const similar = await api.getSimilarJobs(params.id)
      const intest = await api.findInterest()
      // eslint-disable-next-line array-callback-return
      intest.rows.interested?.map((interest) => {
        if (params.id === interest.id) {
          setInterest('不感兴趣')
        }
      })
      if (result.data.stat === 'OK' || similar.data.stat === 'OK') {
        setjob(result.data.data.job)
        setCompany(result.data.data.company)
        setSimilarjobs(similar.data.rows)
      }
    }
    getDate()
  }, [params.id])
  window.scrollTo(0, 0)
  return (
    <>
      <Header />
      <div id="main">
        <div className={style.job_banner}>
          <h1 className={style.name}>
            <span className={style.salary}>7-12K</span>
            <p className={style.job_title}>{job?.title}</p>
          </h1>
          {/* 自己根据需求map em组件 */}
          <p>
            <a className={style.text_city} href="/wuhan/">
              {job?.city}
            </a>
            <em className={style.vline}></em>
            {Limit(job?.ageLimit ? job?.ageLimit : 1)}
            <em className={style.vline}></em>
            {jobDegree(job?.degree ? job?.degree : 1)}
          </p>
          <div className={style.job_tags}>
            {/* 自己根据需求map span组件 */}
            {job?.label.map((value) => {
              return <span key={value}>{value}</span>
            })}
          </div>
          <div className={style.time}>
            更新于：
            {job?.refreshTime ? job?.refreshTime : ''}
          </div>
        </div>
        <div className={style.job_author}>
          <div className={style.figure}>
            <img src={job?.HRavator} alt="" />
          </div>
          <div className={style.info_primary}>
            <div className={style.name}>{job?.HRname}</div>
            <span
              className={style.link_like}
              onClick={() => findInterest(params.id)}
            >
              {interest}
            </span>
            <p className={style.gray}>
              {company?.companyName}
              <em className={style.vdot}>·</em>
              {job?.HRposition}
            </p>
          </div>
        </div>
        <div className={style.job_detail}>
          <div className={style.detail_content}>
            <div className={style.job_sec}>
              <h3>职位描述</h3>
              <div
                className={style.text}
                dangerouslySetInnerHTML={{
                  __html: job?.decription ? job?.decription : '',
                }}
              ></div>
            </div>
            <div className={style.job_sec}>
              <h3 className={style.title}>公司介绍</h3>
              <div className={style.color_line}></div>
              <p
                className={
                  style.detail_text +
                  ' ' +
                  style.show_switch +
                  ' ' +
                  style.four_lines
                }
                data-height="120"
                dangerouslySetInnerHTML={{
                  __html: company?.companyIntroduce
                    ? company?.companyIntroduce
                    : '',
                }}
              ></p>
              <div className={style.view_more} style={{ display: 'block' }}>
                <div className={style.detail_layer}></div>
                <Link
                  to={`/company/${company?._id}`}
                  id={company?._id}
                  key={company?._id}
                >
                  <span className={style.link_all}>完整信息</span>
                </Link>
              </div>
            </div>
            <div className={style.job_sec}>
              <h3>工作地址</h3>
              <div className={style.job_location}>
                <div className={style.location_address}>{job?.address}</div>
                <div id={style.map_container} className={style.map_container}>
                  <div className={style.img_container}>
                    <MapItem
                      data={job?.addresscode ? job?.addresscode : address}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link
          className={style.job_company}
          to={'/company/' + company?._id}
          id={company?._id}
          key={company?._id}
        >
          <div className={style.company_logo}>
            <img src={company?.companyLogo} alt="" />
          </div>
          <div className={style.info_primary}>
            <div className={style.flex_box}>
              <div className={style.name}>{company?.companyName}</div>
            </div>

            <p>{company?.companyName}</p>
            <p className={style.gray}>
              {company?.trade}
              <em className={style.vline}></em>
              {scale(company?.companySize ? company.companySize : 1)}
            </p>
          </div>
        </Link>
      </div>
      <div className={style.job_recomend}>
        <h3>相似职位</h3>
        <ul>
          {/* 例子 */}
          <Recomend key={'s'} similarjob={job ? job : similarjobs[0]} />
          {similarjobs.map((similarjob) => (
            <Recomend key={similarjob._id} similarjob={similarjob} />
          ))}
        </ul>
      </div>
    </>
  )
}
