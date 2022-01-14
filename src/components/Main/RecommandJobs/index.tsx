import { useState } from 'react'
import { IJobs } from '../../../types'
import Job from '../../Search/item'
import style from './style.module.css'
import * as api from '../../../services/api'
import { useEffect } from 'react'

let isDo = true
let noMore: boolean = true
export default function RecommandJobs() {
  const [jobs, setJobs] = useState<IJobs[]>([])
  const [havemore, setHavemore] = useState<boolean>(true)
  let array: IJobs[] = []

  useEffect(() => {
    const getData = async function () {
      let result = await api.search('')
      if (result.stat === 'OK') {
        let iJobs = result.rows.filter((item) => item.state !== 2)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        array = iJobs
        setJobs([...iJobs])
      }
    }
    getData()
  }, [])
  async function loadmore() {
    if(array.length === 0) return
    const newarray = (await api.search(array[array.length - 1]._id)).rows
    if (newarray.length < 5) {
      //判断后端API取不到数据了
      array.push(...newarray)
      setJobs([...array])
      noMore = false
      return setHavemore(false)
    } else {
      array.push(...newarray)
      setJobs([...array])
    }
  }
  async function scrollHandle(isdo: boolean) {
    const offset = document.getElementById('load')
    if (offset === null) return null
    const offsetTop = offset.offsetTop
    if (
      offsetTop <= window.pageYOffset + window.innerHeight &&
      noMore === true
    ) {
      await loadmore()
    }
  }
  function throttle(handle: Function, delay: any, noMore: boolean) {
    return function () {
      if (noMore === false) return false
      if (!isDo) {
        return false
      }
      isDo = false
      setTimeout(() => {
        handle()
        isDo = true
      }, delay)
    }
  }
  window.addEventListener('scroll', throttle(scrollHandle, 500, noMore))
  return (
    <div>
      <div className={style.title}>职位推荐</div>
      <div className={style.bg}>
        <ul>
          {jobs.map((item,i) => (
            <li className={style.item} key={i}>
              <Job rows={item} key={i} status={true}></Job>
            </li>
          ))}
        </ul>
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
    </div>
  )
}
