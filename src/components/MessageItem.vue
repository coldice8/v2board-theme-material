<template>
  <div :class="toRight()">
    <div class="d-flex align-end message" :class="selfClass()">
      <v-avatar class="avatar" color="blue-grey-darken-4" :icon="icon()" />
      <v-alert class="alert" min-width="128px" max-width="calc(100vw - 161px - 10%)">
        <div class="text" v-html="props.data.message" />
        <p class="date">{{ convertTimestampToDateTime(props.data.created_at) }}</p>
      </v-alert>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  convertTimestampToDateTime,
} from '../utils/numberUtils';
import { PropType } from 'vue';

const props = defineProps({
  data: {
    type: Object as PropType<{
      id: number;
      user_id: number;
      ticket_id: number;
      message: string;
      created_at: number;
      updated_at: number;
      is_me: boolean;
    }>,
    required: true,
  }
});

const selfClass = () => {
  if (props.data.is_me) return 'self';
  else return '';
};

const icon = () => {
  if (props.data.is_me) return 'mdi-account';
  else return 'mdi-account-card';
};

const toRight = () => {
  if (props.data.is_me) return 'to-right';
  else return '';
};
</script>

<style scoped lang="less">
.to-right {
  display: flex;
  justify-content: flex-end;
}

.message {
  width: fit-content;

  .avatar {
    margin-right: 8px;
  }

  .alert {
    .text {
      width: fit-content;
      white-space: pre-wrap;
    }

    .date {
      font-size: 12px;
      color: #aaa;
      text-align: right;
    }
  }

  &.self {
    flex-direction: row-reverse;

    .avatar {
      margin-right: 0;
      margin-left: 8px;
    }

    .alert {
      .text {
        text-align: right !important;
      }
    }
  }
}
</style>