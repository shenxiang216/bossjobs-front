import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Main from '../Main/Main'
import Login from '../Login/Login'
import Search from '../Search/Search'
import Detail from '../Detail/Detail'
import Company from '../Company/Company'
import Home from '../Home/Home'
import Mycollection from '../Mycollection/Mycollection'
import Setting from '../Setting/Setting'
import ChangePsw from '../ChangePsw/ChangePsw'
import { useEffect } from 'react'
import store from '../../store/store'
import * as api from '../../services/api'
export default function App() {
  async function userInfo() {
    const userinfo = await api.getUserInfo()
    if (userinfo.data.stat === 'OK') {
      store.setUsername(userinfo.data.data.username)
      store.setAvater(userinfo.data.data.photo)
      store.setNickname(userinfo.data.data.nickname)
      store.setPhoto(userinfo.data.data.photo)
    }
  }
  useEffect(() => {
    userInfo()
  }, [])
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/search/" component={Search}></Route>
        <Route path="/detail/:id" exact component={Detail}></Route>
        <Route path="/company/:id" component={Company}></Route>
        <Route path="/home/" component={Home}></Route>
        <Route path="/Mycollection/" component={Mycollection}></Route>
        <Route path="/Setting/" component={Setting}></Route>
        <Route path="/ChangePsw/" component={ChangePsw}></Route>
      </Switch>
    </BrowserRouter>
  )
}
