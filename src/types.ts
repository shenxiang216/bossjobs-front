import { ObjectId } from "mongodb";

export enum UserRole {
  /**
   * 求职者
   */
  Worker = 1,
  /**
   * 系统管理员
   */
  SuperAdmin = 2,
  /**
   * 企业创建者
   */
  Boss = 3,
  /**
   * 企业管理员
   */
  Admin = 4,
}

export enum Sex {
  /**
   * 男
   */
  Man = 1,
  /**
   * 女
   */
  Woman = 2,
}

export enum Status {
  /**
   * 正常
   */
  Normal = 1,
  /**
   * 禁用，下架
   */
  Offline = 2,
  /**
   * 删除
   */
  Delete = 3,
}

export enum Degree {
  /**
   * 初中及以下
   */
  middle = 1,
   /**
   * 中专/中技
   */
  zhongzhuan = 2,
   /**
   * 高中
   */
  gaozhong = 3,
   /**
   * 大专
   */
  dazhuan = 4,
  /**
   * 本科
   */
  college = 5,
  /**
   * 硕士
   */
  master = 6,
  /**
   * 博士
   */
  doctor = 7,
}

export interface IMap {
  longitude: number;
  latitude: number;
}

export interface IMapCenter {
  _id?: string;
  /**
   * 经度
   */
  longitude: string;
  /**
   * 纬度
   */
  latitude: string;
}

export interface IUser {
  _id?: string;
  /**
   * 角色
   */
  role: UserRole;
  /**
   * 用户名
   */
  username: string;
  /**
   * 密码
   */
  password: string;
  /**
   * 名字
   */
  nickname: string;
  /**
   * 性别
   */
  sex: Sex;
  /**
   * 头像
   */
  photo: string;
  /**
   * 个人职位
   */
  position: string;
  /**
   * 感兴趣(存jobs的id)
   */
  interested?: { id: string; title: string }[];
  /**
   * 状态
   */
  state: Status;
  /**
   * 所属公司
   */
  myCompany: string;
}

export enum size {
  /**
   * 少于20人
   */
  less20 = 1,
  /**
   * 20-99人
   */
  f20t99 = 2,
  /**
   * 100-499人
   */
  f100t499 = 3,
  /**
   * 500-999人
   */
  f500t999 = 4,
  /**
   * 1000-9999人
   */
  f1000t9999 = 5,
  /**
   * 一万人以上
   */
  more = 6,
}

export enum ageLimit {
  /**
   * 在校生
   */
  student = 1,
  /**
   * 应届生
   */
  graduate = 2,
  /**
   * 1年以内
   */
  within1 = 3,
  /**
   * 1-3年
   */
  f1to3 = 4,
  /**
   * 3-5年
   */
  fo3to5 = 5,
  /**
   * 5-10年
   */
  fo5to10 = 6,
  /**
   * 10年以上
   */
  more = 7,
}

export interface ICompany {
  _id: string;
  /**
   * 公司名
   */
  companyName: string;
  /**
   * 公司logo
   */
  companyLogo: string;
  /**
   * 公司描述
   */
  companyIntroduce: string;
  /**
   * 公司地址
   */
  companyAddress: string;
  /**
   * 公司规模
   */
  companySize: number;
  /**
   * 融资情况
   */
  financing: string;
  /**
   * 所处行业
   */
  trade: string;
  /**
   * 更新时间
   */
  refreshTime: string;
  /**
   * 公司状态
   */
  state: Status;
  /**
   * 创始人id
   */
  bossId: string;
}

export interface salary {
  _id?: string;
  /**
   * 最低薪资
   */
  min: number;
  /**
   * 最高薪资
   */
  max: number;
}

export enum exp {
  default = 0,
  /**
   * 默认不限年限
   */
  inSchool = 1,
  /**
   * 在校生
   */
  fresh = 2,
  /**
   * 应届生
   */
  lessOne = 3,
  /**
   * 1年以内
   */
  oneTothree = 4,
  /**
   * 1-3年
   */
  threeTofive = 5,
  /**
   * 3-5年
   */
  fiveToten = 6,
  /**
   * 5-10年
   */
  tenMore = 7,
  /**
   * 十年以上
   */
}

export interface IJobs {
  _id: string;
  /**
   * 职位名称
   */
  title: string;
  /**
   * 职位所在城市
   */
  city: string;
  /**
   * 工作年限要求
   */
  ageLimit: number;
  /**
   * 学历要求
   */
  degree: number;
  /**
   * 职位标题
   */
  label: string[];
  /**
   * 薪资
   */
  wages: salary;
  /**
   * 发放多少月份薪资
   */
  wagesTimes: string;
  /**
   * 更新时间
   */
  refreshTime?: string;
  /**
   * 发布人
   */
  issuer: string;
  /**
   * 职位描述
   */
  decription: string;
  /**
   * 地址
   */
  address: string;
  /**
   * 地址
   */
  addresscode: IMap;
  /**
   * 发布公司Objectid
   */
  ownedCompany: string;
  /**
   * 职位状态
   */
  state?: Status;
  /**
   * 职位发布人头像
   */
  HRavator?: string;
  /**
   * 职位发布人名字
   */
  HRname?: string;
  /**
   * 发布人的职位
   */
  HRposition?: string;
  /**
   * 职位所属公司
   */
  company?: string;
}

export interface IHotJobs {
  _id?: string;
  /**
   * 职位名称
   */
  jobName: string;
}

export interface IHotCompanies {
  _id?: string;
  /**
   * 企业id
   */
  companyId: string;
  /**
   * 企业名称
   */
  companyName: string;
  /**
   * 企业logo
   */
  companyLogo: string;
  /**
   * 企业热招职位
   */
  jobsCount: number;
}

export interface IToken {
  _id?: string;
  /**
   * 用户id
   */
  userId: ObjectId;
  /**
   * 用户token
   */
  userToken: string;
}
