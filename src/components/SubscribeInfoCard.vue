<template>
  <v-card v-if="userSubscribe" height="100%" class="mx-auto d-flex flex-column align-space-between" title="我的订阅">
    <v-card-text>
      <div v-if="userSubscribe.plan" class="d-flex justify-space-between align-end">
        <div>
          <h3>{{ userSubscribe.plan.name }}</h3>
          <p>到期时间: {{ convertTimestampToDateTime(userSubscribe.expired_at, false) }}</p>
          <p>重置剩余天数: {{ userSubscribe.plan.capacity_limit }}</p>
          <p>已用: {{ formatBytes(userSubscribe.u + userSubscribe.d) }}</p>
          <p>总计: {{ formatBytes(userSubscribe.transfer_enable) }}</p>
        </div>
        <v-progress-circular :size="96" :width="16" :model-value="getTransferPercentage(userSubscribe)">
          <b>{{ getTransferPercentage(userSubscribe) }}%</b>
        </v-progress-circular>
      </div>

      <div v-else>
        <p>没有订阅信息，请购买订阅</p>
        <v-btn block rounded prepend-icon="mdi-store-plus" class="mt-2">购买订阅</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { IUserSubscribe } from '../interface/userInterface';
import {
  convertTimestampToDateTime,
  getTransferPercentage,
  formatBytes
} from '../utils/numberUtils';

const auth_data = useLocalStorage('auth_data', '');

const userSubscribe: Ref<IUserSubscribe | undefined> = ref();

const getUserSubscribe = () => {
  fetch('/api/v1/user/getSubscribe', { headers: { authorization: auth_data.value } })
    .then(response => response.json())
    .then(response => {
      userSubscribe.value = response.data;
    })
    .catch(err => console.error(err));
};

onMounted(() => {
  getUserSubscribe();
});
</script>
