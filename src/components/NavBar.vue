<template>
  <v-card class="mt-2 rounded-pill" flat title="Material Board" />

  <v-list mandatory>
    <v-list-item v-for="(item, i) in items" :key="i" :value="item" :prepend-icon="item.icon" :title="item.name"
      color="blue-darken-4" rounded="xl" @click="click(item.to)" />
  </v-list>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const items = ref([
  { name: '主页', to: '/dashboard', icon: 'mdi-monitor-dashboard' },
  { name: '订阅商店', to: '/dashboard/plan', icon: 'mdi-store-plus' },
]);

const click = (to: string) => router.push(to);
</script>
