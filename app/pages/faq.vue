<script setup lang="ts">
import { useFaq } from '@/composables/useFaq'
import AppLayout from '@/components/ui/AppLayout.vue'
import FaqSearch from '@/components/faq/FaqSearch.vue'
import FaqList from '@/components/faq/FaqList.vue'
import FaqSorter from '@/components/faq/FaqSorter.vue'
import Pagination from '@/components/common/Pagination.vue'

// FAQのデータやロジックをコンポーザブルから引っこ抜いてくるよ！
const {
  response,
  searchQuery,
  sortOrder,
  currentPage,
  filteredAllFaqs,
  mostViewedFaqs,
  paginatedFaqs,
  totalPages,
  currentRange,
  resetCurrentPage,
} = await useFaq()

// ページメタ情報（タイトルやディスクリプション）をAPIのデータから設定！
useHead({
  title: () => response.value?.meta.title || 'よくあるご質問',
  meta: [
    { name: 'description', content: () => response.value?.meta.description || '' },
    { name: 'keywords', content: () => response.value?.meta.keywords || '' },
  ],
})
</script>

<template>
  <AppLayout :site-name="response?.meta.site_name" :copyright="response?.meta.copyright" active-tab="faq"
    title="よくあるご質問" description="よくお問い合わせいただくご質問とその回答をまとめています。<br>お問い合わせの前にご確認ください。">
    <hr class="border-gray-200 mb-6" />

    <!-- 🔍 検索バーだよ！入力するたびに1ページ目に戻るようにしてるよ -->
    <FaqSearch v-model="searchQuery" @update:model-value="resetCurrentPage" />

    <!-- 🔥 よく見られている質問セクション！検索してない時だけ表示するよ -->
    <div v-if="!searchQuery" class="mb-12">
      <h3 class="text-lg font-bold text-gray-800 mb-2">よく見られているご質問</h3>
      <FaqList :faqs="mostViewedFaqs" />
    </div>

    <!-- 📝 検索結果の件数表示だよ -->
    <div v-else class="mb-8">
      <p class="text-gray-500 text-sm">検索結果: {{ filteredAllFaqs.length }}件</p>
    </div>

    <!-- 📚 FAQリスト全体とソート、ページネーションだよ -->
    <div class="border-t border-gray-200 pt-6">
      <FaqSorter v-model="sortOrder" @update:model-value="resetCurrentPage" />
      <FaqList :faqs="paginatedFaqs" />

      <!-- 🔢 ページャーだよ！1ページ以上ある時だけ表示！ -->
      <Pagination v-if="filteredAllFaqs.length > 0" :current-page="currentPage" :total-pages="totalPages"
        :current-range="currentRange" @update:current-page="currentPage = $event" />
    </div>

    <!-- Contact Us Area -->
    <div class="mt-8 border-gray-200 text-center">
      <p class="text-sm text-gray-600 mb-6">
        上記項目で解決しない場合は下記リンクよりお問い合わせください
      </p>
      <NuxtLink to="/inquiry"
        class="bg-kirara-green hover:bg-kirara-green-dark text-white font-bold py-4 px-12 rounded shadow-sm hover:shadow-md transition w-full max-w-md mx-auto flex items-center justify-center gap-3 text-md no-underline">
        <i class="fas fa-envelope" /> お問い合わせへ
      </NuxtLink>
    </div>
  </AppLayout>
</template>
