<script setup lang="ts">
import { ErrorComponent } from '@benjavicente/vue-router'
import type { ErrorComponentProps } from '@benjavicente/vue-router'

const props = defineProps<ErrorComponentProps>()
</script>

<template>
  <ErrorComponent :error="props.error" />
</template>
