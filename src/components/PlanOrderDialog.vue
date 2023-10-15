<template>
  <v-dialog v-model="show" max-width="600px" activator="parent">
    <v-card>
      <v-toolbar>
        <v-btn icon="mdi-close" @click="show = false" />
        <v-toolbar-title text="创建订单" />
      </v-toolbar>

      <v-card-text v-if="orderUserPlanFetch">
        <v-alert class="mb-4" :title="orderUserPlanFetch.name">
          <div v-html="orderUserPlanFetch.content" />
        </v-alert>

        <v-select v-model="orderFrom.period" label="付款周期" variant="outlined" :items="orderPlanSelect" item-title="name"
          item-value="value" />

        <v-text-field v-model="orderFrom.coupon_code" label="优惠券" variant="outlined">
          <template v-slot:append-inner>
            <v-btn variant="tonal" prepend-icon="mdi-ticket-percent" rounded @click="userCouponCheck">验证</v-btn>
          </template>
        </v-text-field>

        <v-alert color="pink-accent-4" title="订单总额">
          <P>¥ {{ orderTotal() }} CNY</P>
        </v-alert>
      </v-card-text>

      <v-card-actions>
        <v-btn block prepend-icon="mdi-plus" variant="flat" rounded color="indigo-darken-3" @click="saveOrder">创建订单</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { TUserPlanFetch } from '../interface/userInterface';
import message from 'vue-m-message';

const props = defineProps({
  planId: {
    type: String,
    required: true
  }
});

const show = ref(false);

const auth_data = useLocalStorage('auth_data', '');

const generateOrderPlanSelect = (data: any) => {
  const price = (value: any) => {
    return (Number(value) / 100).toFixed(2)
  };

  const select = [];

  if (data.onetime_price) {
    select.push({
      name: `一次性 - ￥${price(data.onetime_price)}`,
      value: 'onetime_price'
    });
  };

  if (data.three_year_price) {
    select.push({
      name: `三年付 - ￥${price(data.three_year_price)}`,
      value: 'three_year_price'
    });
  };

  if (data.two_year_price) {
    select.push({
      name: `两年付 - ￥${price(data.two_year_price)}`,
      value: 'two_year_price'
    });
  };

  if (data.year_price) {
    select.push({
      name: `年付 - ￥${price(data.year_price)}`,
      value: 'year_price'
    });
  };

  if (data.half_year_price) {
    select.push({
      name: `半年 - ￥${price(data.half_year_price)}`,
      value: 'half_year_price'
    });
  };

  if (data.quarter_price) {
    select.push({
      name: `季付 - ￥${price(data.quarter_price)}`,
      value: 'quarter_price'
    });
  };

  if (data.month_price) {
    select.push({
      name: `月付 - ￥${price(data.month_price)}`,
      value: 'month_price'
    });
  };

  return select;
};

const orderUserPlanFetch = ref<TUserPlanFetch>();

const orderPlanSelect = ref();

const getUserPlanFetch = () => {
  fetch('/api/v1/user/plan/fetch?id=' + props.planId, { headers: { authorization: auth_data.value } })
    .then(response => response.json())
    .then(response => {
      orderUserPlanFetch.value = response.data;
      orderPlanSelect.value = generateOrderPlanSelect(response.data);
    })
    .catch(err => console.error(err));
};

const orderFrom = ref<{
  period: string | null,
  coupon_code: string | null,
}>({
  period: null,
  coupon_code: null
});

const discountData = ref();

const userCouponCheck = () => {
  fetch('/api/v1/user/coupon/check', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'authorization': auth_data.value
    },
    body: new URLSearchParams({
      id: props.planId,
      code: String(orderFrom.value.coupon_code)
    })
  })
    .then(response => response.json())
    .then(response => {
      if (response.data) {
        message.success('优惠券有效！', { zIndex: 3000 });
        discountData.value = response.data;
        console.log(response);
      } else message.error(response.message, { zIndex: 3000 });
    })
    .catch(err => console.error(err));
};

const orderTotal = () => {
  const period = orderFrom.value.period;
  const discount = discountData.value ? discountData.value.value : 0;
  const price = period ? Number(orderUserPlanFetch.value?.[period as keyof TUserPlanFetch]) / 100 : 0;

  if (discountData.value && discountData.value.type === 2) {
    return ((price * (100 - discount) / 100) || 0).toFixed(2);
  } else if (discountData.value && discountData.value.type === 1) {
    return ((price - discount / 100) || 0).toFixed(2);
  } else {
    return '0.00';
  }
  
};

const saveOrder = () => {
  const getBodyParams = (): any => {
    if (orderFrom.value.coupon_code) {
      return {
        plan_id: props.planId,
        period: orderFrom.value.period,
        coupon_code: orderFrom.value.coupon_code
      }
    } else {
      return {
        plan_id: props.planId,
        period: orderFrom.value.period
      }
    }
  };

  fetch('/api/v1/user/order/save', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'authorization': auth_data.value
    },
    body: new URLSearchParams(getBodyParams())
  })
    .then(response => response.json())
    .then(response => {
      if (response.data) message.success('订单创建成功！', { zIndex: 3000 });
      else message.error(response.message, { zIndex: 3000 });
    })
    .catch(err => console.error(err));
};

onMounted(() => {
  getUserPlanFetch()
});
</script>