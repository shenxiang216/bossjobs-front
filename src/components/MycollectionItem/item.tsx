import style from './style.module.css'
interface Props {
  title: string
  id: string
  onClick: (id: string) => void
}
export default function MycollectionItem(props: Props) {
  return (
    <div className={style.jobbox}>
      <div className={style.itemtext}>{props.title}</div>
      <div className={style.deletbox} onClick={() => props.onClick(props.id)}>
        <svg
          className={style.icon_delet}
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1408"
          width="24"
          height="24"
        >
          <path
            d="M696.5703125 877.625H328.1328125c-53.34960938 0-96.6796875-43.33007813-96.6796875-96.6796875V315.125h-48.60351563c-19.42382813 0-35.15625-15.73242188-35.15625-35.15625s15.73242188-35.15625 35.15625-35.15625h176.13281251c14.0625-72.0703125 77.60742188-126.5625 153.72070312-126.5625s139.65820313 54.4921875 153.6328125 126.5625H842.46875c19.42382813 0 35.15625 15.73242188 35.15625 35.15625s-15.73242188 35.15625-35.15625 35.15625h-49.21875v465.8203125c0 53.34960938-43.33007813 96.6796875-96.6796875 96.6796875zM301.765625 315.125v465.8203125c0 14.50195313 11.86523438 26.3671875 26.3671875 26.3671875H696.5703125c14.50195313 0 26.3671875-11.86523438 26.3671875-26.3671875V315.125H301.765625z m129.99023438-70.3125h161.80664062c-12.21679688-32.87109375-43.85742188-56.25-80.94726563-56.25-37.00195313-0.08789063-68.64257813 23.37890625-80.85937499 56.25z m152.40234374 518.64257813c-19.42382813 0-35.15625-15.73242188-35.15624999-35.15625v-250.48828125c0-19.42382813 15.73242188-35.15625 35.15625-35.15625s35.15625 15.73242188 35.15625 35.15625v250.48828125c0 19.42382813-15.8203125 35.15625-35.15625 35.15625z m-143.26171874 0c-19.42382813 0-35.15625-15.73242188-35.15625001-35.15625v-250.48828125c0-19.42382813 15.73242188-35.15625 35.15625-35.15625s35.15625 15.73242188 35.15625 35.15625v250.48828125c0 19.42382813-15.8203125 35.15625-35.15625 35.15625z"
            p-id="1409"
          ></path>
        </svg>
      </div>
    </div>
  )
}