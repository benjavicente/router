<script setup lang="ts">
import { ErrorComponent } from '@benjavicente/vue-router'
import type { ErrorComponentProps } from '@benjavicente/vue-router'

defineProps<ErrorComponentProps>()
</script>

<template>
  <ErrorComponent :error="error" />
</template>
