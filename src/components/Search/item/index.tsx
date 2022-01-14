import { Link } from 'react-router-dom'
import { IJobs } from '../../../types'
import style from './style.module.css'

interface Params {
  rows: IJobs
  status: boolean
}

export default function Job(props: Params) {
  const limit = props.rows.ageLimit.toString()
  return (
    <>
      <div>
        <Link to={`/detail/${props.rows._id}`} key={props.rows._id}>
          <div className={style.title}>
            <span className={style.title_text}>{props.rows.title}</span>
            <span style={limit === '1' ? { display: 'block' } : { display: 'none' }} className={style.salary}>
              {props.rows.wages.min}-{props.rows.wages.max}元/天
            </span>
            <span style={(props.rows.wagesTimes === '' && limit !== '1') ? { display: 'block' } : { display: 'none' }} className={style.salary}>
              {props.rows.wages.min}-{props.rows.wages.max}K
            </span>
            <span style={(props.rows.wagesTimes !== '' && limit !== '1') ? { display: 'block' }: { display: 'none' }}
              className={style.salary}
            >
              {props.rows.wages.min}-{props.rows.wages.max}K·
              {props.rows.wagesTimes}
            </span>
          </div>
          <div className={style.name}>
            <span className={style.company}>{props.rows.company}</span>
            <span
              style={props.status ? { display: 'none' } : { display: '' }}
              className={style.workplace}
            >
              {props.rows.city}
            </span>
          </div>
          <div className={style.labels}>
            {props.rows.label.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
          <div className={style.recruiter}>
            <div className={style.user_wrap}>
              <img src={props.rows.HRavator} alt=""></img>
              <div className={style.name}>
                {props.rows.HRname}·{props.rows.HRposition}
              </div>
            </div>
            <div>
              <button className={style.btn_chat}>立即沟通</button>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}
