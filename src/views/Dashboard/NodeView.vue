<template>
  <v-card v-if="userServerFetch">
    <v-card-text>
      <v-table>
        <thead>
          <tr>
            <th>名称</th>
            <th>节点类型</th>
            <th>状态</th>
            <th>倍率</th>
            <th>标签</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in userServerFetch" :key="item?.id">
            <td>{{ item?.name }}</td>
            <td>{{ item?.type }}</td>
            <td>
              <v-chip v-if="item?.is_online" size="small" color="green" text="在线" />
              <v-chip v-else size="small" color="red" text="离线" />
            </td>
            <td>
              <v-chip size="small" color="teal" :text="`${item?.rate} 倍`" />
            </td>
            <td>
              <v-chip v-for="tag in item?.tags" size="small" color="indigo" variant="outlined" :text="tag" />
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>

  <v-alert v-else type="warning" text="没有可用节点，如果您未订阅或已过期请续费。" />
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { TUserServerFetch } from '../../interface/userInterface';

const auth_data = useLocalStorage('auth_data', '');

const userServerFetch: Ref<TUserServerFetch | undefined> = ref();

const getUserServerFetch = () => {
  fetch('/api/v1/user/server/fetch', { headers: { authorization: auth_data.value } })
    .then(response => response.json())
    .then(response => {
      if (response.data[0]) userServerFetch.value = response.data;
    })
    .catch(err => console.error(err));
};

onMounted(() => {
  getUserServerFetch();
});
</script>