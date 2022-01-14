import style from './style.module.css'
import { IHotCompanies, IHotJobs } from "../../../types"
import React from "react"
import { useEffect } from "react"
import * as api from '../../../services/api'
import { useHistory } from "react-router-dom"

export default function HotJobs() {
    const history = useHistory()
    const [hotJobs, setHotJobs] = React.useState<IHotJobs[]>([])
    const [companys, setCompanys] = React.useState<IHotCompanies[]>([])

    useEffect(() => {
        const getData = async () => {
            const hot = (await api.getHotJobsAndCompanys()).data
            setHotJobs([...hot.hotJobs])
            setCompanys([...hot.hotCompanys])
        }
        getData()
    },[])
    return (
        <div>
            <div className={style.title}>热门职位</div>
            <div className={style.HotJobs} >
                {hotJobs.map((item,index)=>{
                    return (<div className={style.hotJob} key={index} onClick={() => {
                        history.push(`/search?全国&query=${item.jobName}`)
                      }}>
                        {item.jobName}
                    </div>)
                })}
            </div>

            <div className={style.title}>热门企业</div>
            <div className={style.companys}>
                <div className={style.HotCompanysArea}>
                    {/* {companys.map((item, index) => 
                        HotCompanyItem(item, index)
                    )} */}
                    { companys.map( (item,i) => {
                        return (<div className={style.HotCompany} key={item._id} onClick={() => {
                            history.push(`/company/${item.companyId}`)
                          }
                          }>
                            <img
                              src={item.companyLogo}
                              alt=""
                              className={style.logo}
                            />
                            <div className={style.text}>
                              <div className={style.companyName}>{item.companyName}</div>
                              <div className={style.positionsNum}>在招岗位{item.jobsCount}个</div>
                            </div>
                          </div>)
                    } ) }
                </div>
            </div>
        </div>
    )
}