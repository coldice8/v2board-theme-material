<template>
  <v-card class="mt-2 rounded-pill" flat title="Material Board" />

  <v-list mandatory :value="selected">
    <v-list-item v-for="(item, index) in items" :value="index" :to="item.to" :prepend-icon="item.icon" :title="item.name"
      rounded="xl" color="blue-darken-4" />
  </v-list>
</template>

<script setup lang="ts">
const selected = ref(0);

const items = ref([
  { name: '主页', to: '/dashboard', icon: 'mdi-monitor-dashboard' },
]);
</script>
