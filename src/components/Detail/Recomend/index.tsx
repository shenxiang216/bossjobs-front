import * as api from '../../../services/api'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ICompany, IJobs } from '../../../types'
import style from './style.module.css'
interface Props {
  similarjob: IJobs
}
export default function Recomend(props: Props) {
  const [company, setCompany] = useState<ICompany>()
  useEffect(() => {
    async function getDate() {
      if (props.similarjob?.ownedCompany === undefined) return
      const result = await api.getCompany(props.similarjob?.ownedCompany)
      if (result.data.stat === 'OK') {
        setCompany(result.data.data.companyResult)
      }
    }
    getDate()
  }, [props])
  return (
    <>
      <li className={style.li_recomend}>
        <Link
          to={'/detail/' + props.similarjob?._id}
          id={company?._id}
          key={company?._id}
        >
          <div className={style.company_logo}>
            <img src={company?.companyLogo} alt="" />
          </div>
          <div className={style.info_primary}>
            <div className={style.name}>
              <span className={style.red}>4-9K</span>
              <b>
                <span className={style.name_text}>
                  {props.similarjob?.title}
                </span>
              </b>
            </div>
            <p className={style.flex_box}>
              <span className={style.company_info}>
                {company?.companyName}
                <em className={style.vdot}>·</em>
                {props.similarjob?.city}
              </span>
              {/* 立即沟通不知道弄不弄，弄的话加一层Link */}
              <span
                className={
                  style.btn + ' ' + style.btn_chat + ' ' + style.list_chat
                }
              >
                立即沟通
              </span>
            </p>
          </div>
        </Link>
      </li>
    </>
  )
}
