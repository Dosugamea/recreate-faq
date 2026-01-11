<script setup lang="ts">
type Option = {
  value: string
  label: string
}

withDefaults(
  defineProps<{
    modelValue: string
    id: string
    label?: string
    options: Option[]
    required?: boolean
  }>(),
  {
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
      <select
        :id="id"
        :value="modelValue"
        :required="required"
        class="w-full border border-gray-300 p-2 text-sm rounded-sm focus:border-kirara-green focus:ring-1 focus:ring-kirara-green outline-none bg-white"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      >
        <option value="">選択してください</option>
        <option v-for="opt in options" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
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
