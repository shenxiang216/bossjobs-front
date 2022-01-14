import style from './style.module.css'

export default function HomeItems(icon:string, text:string){
	return(
		<div className = {style.box}>
			<div></div>
			<div className = {style.box_text}>{text}</div>
			<div><i className = {"iconfont icon-angle-right-o-thin"}></i></div>
		</div>
  )
}