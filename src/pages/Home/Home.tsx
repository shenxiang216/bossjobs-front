import style from './style.module.css'
import { useHistory } from 'react-router'
import * as api from '../../services/api'
import store from '../../store/store'
import Toast from '../../components/Toast'
import { useEffect, useState } from 'react'
export default function Home() {
  const history = useHistory()
  const [src,setSrc]=useState<string>('')
  useEffect(() => {
    if (store.username === '') history.push('/login')
	setSrc(`/api/file/download/${store.photo}`)
  }, [history])
  return (
    <div className={style.bg}>
      <div className={style.header}>
        <div
          className={style.title}
          onClick={() => {
            history.push('/')
          }}
        ></div>
      </div>
      <div className={style.userinfo}>
        <div className={style.welcome}>欢迎，{store.username}</div>
        <div>
          <img
            className={style.img_avator}
            src={src}
            alt=""
          ></img>
        </div>
      </div>
      <div className={style.function}>
        <div
          className={style.item}
          onClick={() => {
            history.push('/Mycollection')
          }}
        >
          <div>
            <svg
              className={style.icon}
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
            >
              <path
                d="M513.40625 842.20507813c-9.05273438 0-18.10546875-3.42773438-24.9609375-10.28320313l-309.375-309.46289063c-37.44140625-37.44140625-58.09570313-87.36328125-58.09570313-140.62499999s20.65429688-103.18359375 58.09570313-140.62500001c37.44140625-37.44140625 87.36328125-58.09570313 140.625-58.09570312s103.18359375 20.65429688 140.625 58.09570313l53.0859375 53.0859375 53.0859375-53.0859375c37.44140625-37.44140625 87.36328125-58.09570313 140.625-58.09570313 53.26171875 0 103.18359375 20.65429688 140.625 58.09570313 37.44140625 37.44140625 58.09570313 87.36328125 58.09570313 140.62499999 0 53.26171875-20.65429688 103.18359375-58.09570313 140.62500001L538.27929688 831.921875c-6.85546875 6.85546875-15.8203125 10.28320313-24.87304688 10.28320313zM319.6953125 253.42578125c-34.453125 0-66.796875 13.27148438-90.87890625 37.44140625-50.09765625 50.09765625-50.09765625 131.66015625 0 181.84570313l284.67773438 284.67773437 284.67773437-284.67773438c50.09765625-50.09765625 50.09765625-131.66015625 0-181.84570312-50.09765625-50.09765625-131.74804688-50.09765625-181.84570313 0L538.27929688 368.73828125c-6.85546875 6.85546875-15.8203125 10.28320313-24.87304688 10.28320313h-0.08789063c-8.96484375 0-18.01757813-3.42773438-24.87304687-10.28320313l-77.87109375-77.87109375c-24.16992188-24.16992188-56.42578125-37.44140625-90.87890625-37.44140625z"
                p-id="1589"
                fill="#707070"
              ></path>
            </svg>
          </div>
          <div className={style.item_text}>我的收藏</div>
          <div>
            <svg
              className={style.icon_go}
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
            >
              <path
                d="M513.31835938 903.20117188c-8.96484375 0-18.01757813-3.42773438-24.87304688-10.28320313-13.7109375-13.7109375-13.7109375-35.94726563 0-49.74609375l331.69921875-331.69921875-331.69921875-331.78710938c-13.7109375-13.7109375-13.7109375-35.94726563 0-49.74609374 13.7109375-13.7109375 35.94726563-13.7109375 49.74609375 0L894.76367188 486.51171875c13.7109375 13.7109375 13.7109375 35.94726563-1e-8 49.74609375L538.19140625 892.91796875c-6.94335938 6.85546875-15.90820313 10.28320313-24.87304688 10.28320313z"
                p-id="2263"
                fill="#bfbfbf"
              ></path>
            </svg>
          </div>
        </div>

        <div
          className={style.item}
          onClick={() => {
            history.push('/Setting')
          }}
        >
          <div>
            <svg
              className={style.icon}
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
            >
              <path
                d="M576.3359375 907.06835938H447.83984375c-28.4765625 0-50.00976563-18.19335938-50.00976563-42.27539063V817.859375c-33.57421875-12.56835938-65.21484375-30.76171875-92.81249999-53.4375l-40.60546875 23.37890625c-20.91796875 12.04101563-47.37304688 2.54882813-61.61132813-22.1484375L138.55273437 654.29492188c-4.65820313-7.99804688-7.3828125-16.69921875-7.99804687-25.04882813-1.23046875-16.61132813 6.24023438-31.640625 19.6875-39.375l40.25390625-23.203125c-5.9765625-35.5078125-5.9765625-72.15820313-0.08789063-107.578125l-40.16601562-23.203125c-13.359375-7.734375-20.91796875-22.8515625-19.6875-39.375 0.61523438-8.34960938 3.42773438-17.05078125 7.99804688-25.04882813l64.24804687-111.35742187c4.65820313-7.99804688 10.72265625-14.765625 17.66601563-19.51171875 13.7109375-9.40429688 30.5859375-10.37109375 43.94531249-2.63671875l40.51757813 23.37890625c27.7734375-22.8515625 59.4140625-41.22070313 92.90039063-53.87695313v-46.58203125c0-24.08203125 21.4453125-42.27539063 50.00976562-42.27539062h128.58398438c28.4765625 0 50.00976563 18.19335938 50.00976562 42.27539063v46.31835937c33.66210938 12.56835938 65.47851563 30.9375 93.33984375 53.87695313l40.078125-23.11523438c13.359375-7.734375 30.234375-6.6796875 43.9453125 2.63671875 6.94335938 4.74609375 13.0078125 11.51367188 17.66601563 19.51171875l64.16015624 111.26953125c14.23828125 24.69726563 9.22851563 52.3828125-11.6015625 64.42382813L834.55859375 458.5625c5.9765625 35.68359375 5.88867188 72.59765625-0.08789063 108.36914063l39.63867188 22.85156249c20.91796875 12.04101563 25.83984375 39.7265625 11.6015625 64.42382813L821.375 765.56445313c-4.65820313 7.99804688-10.72265625 14.765625-17.66601563 19.51171874-13.7109375 9.40429688-30.5859375 10.37109375-43.94531249 2.63671875l-40.16601563-23.203125c-27.7734375 22.76367188-59.50195313 40.95703125-93.25195313 53.52539063v46.66992188c0 24.16992188-21.4453125 42.36328125-50.00976562 42.36328125z m-108.19335938-70.31250001h87.89062501v-69.52148437h0.703125l-0.17578125-0.43945313 33.48632812-10.63476562c34.98046875-11.07421875 67.76367188-29.97070313 94.74609375-54.4921875l25.3125-23.02734375 0.3515625-0.52734375 0.17578125 0.08789062 0.17578125-0.17578125 0.61523438 0.703125 59.15039062 34.18945313 43.9453125-76.11328125-60.20507813-34.71679688 1.0546875-1.84570312 7.20703125-32.60742188c7.91015625-35.859375 7.99804688-73.65234375 0.17578125-109.3359375l-7.03125-31.9921875-1.49414062-2.54882812 60.20507813-34.71679688-43.9453125-76.11328125-59.4140625 34.36523438-0.43945313 0.43945312-0.17578125-0.08789062-0.17578125 0.08789062-0.26367187-0.52734375-25.3125-23.203125c-27.0703125-24.78515625-59.765625-43.68164063-94.57031251-54.75585937l-33.48632812-10.63476563h-0.703125v-69.43359375H468.0546875v69.52148438l-33.3984375 10.37109375c-34.8046875 11.07421875-67.5 30.05859375-94.5703125 54.75585937l-25.92773438 23.73046875-0.26367187-0.26367187-0.17578125 0.26367187-60.20507813-34.71679687-43.9453125 76.11328125 60.20507813 34.71679687-0.3515625 0.52734375-7.47070313 33.92578125c-7.82226563 35.68359375-7.734375 73.4765625 0.17578126 109.3359375l7.55859375 34.36523438h-0.08789063l0.08789063 0.17578125-60.20507813 34.71679687 43.9453125 76.11328125 60.20507813-34.71679687 0.08789062 0.17578125 0.26367188-0.26367188 26.015625 23.64257813c26.98242188 24.609375 59.765625 43.41796875 94.74609374 54.4921875l33.48632813 10.63476562-0.17578125 0.43945313v69.52148437z m326.77734376-109.95117187z m-283.53515626-70.04882813c-79.54101563 0-144.31640625-64.77539063-144.31640624-144.31640624s64.77539063-144.31640625 144.31640624-144.31640626c79.54101563 0 144.31640625 64.77539063 144.31640626 144.31640626s-64.77539063 144.31640625-144.31640626 144.31640624z m1e-8-218.32031249c-40.78125 0-74.00390625 33.22265625-74.00390625 74.00390624 0 40.78125 33.22265625 74.00390625 74.00390625 74.00390625s74.00390625-33.22265625 74.00390625-74.00390625c0-40.78125-33.22265625-74.00390625-74.00390625-74.00390625z"
                p-id="2760"
                fill="#707070"
              ></path>
            </svg>
          </div>
          <div className={style.item_text}>个人设置</div>
          <div>
            <svg
              className={style.icon_go}
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
            >
              <path
                d="M513.31835938 903.20117188c-8.96484375 0-18.01757813-3.42773438-24.87304688-10.28320313-13.7109375-13.7109375-13.7109375-35.94726563 0-49.74609375l331.69921875-331.69921875-331.69921875-331.78710938c-13.7109375-13.7109375-13.7109375-35.94726563 0-49.74609374 13.7109375-13.7109375 35.94726563-13.7109375 49.74609375 0L894.76367188 486.51171875c13.7109375 13.7109375 13.7109375 35.94726563-1e-8 49.74609375L538.19140625 892.91796875c-6.94335938 6.85546875-15.90820313 10.28320313-24.87304688 10.28320313z"
                p-id="2263"
                fill="#bfbfbf"
              ></path>
            </svg>
          </div>
        </div>

        <div
          className={style.item}
          onClick={() => {
            history.push('/Changepsw')
          }}
        >
          <div>
            <svg
              className={style.icon}
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
            >
              <path
                d="M780.15429688 877.625H246.13085937c-53.34960938 0-96.6796875-43.33007813-96.67968749-96.6796875V506.7265625c0-53.34960938 43.33007813-96.6796875 96.6796875-96.6796875h115.22460937V213.171875c0-52.29492188 43.33007813-94.83398438 96.6796875-94.83398438H568.25c53.34960938 0 96.6796875 42.5390625 96.6796875 94.83398438v104.85351563c0 19.42382813-15.73242188 35.15625-35.15625 35.15624999s-35.15625-15.73242188-35.15625-35.15625V213.171875c0-13.27148438-12.04101563-24.52148438-26.3671875-24.52148438H458.03515625c-14.32617188 0-26.3671875 11.25-26.3671875 24.52148438v196.875h348.48632813c53.34960938 0 96.6796875 43.33007813 96.67968749 96.6796875v274.21875c0 53.26171875-43.33007813 96.6796875-96.6796875 96.6796875zM246.13085937 480.359375c-14.50195313 0-26.3671875 11.86523438-26.36718749 26.3671875v274.21875c0 14.50195313 11.86523438 26.3671875 26.3671875 26.3671875h534.0234375c14.50195313 0 26.3671875-11.86523438 26.3671875-26.3671875V506.7265625c0-14.50195313-11.86523438-26.3671875-26.3671875-26.3671875H246.13085937z m267.01171876 273.33984375c-19.42382813 0-35.15625-15.73242188-35.15625001-35.15625V619.75390625c-6.59179688-7.64648438-10.63476563-17.578125-10.63476562-28.30078125 0-24.43359375 20.56640625-44.296875 45.79101563-44.296875 25.22460938 0 45.79101563 19.86328125 45.79101562 44.296875 0 10.72265625-3.95507813 20.65429688-10.63476563 28.30078125V718.54296875c0 19.42382813-15.73242188 35.15625-35.15624999 35.15625z"
                p-id="3119"
                fill="#707070"
              ></path>
            </svg>
          </div>
          <div className={style.item_text}>修改密码</div>
          <div>
            <svg
              className={style.icon_go}
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2262"
              width="20"
              height="20"
            >
              <path
                d="M513.31835938 903.20117188c-8.96484375 0-18.01757813-3.42773438-24.87304688-10.28320313-13.7109375-13.7109375-13.7109375-35.94726563 0-49.74609375l331.69921875-331.69921875-331.69921875-331.78710938c-13.7109375-13.7109375-13.7109375-35.94726563 0-49.74609374 13.7109375-13.7109375 35.94726563-13.7109375 49.74609375 0L894.76367188 486.51171875c13.7109375 13.7109375 13.7109375 35.94726563-1e-8 49.74609375L538.19140625 892.91796875c-6.94335938 6.85546875-15.90820313 10.28320313-24.87304688 10.28320313z"
                p-id="2263"
                fill="#bfbfbf"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className={style.exit}>
        <button
          className={style.btn}
          onClick={async () => {
            await api.logout()
            store.setNull()
            history.push('/')
            return Toast('退出登陆成功！')
          }}
        >
          退出账号
        </button>
      </div>
    </div>
  )
}