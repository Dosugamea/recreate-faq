<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const popularKeywords = ['iOS', 'アカウント', '引き継ぎ', '課金']
</script>

<template>
  <div class="mb-8">
    <div class="flex flex-col sm:flex-row gap-2 mb-4">
      <input
        type="text"
        :value="modelValue"
        placeholder="質問文を検索いただけます"
        class="flex-1 border border-gray-300 p-3 rounded-none focus:border-kirara-green focus:ring-1 focus:ring-kirara-green outline-none text-gray-700"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <button
        class="bg-kirara-green hover:bg-kirara-green-dark text-white font-bold px-8 py-3 rounded-sm transition flex items-center justify-center gap-2"
      >
        <i class="fas fa-search" />
        検索
      </button>
    </div>
    <div class="text-sm text-gray-600">
      <span class="font-bold block sm:inline mb-1 sm:mb-0">検索上位ワード：</span>
      <div class="inline-flex flex-wrap gap-3 ml-0 sm:ml-2">
        <button
          v-for="word in popularKeywords"
          :key="word"
          class="text-kirara-green hover:underline cursor-pointer"
          @click="$emit('update:modelValue', word)"
        >
          {{ word }}
        </button>
      </div>
    </div>
  </div>
</template>
