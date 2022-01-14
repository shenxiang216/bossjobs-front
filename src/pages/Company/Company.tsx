import { BrowserRouter, useParams } from 'react-router-dom'
import { Switch, Route } from 'react-router'
import { ICompany, size } from '../../types'
import Header from '../../components/Detail/Header'
import HotPositions from './HotPositions/HotPositions'
import Introduce from './Introduce/Introduce'
import style from './style.module.css'
import Nav from '../../components/Company/Nav'
import { useEffect, useState } from 'react'
import * as api from '../../services/api'
interface Params {
  id: string
}
export default function Company() {
  const params = useParams<Params>()
  const [company, setCompany] = useState<ICompany>()
  const [count, setCount] = useState<number>(0)
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
  useEffect(() => {
    async function getDate() {
      const result = await api.getCompany(params.id)
      if (result.data.stat === 'OK') {
        result.data.data.companyResult.refreshTime += ' 更新公司信息'
        setCompany(result.data.data.companyResult)
        setCount(result.data.data.jobsCount)
      }
    }
    getDate()
  }, [params.id])
  return (
    <div>
      <Header />
      <div className={style.intro_basis}>
        <img className={style.basis_img} src={company?.companyLogo} alt="" />
        <div className={style.basis_body}>
          <h1 className={style.body_title}>{company?.companyName}</h1>
          <div className={style.body_con}>
            {scale(company?.companySize ? company.companySize : 1)}·{' '}
            <span className={style.industry_link}>{company?.trade}</span>
          </div>
          <div className={style.update_time}>{company?.refreshTime}</div>
        </div>
      </div>
      <BrowserRouter>
        <Nav id={params.id} count={count} />
        <Switch>
          <Route path="/company/:id" exact component={Introduce} />
          <Route
            path="/company/componyPositions/:id"
            exact
            component={HotPositions}
          />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
