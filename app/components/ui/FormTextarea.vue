<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string
    id: string
    label?: string
    rows?: number
    required?: boolean
  }>(),
  {
    rows: 6,
    required: false,
    label: '',
  }
)

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
    <label v-if="label" :for="id" class="sm:w-1/3 font-bold text-sm pt-2 text-right-sm">
      {{ label }}<span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="flex-1">
      <textarea
        :id="id"
        :value="modelValue"
        :required="required"
        :rows="rows"
        class="w-full border border-gray-300 p-2 text-sm rounded-sm focus:border-kirara-green focus:ring-1 focus:ring-kirara-green outline-none resize-none"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      />
      <p v-if="$slots.help" class="text-xs text-gray-500 mt-1">
        <slot name="help" />
      </p>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 640px) {
  .text-right-sm {
    text-align: right;
  }
}
</style>
