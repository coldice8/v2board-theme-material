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

/**
 * 节点信息
 * @property {number} id - ID
 * @property {string[]} group_id - 组ID
 * @property {number | null} route_id - 路由ID
 * @property {number | null} parent_id - 父节点ID
 * @property {string[] | null} tags - 节点标签
 * @property {string} rate - 节点倍率
 * @property {string} host - 连接地址
 * @property {number} port - 连接端口
 * @property {number} server_port - 服务端端口
 * @property {number | null} allow_insecure - 允许不安全连接
 * @property {null | string} server_name - 服务名称
 * @property {number} show - 是否展示
 * @property {null} sort - 未知
 * @property {number} created_at - 创建时间
 * @property {number} updated_at - 更新时间
 * @property {string} type - 节点类型
 * @property {number | null} last_check_at - 最后在线时间
 * @property {number} is_online - 是否在线
 * @property {string} cache_key - 缓存key
 * @property {string | null} cipher - 加密方式
 * @property {string | null} obfs - 混淆模式
 * @property {object | null} obfs_settings - 混淆模式参数
 * @property {number | null} up_mbps - 上行速率
 * @property {number | null} down_mbps - 下行速率
 * @property {string | null} server_key - 服务密钥
 * @property {number | null} insecure - 允许不安全
 * @property {number | null} tls - tls参数
 * @property {string | null} network - 传输协议
 * @property {null} rules - 未知
 * @property {object | null} networkSettings - VMESS 参数
 * @property {object | null} tlsSettings - VMESS 参数
 * @property {object | null} ruleSettings - VMESS 参数
 * @property {object | null} dnsSettings - VMESS 参数
 */
export type TUserServerFetch = {
  id: number;
  group_id: string[];
  route_id: number | null;
  parent_id: number | null;
  tags: string[] | null;
  name: string;
  rate: string;
  host: string;
  port: number;
  server_port: number;
  allow_insecure: number | null;
  server_name: null | string;
  show: number;
  sort: null;
  created_at: number;
  updated_at: number;
  type: string;
  last_check_at: number | null;
  is_online: number;
  cache_key: string;
  cipher: string | null;
  obfs: string | null;
  obfs_settings: object | null;
  up_mbps: number | null;
  down_mbps: number | null;
  server_key: string | null;
  insecure: number | null;
  tls: number | null;
  network: string | null;
  rules: null;
  networkSettings: object | null;
  tlsSettings: object | null;
  ruleSettings: object | null;
  dnsSettings: object | null;
}[];


/**
 * 订单信息
 * @property {number | null} invite_user_id - 邀请人ID
 * @property {number} plan_id - 订阅计划
 * @property {number | null} coupon_id - 优惠券ID
 * @property {number | null} payment_id - 付款方式ID
 * @property {number} type - 类型
 * @property {string} period - 付款周期
 * @property {string} trade_no - 订单号
 * @property {string} callback_no - 回调单号
 * @property {number} total_amount - 总金额
 * @property {number | null} handling_amount - 未知
 * @property {number | null} discount_amount - 折扣金额
 * @property {number | null} surplus_amount - 剩余金额
 * @property {number | null} refund_amount - 退款金额
 * @property {number} balance_amount - 余额
 * @property {null} surplus_order_ids - 剩余订单 ID
 * @property {number} status - 状态
 * @property {number} commission_status - 佣金状态
 * @property {number} commission_balance - 佣金余额
 * @property {number | null} actual_commission_balance - 实际佣金余额
 * @property {number} paid_at - 付款时间
 * @property {number} created_at - 创建时间
 * @property {number} updated_at - 更新时间
 * @property {Plan} plan - 订阅计划
 */
export type TUserOrderFetch = {
  invite_user_id: number | null;
  plan_id: number;
  coupon_id: number | null;
  payment_id: number | null;
  type: number;
  period: string;
  trade_no: string;
  callback_no: string;
  total_amount: number;
  handling_amount: number | null;
  discount_amount: number | null;
  surplus_amount: number | null;
  refund_amount: number | null;
  balance_amount: number;
  surplus_order_ids: null;
  status: number;
  commission_status: number;
  commission_balance: number;
  actual_commission_balance: number | null;
  paid_at: number;
  created_at: number;
  updated_at: number;
  plan: TUserPlanFetch;
}[];

/**
 * 流量记录
 * @property {number} id - ID
 * @property {number} user_id - 用户ID
 * @property {string} server_rate - 服务器速率
 * @property {number} u - 上传量
 * @property {number} d - 下载量
 * @property {string} record_type - 记录类型
 * @property {number} record_at - 记录时间
 * @property {number} created_at - 创建时间
 * @property {number} updated_at - 更新时间
 */
export type TUserStatTrafficLog = {
  id: number;
  user_id: number;
  server_rate: string;
  u: number;
  d: number;
  record_type: string;
  record_at: number;
  created_at: number;
  updated_at: number;
}[];

/**
 * 工单信息
 * @property {number} created_at - 创建时间
 * @property {number} id - ID
 * @property {number} level - 等级
 * @property {number} reply_status - 回复状态
 * @property {number} status - 工单状态
 * @property {string} subject - 工单主题
 * @property {number} updated_at - 更新时间
 * @property {number} user_id - 用户ID
 */
export type TUserTicket = {
  created_at: number;
  id: number;
  level: number;
  reply_status: number;
  status: number;
  subject: string;
  updated_at: number;
  user_id: number;
}[];

/**
 * 工单信息
 * @property {number} id - ID
 * @property {number} user_id - 用户ID
 * @property {string} subject - 工单主题
 * @property {number} level - 等级
 * @property {number} status - 工单状态
 * @property {number} reply_status - 回复状态
 * @property {number} created_at - 创建时间
 * @property {number} updated_at - 更新时间
 * @property {array} message - 工单消息
 * @property {number} message[].id - 消息ID
 * @property {number} message[].user_id - 用户ID
 * @property {number} message[].ticket_id - 工单ID
 * @property {string} message[].message - 消息内容
 * @property {number} message[].created_at - 创建时间
 * @property {number} message[].updated_at - 更新时间
 * @property {number} message[].is_me - 是不是自己发的
 */
export type TUserTicketDetail = {
  id: number;
  user_id: number;
  subject: string;
  level: number;
  status: number;
  reply_status: number;
  created_at: number;
  updated_at: number;
  message: {
    id: number;
    user_id: number;
    ticket_id: number;
    message: string;
    created_at: number;
    updated_at: number;
    is_me: boolean;
  }[];
};