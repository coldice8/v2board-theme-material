<template>
  <v-row>
    <v-col cols="12" sm="6" md="4">
      <v-card height="100%">
        <v-toolbar title="我的账户" />
        <v-card-text class="d-flex flex-column justify-space-between profile">
          <v-alert class="mb-2" color="blue-grey-darken-4" icon="mdi-mail" density="compact">
            <p class="mb-2">账户邮箱</p>
            <p>{{ userInfo?.email }}</p>
          </v-alert>
          <v-alert class="mb-2" color="indigo" icon="mdi-wallet" density="compact">
            <p class="mb-2">账户余额(仅消费)</p>
            <p><span>{{ (Number(userInfo?.balance) / 100).toFixed(2) }}</span> CNY</p>
          </v-alert>
          <v-alert class="mb-2" color="light-blue-darken-4" icon="mdi-clock-check-outline" density="compact">
            <p class="mb-1">账户创建时间</p>
            <p>{{ convertTimestampToDateTime(Number(userInfo?.created_at)) }}</p>
          </v-alert>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" sm="6" md="4">
      <v-card height="100%">
        <v-toolbar title="密码修改" />
        <v-card-text class="full-card-text-with-toolbar d-flex flex-column">
          <v-text-field v-model="passwordFrom.old_password" label="旧密码" variant="outlined" />
          <v-text-field v-model="passwordFrom.new_password" label="新密码" variant="outlined" />
          <div>
            <v-btn block rounded color="indigo" @click="changePassword">确认</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" sm="6" md="4">
      <v-card height="100%">
        <v-toolbar title="通知" />
        <v-card-text>
          <v-alert color="cyan-darken-4" density="compact" class="rounded-pill">
            <v-switch :model-value="Boolean(userInfo?.remind_expire)" hide-details inset density="compact" append-icon="mdi-clock-alert-outline" label="到期邮件提醒"
              @click="userUpdate({ remind_expire: negatedBooleanValueToNumber(Boolean(userInfo?.remind_expire)) })" />
          </v-alert>
          <v-alert color="light-blue-darken-4" density="compact" class="rounded-pill mt-2">
            <v-switch :model-value="Boolean(userInfo?.remind_traffic)" hide-details inset density="compact" append-icon="mdi-lan-disconnect" label="流量邮件提醒"
              @click="userUpdate({ remind_traffic: negatedBooleanValueToNumber(Boolean(userInfo?.remind_traffic)) })" />
          </v-alert>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" sm="6" md="4">
      <v-card height="100%">
        <v-toolbar title="重置订阅信息" />
        <v-card-text class="full-card-text-with-toolbar d-flex flex-column">
          <v-alert class="mb-2" density="compact">
            <p>当你的订阅地址或账户发生泄漏被他人滥用时，可以在此重置订阅信息。避免带来不必要的损失。</p>
          </v-alert>
          <div>
            <v-btn block rounded color="deep-orange-accent-4" @click="userResetSecurity">重置</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { IUserInfo } from '../../interface/userInterface';
import message from 'vue-m-message';
import { convertTimestampToDateTime, negatedBooleanValueToNumber } from '../../utils/numberUtils';

const auth_data = useLocalStorage('auth_data', '');

const userInfo: Ref<IUserInfo | undefined> = ref();

const getUserInfo = () => {
  fetch('/api/v1/user/info', { headers: { authorization: auth_data.value } })
    .then(response => response.json())
    .then(response => userInfo.value = response.data)
    .catch(err => console.error(err));
};

const passwordFrom = ref({
  old_password: '',
  new_password: '',
});

const changePassword = () => {
  fetch('/api/v1/user/changePassword', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'authorization': auth_data.value
    },
    body: new URLSearchParams(passwordFrom.value)
  })
    .then(response => response.json())
    .then(response => {
      if (response.data) message.success('修改成功！');
      else message.error(response.message);
    })
    .catch(err => console.error(err));
};

const userUpdate = (value: any) => {
  fetch('/api/v1/user/update', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'authorization': auth_data.value
    },
    body: new URLSearchParams(value)
  })
    .then(response => response.json())
    .then(response => {
      if (response.data) {
        getUserInfo();
        message.success('修改成功！');
      }
      else message.error(response.message);
    })
    .catch(err => console.error(err));
};

const userResetSecurity = () => {
  fetch('/api/v1/user/resetSecurity', { headers: { authorization: auth_data.value } })
    .then(response => response.json())
    .then(response => {
      if (response.data) message.success('重置成功！')
    })
    .catch(err => console.error(err));
};

onMounted(() => {
  getUserInfo();
});
</script>

<style scoped lang="less">
.profile {
  span {
    font-size: 24px;
  }
}
</style>
