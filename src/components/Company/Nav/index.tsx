import { NavLink } from 'react-router-dom'
import style from './style.module.css'
interface Props {
  id: string
  count: number
}
export default function Nav(props: Props) {
  let hotNumber: string
  if (props.count !== 0) {
    hotNumber = '热招职位(' + props.count.toString() + ')'
  } else {
    hotNumber = '热招职位'
  }

  return (
    <>
      <div className={style.tab_wrap + ' ' + style.sticky}>
        <nav className={style.tabs}>
          <NavLink
            to={`/company/${props.id}`}
            className={style.tab_item}
            exact
            activeClassName={style.tab_show}
          >
            <span>公司信息</span>
          </NavLink>
          <NavLink
            to={`/company/componyPositions/${props.id}`}
            className={style.tab_item}
            activeClassName={style.tab_show}
          >
            <span>{hotNumber}</span>
          </NavLink>
        </nav>
      </div>
    </>
  )
}
