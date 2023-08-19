<template>
  <div class="d-flex justify-end mb-2">
    <v-btn rounded color="indigo" prepend-icon="mdi-ticket">
      新建工单
      <v-dialog v-model="newTicketDialog" activator="parent" max-width="480px">
        <v-card>
          <v-toolbar>
            <v-btn icon="mdi-close" @click="newTicketDialog = false" />
            <v-toolbar-title text="新建工单" />
          </v-toolbar>

          <v-card-text>
            <v-text-field v-model="newTicketForm.subject" label="主题" variant="outlined" density="compact" />
            <v-select v-model="newTicketForm.level" label="等级" variant="outlined" density="compact"
              :items="levelItems" item-title="name" item-value="value" />
            <v-textarea v-model="newTicketForm.message" label="内容" hide-details variant="outlined" density="compact" auto-grow />
          </v-card-text>

          <v-card-actions>
            <v-btn rounded block color="indigo" variant="tonal" @click="requestUserTicketSave">提交</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
  </div>

  <v-card v-if="userTicket">
    <v-card-text>
      <v-table v-if="userTicket[0]">
        <thead>
          <tr>
            <th>主题</th>
            <th>工单级别</th>
            <th>工单状态</th>
            <th>创建时间</th>
            <th>最后回复</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in userTicket">
            <td>{{ item.subject }}</td>
            <td>
              <v-chip v-if="item.level == 2" color="red" size="small" text="高" />
              <v-chip v-else-if="item.level == 1" color="blue" size="small" text="中" />
              <v-chip v-else-if="item.level == 0" size="small" text="低" />
            </td>
            <td>
              <v-chip v-if="item.reply_status == 0 && item.status == 0" color="red" size="small" text="待回复" />
              <v-chip v-else-if="item.reply_status == 1 && item.status == 0" color="blue" size="small" text="等待回复" />
              <v-chip v-else-if="item.reply_status == 0 && item.status == 0" color="blue" size="small" text="已回复" />
              <v-chip v-else-if="item.status == 1" color="green" size="small" text="已关闭" />
            </td>
            <td>{{ convertTimestampToDateTime(item.created_at) }}</td>
            <td>{{ convertTimestampToDateTime(item.updated_at) }}</td>
            <td>
              <v-btn size="small" variant="outlined" class="mr-2" @click="getUserTicketFetchById(item.id)">查看</v-btn>
              <v-btn size="small" variant="outlined" color="red" :disabled="item.status == 1"
                @click="closeTicketById(item.id)">关闭</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>

      <v-alert v-else text="暂无数据" variant="tonal" />
    </v-card-text>
  </v-card>

  <v-dialog v-model="meassageDialog" scrollable persistent max-width="600px" min-height="600px">
    <v-card height="90vh">
      <v-toolbar>
        <v-btn icon="mdi-close" @click="closeDialog" />
        <v-toolbar-title :text="`主题: ${userTicketDetail?.subject}`" />
      </v-toolbar>

      <v-divider />

      <v-card-text height="100%">
        <MessageItem v-for="item in userTicketDetail?.message" :data="item" class="mb-2" />
      </v-card-text>

      <v-divider />

      <v-card-actions class="ma-2">
        <v-textarea v-model="userInput" hide-details label="输入消息" variant="outlined" density="compact" rows="1" auto-grow>
          <template v-slot:append>
            <v-btn variant="tonal" prepend-icon="mdi-send" rounded
              @click="requestUserTicketReply(Number(userTicketDetail?.id), userInput)">发送</v-btn>
          </template>
        </v-textarea>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { TUserTicket, TUserTicketDetail } from '../../interface/userInterface';
import { convertTimestampToDateTime } from '../../utils/numberUtils';
import message from 'vue-m-message';

const auth_data = useLocalStorage('auth_data', '');

const userTicket = ref<TUserTicket>();

const getUserTicketFetch = () => {
  fetch('/api/v1/user/ticket/fetch', { headers: { authorization: auth_data.value } })
    .then(response => response.json())
    .then(response => userTicket.value = response.data)
    .catch(err => console.error(err));
};

const closeTicketById = (id: number) => {
  fetch('/api/v1/user/ticket/close', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'authorization': auth_data.value
    },
    body: new URLSearchParams({ id: String(id) })
  })
    .then(response => response.json())
    .then(response => {
      if (response.data) {
        getUserTicketFetch();
        message.success('关闭成功');
      } else message.error(response.message);
    })
    .catch(err => console.error(err));
};

const meassageDialog = ref(false);

let realTime: number;

const closeDialog = () => {
  meassageDialog.value = false;
  clearInterval(realTime);
  realTime = 0;
};

const userTicketDetail = ref<TUserTicketDetail>();

const getUserTicketFetchById = (id: number) => {
  fetch('/api/v1/user/ticket/fetch?id=' + id, { headers: { authorization: auth_data.value } })
    .then(response => response.json())
    .then(response => {
      userTicketDetail.value = response.data;
      if (!realTime) realTime = setInterval(() => {
        getUserTicketFetchById(Number(userTicketDetail.value?.id));
      }, 1000);
      meassageDialog.value = true;
    })
    .catch(err => console.error(err));
};

const userInput = ref();

const requestUserTicketReply = (id: number, text: string) => {
  fetch('/api/v1/user/ticket/reply', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'authorization': auth_data.value
    },
    body: new URLSearchParams({ id: String(id), message: text })
  })
    .then(response => response.json())
    .then(response => {
      if (response.data) {
        message.success('发送成功！', { zIndex: 3000 });
        userInput.value = '';
        getUserTicketFetchById(id);
      }
      else message.error(response.message, { zIndex: 3000 });
    })
    .catch(err => console.error(err));
};

const newTicketDialog = ref(false);

const newTicketForm = ref({
  subject: '',
  level: null,
  message: ''
});

const levelItems = ref([
  { name: '低', value: '0' },
  { name: '中', value: '1' },
  { name: '高', value: '2' },
]);

const requestUserTicketSave = () => {
  if (newTicketForm.value.subject == '') message.error('主题不能为空！', { zIndex: 3000 });
  else if (newTicketForm.value.level == null) message.error('请选择等级！', { zIndex: 3000 });
  else if (newTicketForm.value.message == '') message.error('内容不能为空！', { zIndex: 3000 });
  else {
    fetch('/api/v1/user/ticket/save', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'authorization': auth_data.value
    },
    // @ts-ignore
    body: new URLSearchParams(newTicketForm.value)
  })
    .then(response => response.json())
    .then(response => {
      if (response.data) {
        message.success('创建成功！', { zIndex: 3000 });
        newTicketDialog.value = false;
        getUserTicketFetch();
      } else message.error(response.message, { zIndex: 3000 });
    })
    .catch(err => console.error(err));
  }
}

onMounted(() => {
  getUserTicketFetch();
});
</script>