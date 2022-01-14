import axios from 'axios'
import {
  ICompany,
  IHotCompanies,
  IHotJobs,
  IJobs,
  IUser,
  salary,
} from '../types'

interface BaseRes {
  stat: string
  message?: string
}

interface LoginRes extends BaseRes {
  token: string
  data: IUser
}

interface UserInfo extends BaseRes {
  data: IUser
}
interface UserInterest extends BaseRes {
  rows: IUser
}
interface Jobs extends BaseRes {
  rows: IJobs[]
}

interface JobDetail extends BaseRes {
  data: {
    job: IJobs
    company: ICompany
    issuer: IUser
  }
}

interface Hot extends BaseRes {
  hotJobs: IHotJobs[]
  hotCompanys: IHotCompanies[]
}

interface Company extends BaseRes {
  data: {
    companyResult: ICompany
    jobsCount: number
  }
}

// user.router.ts
/**
 * 1、用户端登陆
 * @param username
 * @param password
 * @returns
 */
export function login(username: string, password: string) {
  return axios.post<LoginRes>('/api/user/login', {
    username,
    password,
  })
}

/**
 * 2、、用户端登出
 * @returns
 */
export function logout() {
  return axios.post<BaseRes>('api/user/exit')
}

/**
 * 3、用户端用户信息
 * @returns
 */
export function getUserInfo() {
  return axios.post<UserInfo>('/api/user/userinfo')
}

/**
 * 4、用户端修改个人信息 调用即是修改 非查看接口！
 * @returns
 */
export function changeUserInfo() {
  return axios.post<BaseRes>('/api/user/settings')
}

/**
 * 5、用户端修改个人密码 调用时需传递 新旧密码
 * @param oldPassword
 * @param newPassword
 * @returns
 */
export function changePassword(oldPassword: string, newPassword: string) {
  return axios.post<BaseRes>('/api/user/settings/password', {
    oldPassword,
    newPassword,
  })
}

/**
 * 6、添加兴趣
 * @param id
 * @returns IUser
 */
export async function addInterest(id: string) {
  let result = await axios.post<BaseRes>('/api/user/addinterest', {
    id,
  })
  return result.data
}

// /**
//  * 7、查看兴趣
//  * @param id
//  * @returns
//  */
export async function findInterest() {
  let result = await axios.post<UserInterest>('/api/user/findinterest')
  return result.data
}

/**
 * 8、删除兴趣
 * @param id
 * @returns
 */
export async function deleteInterest(id: string) {
  let result = await axios.post<BaseRes>('/api/user/deleteinterest', {
    id,
  })
  return result.data
}

/**
 * 1、用户端主页职位推荐（注：需要获取地区，默认全国）
 * @param area
 * @returns
 */
export async function getJobsRecommand(_id: string) {
  let result = await axios.post<Jobs>('/api/jobs/search', _id)
  return result.data
}

//2、搜索功能 一个搜索功能可以实现 1、主页的热招职位 2、职位详情下的相识职位 3、搜索页的所搜索职位

export async function search(
  _id: string,
  jobName?: string,
  city?: string,
  ageLimit?: number,
  degree?: number,
  wages?: salary,
  companySize?: number
) {
  let result = await axios.post<Jobs>('/api/jobs/search', {
    jobName,
    city,
    ageLimit,
    degree,
    wages,
    companySize,
    _id,
  })
  return result.data
}

/**
 * 3、用户端某个职位的职位详情
 * @param _id
 * @returns
 */
export function getJobDetail(id: string) {
  return axios.post<JobDetail>('/api/jobs/jobdetail', {
    id,
  })
}

/**
 * 4、职位详情页面下的相识职位
 * @param _id
 * @returns
 */
export function getSimilarJobs(id: string) {
  return axios.post<Jobs>('/api/jobs/similar', {
    id,
  })
}

// company.router.ts
/**
 * 1、获取公司完整信息 根据公司Id获取公司完整信息
 * @param _id
 * @returns
 */
export function getCompany(id: string) {
  return axios.post<Company>('/api/company/detail', {
    id,
  })
}

/**
 * 2、获取此公司的热招职位列表以及热招职位数量 根据公司id
 * @param id
 * @returns
 */
export function getCompanyHotJobs(_id: string) {
  return axios.post<Jobs>(`/api/company/search/${_id}/hotjob`)
}

/**
 * 3、用户端主页热门职位和企业
 * @returns
 */
export function getHotJobsAndCompanys() {
  return axios.post<Hot>('/api/company/hot')
}
