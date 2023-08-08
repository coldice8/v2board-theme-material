<template>
  <v-container class="container d-flex justify-center align-center">
    <v-card width="400">
      <template v-slot:title>Material Board</template>

      <template v-slot:subtitle>这是副标题</template>

      <template v-slot:text>
        <v-text-field v-model="form.email" label="邮箱" type="email" prepend-inner-icon="mdi-email" variant="outlined" />
        <v-text-field v-model="form.password" label="密码" type="password" prepend-inner-icon="mdi-lock" variant="outlined" />
        <v-btn block prepend-icon="mdi-login-variant" @click="login" :loading="loading">登录</v-btn>
      </template>

      <v-card-actions>
        <v-btn size="small">注册</v-btn>
        <v-btn size="small">忘记密码</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import Message from 'vue-m-message';
import { useRouter } from 'vue-router';

const router = useRouter();

const loading = ref(false);

const form = ref({
  email: '',
  password: ''
});

const login = () => {
  if (!form.value.email || !form.value.password) Message.error('邮箱和密码不能为空！');
  else {
    loading.value = true;
    fetch('/api/v1/passport/auth/login', {
      method: 'POST',
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      body: new URLSearchParams(form.value)
    })
      .then(response => response.json())
      .then(response => {
        loading.value = false;
        if (response.message) {
          Message.error(response.message);
          console.log(response);
        } else if (response.data) {
          Message.success('登陆成功，欢迎光临！');
          useLocalStorage('auth_data', response.data.auth_data);
          useLocalStorage('token', response.data.token);
          router.push('/dashboard');
        } else {
          Message.error('未知的错误，请联系管理员！');
          console.log(response);
        }
      })
      .catch(err => {
        Message.error('未知的错误，请联系管理员！');
        console.error(err);
      });
  };
};

onMounted(() => {
  if (useLocalStorage('auth_data', null).value && useLocalStorage('token', null).value) router.push('/dashboard');
});
</script>

<style scoped lang="less">
.container {
  height: 100vh;
  background: linear-gradient(45deg, #ee775226, #e73c7e1f, #83deff7a);
}
</style>