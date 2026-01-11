<script setup lang="ts">
defineProps<{
  siteName?: string
}>()
</script>

<template>
  <header class="pt-6 pb-4 text-center bg-transparent">
    <h1 class="text-2xl font-bold tracking-wider text-gray-800">
      {{ siteName || 'Loading...' }}
    </h1>
  </header>
</template>
