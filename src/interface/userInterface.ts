export interface IUserInfo {
  avatar_url: string,
  balance: number,
  banned: number,
  commission_balance: number,
  commission_rate: number | null,
  created_at: number,
  discount: number | null,
  email: string,
  expired_at: number | null,
  last_login_at: string | null,
  plan_id: number | null,
  remind_expire: number | null,
  remind_traffic: number | null,
  telegram_id: number | null,
  transfer_enable: number | null,
  uuid: string,
};

interface IUserSubscribeDataPlan {
  id: number;
  group_id: number;
  transfer_enable: number;
  name: string;
  speed_limit: number;
  show: number;
  sort: null | any;
  renew: number;
  content: string;
  month_price: number;
  quarter_price: number;
  half_year_price: number;
  year_price: number;
  two_year_price: number;
  three_year_price: number;
  onetime_price: number;
  reset_price: number;
  reset_traffic_method: null | any;
  capacity_limit: number;
  created_at: number;
  updated_at: number;
};

export interface IUserSubscribe {
  plan_id: number;
  token: string;
  expired_at: number;
  u: number;
  d: number;
  transfer_enable: number;
  email: string;
  uuid: string;
  plan: IUserSubscribeDataPlan;
  subscribe_url: string;
  reset_day: number;
};

/**
 * 代办事项
 * @property {number} 0 - 待付订单
 * @property {number} 1 - 代办工单
 * @property {number} 2 - 待确认邀请
 */
export type TUserStat = {
  0: number;
  1: number;
  2: number;
};

/**
 * 公告信息
 * @property {number} id - 公告id
 * @property {string} title - 标题
 * @property {string} content - 内容
 * @property {string} show - 是否显示
 * @property {string | null} img_url - 背景图片
 * @property {string[] | null} string - 标签
 * @property {number} created_at - 创建时间
 * @property {number} updated_at - 更新时间
 */
export type TUserNoticeFetch = {
  id: number;
  title: string | null;
  content: string | null;
  show: number;
  img_url: string | undefined;
  tags: string[] | null;
  created_at: number;
  updated_at: number;
}[];

/**
 * 订阅计划
 * @property {number} id - ID
 * @property {number} group_id - 组ID
 * @property {number} transfer_enable - 传输限制
 * @property {string} name - 名称
 * @property {number} speed_limit - 速度限制
 * @property {number} show - 是否显示
 * @property {null} sort - 排序
 * @property {number} renew - 是否续费
 * @property {string} content - 内容
 * @property {number} month_price - 月价格
 * @property {number} quarter_price - 季度价格
 * @property {number} half_year_price - 半年价格
 * @property {number} year_price - 年价格
 * @property {number} two_year_price - 两年价格
 * @property {number} three_year_price - 三年价格
 * @property {number} onetime_price - 一次性价格
 * @property {number} reset_price - 重置价格
 * @property {null} reset_traffic_method - 重置流量方法
 * @property {number} capacity_limit - 容量限制
 * @property {number} created_at - 创建时间戳
 * @property {number} updated_at - 更新时间戳
 */
export type TUserPlanFetch = {
  id: number;
  group_id: number;
  transfer_enable: number;
  name: string;
  speed_limit: number;
  show: number;
  sort: null;
  renew: number;
  content: string;
  month_price: number;
  quarter_price: number;
  half_year_price: number;
  year_price: number;
  two_year_price: number;
  three_year_price: number;
  onetime_price: number;
  reset_price: number;
  reset_traffic_method: null;
  capacity_limit: number;
  created_at: number;
  updated_at: number;
}[];
