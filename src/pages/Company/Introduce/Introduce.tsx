import { useParams } from 'react-router-dom'
import style from './style.module.css'
import * as api from '../../../services/api'
import { useEffect, useState } from 'react'
import { ICompany } from '../../../types'
interface Params {
  id: string
}
export default function Introduce() {
  const params = useParams<Params>()
  const [company, setCompany] = useState<ICompany>()
  useEffect(() => {
    const getDate =
      async () => {
        const result = await api.getCompany(params.id)
        if (result.data.stat === "OK") {
          setCompany(result.data.data.companyResult)
        }
      }
    getDate()
  }, [params.id])
  return (
    <>
      <div className={style.intro_company}>
        <div>
          <div className={style.panel + " " + style.intro_simple}>
            <h4 className={style.panel_title}>{company?.companyName}</h4>
            <p className={style.simple_text}
              dangerouslySetInnerHTML={{ __html: (company?.companyIntroduce) ? company?.companyIntroduce : '' }}>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}