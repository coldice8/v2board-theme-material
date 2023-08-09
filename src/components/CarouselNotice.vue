<template>
  <v-carousel v-if="userNoticeFetch" :continuous="false" :show-arrows="false" hide-delimiters height="300" cycle>
    <v-carousel-item v-for="(item, index) in userNoticeFetch">
      <v-card class="ma-1" height="calc(100% - 8px)">
        <v-img class="align-end text-white background-gradient dark" height="100%" cover :src="item.img_url">
          <v-card-title v-text="item.title" />
          <v-card-subtitle v-text="convertTimestampToDateTime(item.updated_at, false)" />

          <v-card-actions>
            <v-btn>
              查看公告
              <v-dialog v-model="noticeDialog[index]" activator="parent" width="400px">
                <v-card>
                  <v-toolbar>
                    <v-btn @click="noticeDialog[index] = false" icon="mdi-close" />
                  </v-toolbar>
                  <v-card-text v-text="item.content" />
                </v-card>
              </v-dialog>
            </v-btn>
          </v-card-actions>
        </v-img>
      </v-card>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { TUserNoticeFetch } from '../interface/userInterface';
import { convertTimestampToDateTime } from '../utils/numberUtils';

const auth_data = useLocalStorage('auth_data', '');

const noticeDialog: Ref<Array<boolean>> = ref([]);

const userNoticeFetch: Ref<TUserNoticeFetch | undefined> = ref();

const getNoticeFetch = () => {
  fetch('/api/v1/user/notice/fetch', { headers: { authorization: auth_data.value } })
    .then(response => response.json())
    .then(response => {
      if (response.data[0]) userNoticeFetch.value = response.data;
    })
    .catch(err => console.error(err));
};

onMounted(() => {
  getNoticeFetch();
});
</script>