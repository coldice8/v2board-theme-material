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
