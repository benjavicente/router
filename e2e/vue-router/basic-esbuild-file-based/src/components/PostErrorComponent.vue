<script setup lang="ts">
import { ErrorComponent } from '@benjavicente/vue-router'

defineProps<{
  error: any
}>()
</script>

<template>
  <ErrorComponent :error="error" />
</template>
