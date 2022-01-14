import style from './style.module.css'

export default function Toast(text: string) {
  let el = document.createElement('div')
  let el_child = document.createElement('div')
  document.body.appendChild(el)
  el.className = style.wrap
  el_child.innerText = text
  el_child.className = style.box
  el.appendChild(el_child)
  setTimeout(() => {
    document.body.removeChild(el)
  }, 2000)
}
