import style from './style.module.css'
export default function Header() {
  return (
    <div id={style.header}>
      <div className={style.logo}>
        <a href="/">
          <span>BOSS直聘</span>
        </a>
      </div>
      <div className={style.top_search + ' ' + style.top_search_chat}>
        <p className={style.ipt_wrap}>
          <a href="/search/" className={style.link_search}>
            搜索职位<i className={style.icon_search}></i>
          </a>
        </p>
      </div>
    </div>
  )
}
