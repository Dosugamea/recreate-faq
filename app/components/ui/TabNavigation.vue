<script setup lang="ts">
defineProps<{
  activeTab: 'faq' | 'inquiry'
}>()
</script>

<template>
  <div class="flex items-end">
    <!-- FAQ Tab -->
    <div
      v-if="activeTab === 'faq'"
      class="flex-1 sm:flex-none sm:w-1/2 bg-white text-kirara-green font-bold text-center py-4 rounded-none sm:rounded-t-lg border-t-4 border-kirara-green shadow-sm z-10 relative"
    >
      <i class="fas fa-comments mr-2" />よくあるご質問
    </div>
    <NuxtLink
      v-else
      to="/faq"
      class="flex-1 sm:flex-none sm:w-1/2 bg-kirara-gray text-white font-bold text-center py-4 rounded-none sm:rounded-t-lg opacity-90 cursor-pointer hover:opacity-100 transition no-underline"
    >
      <i class="fas fa-comments mr-2" />よくあるご質問
    </NuxtLink>

    <!-- Inquiry Tab -->
    <div
      v-if="activeTab === 'inquiry'"
      class="flex-1 sm:flex-none sm:w-1/2 bg-white text-kirara-green font-bold text-center py-4 rounded-none sm:rounded-t-lg border-t-4 border-kirara-green shadow-sm z-10 relative"
    >
      <i class="fas fa-envelope mr-2" />お問い合わせ
    </div>
    <NuxtLink
      v-else
      to="/inquiry"
      class="flex-1 sm:flex-none sm:w-1/2 bg-kirara-gray text-white font-bold text-center py-4 rounded-none sm:rounded-t-lg opacity-90 cursor-pointer hover:opacity-100 transition no-underline"
    >
      <i class="fas fa-envelope mr-2" />お問い合わせ
    </NuxtLink>
  </div>
</template>
