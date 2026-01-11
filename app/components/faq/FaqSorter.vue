<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="flex justify-between items-center mb-2">
    <h3 class="text-lg font-bold text-gray-800">よくあるご質問</h3>
    <div class="relative">
      <select
        :value="modelValue"
        class="appearance-none bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      >
        <option value="default">デフォルト</option>
        <option value="helpful">参考になった順</option>
        <option value="new">更新日順</option>
      </select>
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
      >
        <i class="fas fa-caret-down" />
      </div>
    </div>
  </div>
</template>
