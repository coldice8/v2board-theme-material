<template>
  <v-overlay :model-value="props.show" persistent class="align-center justify-center text-white">
    <v-progress-circular indeterminate size="64" />
    <p class="mt-2">Loading...</p>
  </v-overlay>
</template>

<script setup lang="ts">
const props = defineProps({
  show: {
    type: Boolean,
    default: true
  }
})
</script>