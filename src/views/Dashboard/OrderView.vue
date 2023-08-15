<template>
  <v-card v-if="userOrderFetch">
    <v-card-text>
      <v-table>
        <thead>
          <tr>
            <th>订单号</th>
            <th>周期</th>
            <th>订单金额</th>
            <th>订单状态</th>
            <th>创建时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in userOrderFetch">
            <td>{{ item?.trade_no }}</td>
            <td>
              <v-chip v-if="item?.period == 'month_price'" size="small" text="月付" />
              <v-chip v-else-if="item?.period == 'quarter_price'" size="small" text="季付" />
              <v-chip v-else-if="item?.period == 'half_year_price'" size="small" text="半年" />
              <v-chip v-else-if="item?.period == 'year_price'" size="small" text="一年" />
              <v-chip v-else-if="item?.period == 'two_year_price'" size="small" text="两年" />
              <v-chip v-else-if="item?.period == 'three_year_price'" size="small" text="三年" />
              <v-chip v-else-if="item?.period == 'onetime_price'" size="small" text="一次性" />
            </td>
            <td>{{ item?.total_amount.toFixed(2) }}</td>
            <td>
              <v-chip v-if="item?.status == 0" size="small" color="blue-grey" text="待支付" />
              <v-chip v-else-if="item?.status == 1" size="small" color="orange" text="开通中" />
              <v-chip v-else-if="item?.status == 2" size="small" color="red" text="已取消" />
              <v-chip v-else-if="item?.status == 3" size="small" color="green" text="已完成" />
              <v-chip v-else-if="item?.status == 4" size="small" color="blue" text="已折抵" />
            </td>
            <td>{{ convertTimestampToDateTime(item?.created_at) }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>

  <v-alert v-else type="warning" text="没有订单信息，请购买订阅。" />
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { TUserOrderFetch } from '../../interface/userInterface';
import { convertTimestampToDateTime } from '../../utils/numberUtils';
const auth_data = useLocalStorage('auth_data', '');

const userOrderFetch: Ref<TUserOrderFetch | undefined> = ref();

const getUserOrderFetch = () => {
  fetch('/api/v1/user/order/fetch', { headers: { authorization: auth_data.value } })
    .then(response => response.json())
    .then(response => {
      if (response.data[0]) userOrderFetch.value = response.data;
    })
    .catch(err => console.error(err));
};

onMounted(() => {
  getUserOrderFetch();
});
</script>