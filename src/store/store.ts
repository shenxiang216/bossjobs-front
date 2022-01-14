import { makeAutoObservable } from 'mobx'

class Store {
  username: string = ''
  nickname: string = ''
  avater: string = ''
  photo: string = ''
  setPhoto(value: string) {
    this.photo = value
  }
  setUsername(value: string) {
    this.username = value
  }

  setNickname(value: string) {
    this.nickname = value
  }

  setAvater(value: string) {
    this.avater = value
  }

  setNull() {
    this.username = ''
    this.avater = ''
    this.nickname = ''
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default new Store()
