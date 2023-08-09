<template>
  <v-card height="100%" title="订阅链接" class="d-flex flex-column align-space-between">
    <v-card-text>
      <v-dialog v-model="qrcodeDialog" width="auto">
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-qrcode" v-bind="props" />
        </template>
        <v-card>
          <v-card-text class="text-center">
            <qrcode-vue :value="userSubscribe?.subscribe_url" :size="128" />
            <p>使用支持扫码的客户端进行订阅</p>
          </v-card-text>
          <v-card-actions>
            <v-btn block @click="qrcodeDialog = false">关闭</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-text>

    <v-card-actions>
      <v-btn prepend-icon="mdi-content-copy" @click="copyEvent(userSubscribe?.subscribe_url)">复制链接</v-btn>
      <v-btn @click="clashInstallConfig(userSubscribe?.subscribe_url)">
        导入到 Clash
        <template v-slot:prepend>
          <v-img width="18" :src="clashIcon" />
        </template>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { IUserSubscribe } from '../interface/userInterface';
import clashIcon from '../assets/images/icon/clash.svg';
import { useClipboard } from '@vueuse/core'
import message from 'vue-m-message';
import { clashInstallConfig } from '../utils/urlUtils';
import QrcodeVue from 'qrcode.vue';

const auth_data = useLocalStorage('auth_data', '');

const userSubscribe: Ref<IUserSubscribe | undefined> = ref();

const subscribeUrl = ref('');

const qrcodeDialog = ref(false);

const getUserSubscribe = () => {
  fetch('/api/v1/user/getSubscribe', { headers: { authorization: auth_data.value } })
    .then(response => response.json())
    .then(response => {
      userSubscribe.value = response.data;
      subscribeUrl.value = response.data.subscribe_url;
    })
    .catch(err => console.error(err));
};

const copyEvent = async (string: string | undefined) => {
  const { copy, copied } = useClipboard();
  if (string) {
    await copy(string);
    if (copied.value) message.success('链接复制成功！');
    else message.error('链接复制失败！请检查浏览器！');
  };
};

onMounted(() => {
  getUserSubscribe();
});
</script>