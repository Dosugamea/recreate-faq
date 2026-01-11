<script setup lang="ts">
defineProps<{
  siteName?: string
  copyright?: string
  activeTab: 'faq' | 'inquiry'
  title: string
  description?: string
}>()
</script>

<template>
  <div class="min-h-screen bg-transparent font-maru flex flex-col">
    <Header :site-name="siteName" />

    <div class="flex-grow max-w-[700px] mx-auto px-0 sm:px-4 w-full">
      <!-- Tabs -->
      <UiTabNavigation :active-tab="activeTab" />

      <!-- Main Content Box -->
      <div class="bg-white rounded-none sm:rounded-b-lg shadow-sm border-t-0 p-6 sm:p-10 min-h-[500px]">
        <!-- Page Title & Description -->
        <div class="mb-6">
          <h2 class="text-xl font-bold text-gray-800 border-l-[6px] border-kirara-green pl-4 mb-3">
            {{ title }}
          </h2>
          <p v-if="description" class="text-sm text-gray-600 leading-relaxed" v-html="description" />
        </div>

        <slot />
      </div>
    </div>

    <Footer :copyright="copyright" />
    <ScrollToTop />
  </div>
</template>
