<script setup lang="ts">
import type { Faq } from '~/types'

defineProps<{
  faqs: Faq[]
}>()
</script>

<template>
  <div>
    <div v-if="faqs.length > 0">
      <FaqItem v-for="faq in faqs" :key="faq.id" :question="faq.question" :answer="faq.answer" />
    </div>
    <div v-else class="text-center py-10 text-gray-400">該当するFAQはありません。</div>
  </div>
</template>
