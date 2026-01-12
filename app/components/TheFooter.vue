<script setup lang="ts">
defineProps<{
  copyright?: string
}>()
</script>

<template>
  <footer class="bg-[#333] text-white text-center py-4 mt-4 text-xs">
    <p>{{ copyright || '&copy; App Name' }}</p>
  </footer>
</template>
