<template>
  <v-row>
    <v-col cols="12">
      <v-alert type="info" text="流量明细仅保留近一个月数据以供查询。" variant="tonal" />
    </v-col>

    <v-col cols="12" v-if="userStatTrafficLog">
      <v-card v-if="userStatTrafficLog[0]">
        <v-card-text>
          <v-table>
            <thead>
              <tr>
                <th>记录时间</th>
                <th>实际上行</th>
                <th>实际下行</th>
                <th>扣费倍率</th>
                <th>合计</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in userStatTrafficLog">
                <td>{{ convertTimestampToDateTime(item.record_at) }}</td>
                <td>{{ formatBytes(item.u) }}</td>
                <td>{{ formatBytes(item.d) }}</td>
                <td>{{ item.server_rate }}</td>
                <td>{{ formatBytes((item.u + item.d) * Number(item.server_rate)) }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>

      <v-alert v-else text="暂无数据" variant="tonal" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { TUserStatTrafficLog } from '../../interface/userInterface';
import { convertTimestampToDateTime, formatBytes } from '../../utils/numberUtils';

const auth_data = useLocalStorage('auth_data', '');

const userStatTrafficLog = ref<TUserStatTrafficLog>();

const getUserStatGetTrafficLog = () => {
  fetch('/api/v1/user/stat/getTrafficLog', { headers: { authorization: auth_data.value } })
    .then(response => response.json())
    .then(response => userStatTrafficLog.value = response.data)
    .catch(err => console.error(err));
};

onMounted(() => {
  getUserStatGetTrafficLog();
});
</script>