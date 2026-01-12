<script setup lang="ts">
defineProps<{
  modelValue: boolean
  id: string
  label: string
  required?: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <div class="text-center mb-8">
    <div class="inline-flex items-center gap-2 cursor-pointer select-none">
      <input
        :id="id"
        type="checkbox"
        :checked="modelValue"
        :required="required"
        class="w-5 h-5 text-kirara-green focus:ring-kirara-green border-gray-300 rounded"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      />
      <label :for="id" class="font-bold text-sm text-gray-800 cursor-pointer">
        {{ label }}
      </label>
    </div>
  </div>
</template>
