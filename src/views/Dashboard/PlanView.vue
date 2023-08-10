<template>
  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="item in userPlanFetch">
      <v-card>
        <v-toolbar :title="item.name" />

        <v-card-item>
          <v-card-title>￥ {{ (item.month_price / 100).toFixed(2) }}</v-card-title>
          <v-card-subtitle v-if="item.month_price">每月</v-card-subtitle>
          <v-card-subtitle v-else-if="item.quarter_price">每季</v-card-subtitle>
          <v-card-subtitle v-else-if="item.half_year_price">半年</v-card-subtitle>
          <v-card-subtitle v-else-if="item.year_price">一年</v-card-subtitle>
          <v-card-subtitle v-else-if="item.two_year_price">两年</v-card-subtitle>
          <v-card-subtitle v-else-if="item.three_year_price">三年</v-card-subtitle>
          <v-card-subtitle v-else-if="item.onetime_price">一次性</v-card-subtitle>
        </v-card-item>

        <v-card-text v-html="item.content" />

        <v-card-actions>
          <v-btn block prepend-icon="mdi-plus" variant="flat" color="indigo-darken-3">立即购买</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { TUserPlanFetch } from '../../interface/userInterface';

const auth_data = useLocalStorage('auth_data', '');

const userPlanFetch: Ref<TUserPlanFetch | undefined> = ref();

const getUserPlanFetch = () => {
  fetch('/api/v1/user/plan/fetch', { headers: { authorization: auth_data.value } })
    .then(response => response.json())
    .then(response => {
      userPlanFetch.value = response.data;
    })
    .catch(err => console.error(err));
};

onMounted(() => {
  getUserPlanFetch();
});
</script>