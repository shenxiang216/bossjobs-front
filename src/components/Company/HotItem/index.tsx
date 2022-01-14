import { ageLimit, Degree, IJobs } from '../../../types'
import style from './style.module.css'
interface Props {
  job: IJobs
}
export default function HotItem(props: Props) {
  const job = props.job
  let wage = job.wages.min + '-' + job.wages.max + 'k'
  const name = job.HRname + ' · ' + job.HRposition
  if (job.wagesTimes.toString() !== '') {
    wage += '·' + job.wagesTimes
  }
  function Limit(Limit: number) {
    switch (parseInt(Limit.toString())) {
      // case ageLimit.nolimit:
      //   return '经验不限'
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
  return (
    <>
      <div className={style.position_list}>
        <a className={style.a_link} href={`/detail/${job._id}`} key={job._id}>
          <h4>
            <span className={style.price}>{wage}</span>
            {job.title}
          </h4>
          <div>
            {job.city}
            <i className={style.vline}></i>
            {Limit(job.ageLimit)}
            <i className={style.vline}></i>
            {jobDegree(job.degree)}
          </div>
          <div className={style.boss}>
            <img src={job.HRavator} alt="/" />
            <span>{name}</span>
          </div>
          <span className={style.btn_chat}>立即沟通</span>
        </a>
      </div>
    </>
  )
}
