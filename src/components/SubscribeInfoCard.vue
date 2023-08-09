<template>
  <v-card v-if="userSubscribe" class="mx-auto" :title="`我的订阅 ${userSubscribe.plan.name}`">
    <v-card-text>
      <div class="d-flex justify-space-between align-end">
        <div>
          <p>到期时间: {{ convertTimestampToDateTime(userSubscribe.expired_at, false) }}</p>
          <p>重置剩余天数: {{ userSubscribe.plan.capacity_limit }}</p>
          <p>已用: {{ formatBytes(userSubscribe.u + userSubscribe.d) }}</p>
          <p>总计: {{ formatBytes(userSubscribe.transfer_enable) }}</p>
        </div>
        <v-progress-circular :size="96" :width="16" :model-value="getTransferPercentage(userSubscribe)">
          <b>{{ getTransferPercentage(userSubscribe) }}%</b>
        </v-progress-circular>
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
