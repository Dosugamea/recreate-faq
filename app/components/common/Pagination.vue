<script setup lang="ts">
defineProps<{
  currentPage: number
  totalPages: number
  currentRange: string
}>()

defineEmits<{
  (e: 'update:currentPage', page: number): void
}>()
</script>

<template>
  <div class="mt-8 flex justify-between items-center bg-gray-100 p-2 rounded">
    <button
      :disabled="currentPage === 1"
      class="bg-gray-400 hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold py-2 px-4 rounded-sm flex items-center gap-1"
      @click="$emit('update:currentPage', currentPage - 1)"
    >
      <i class="fas fa-chevron-left" /> 前の10件
    </button>

    <div
      class="relative bg-white border border-gray-300 text-gray-700 font-bold text-sm py-1 px-4 rounded-sm min-w-[100px] text-center"
    >
      {{ currentRange }}
    </div>

    <button
      :disabled="currentPage >= totalPages"
      class="bg-gray-600 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold py-2 px-4 rounded-sm flex items-center gap-1"
      @click="$emit('update:currentPage', currentPage + 1)"
    >
      次の10件 <i class="fas fa-chevron-right" />
    </button>
  </div>
</template>
