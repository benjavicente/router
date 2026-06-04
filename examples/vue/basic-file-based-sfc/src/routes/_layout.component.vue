<script setup lang="ts">
import { Outlet } from '@benjavicente/vue-router'
</script>

<template>
  <div class="p-2">
    <div class="border-b">I'm a layout</div>
    <div>
      <Outlet />
    </div>
  </div>
</template>
