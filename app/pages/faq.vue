<script setup lang="ts">

interface Faq {
  id: number
  category_id: number
  question: string
  answer: string
  display_order: number
  view_count: string
  reference_yes: string
  reference_no: string
  reference_sum: number
  edited_at: string
  created_at: string
  updated_at: string
}

interface ApiResponse {
  meta: {
    site_name: string
    copyright: string
    title: string
    keywords: string
    description: string
  }
  faqs: Faq[]
}

const { data: response } = await useFetch<ApiResponse>('/api/faq')
const faqs = computed(() => response.value?.faqs || [])

useHead({
  title: () => response.value?.meta.title || 'よくあるご質問',
  meta: [
    { name: 'description', content: () => response.value?.meta.description || '' },
    { name: 'keywords', content: () => response.value?.meta.keywords || '' }
  ]
})

const searchQuery = ref('')
const sortOrder = ref('default') // default, helpful, new
const currentPage = ref(1)
const itemsPerPage = 10

// Top 5 for "Most Viewed"
const mostViewedFaqs = computed(() => {
  if (!faqs.value) return []
  return [...faqs.value]
    .sort((a, b) => parseInt(b.view_count) - parseInt(a.view_count))
    .slice(0, 5)
})

// Filter for main list
const filteredAllFaqs = computed(() => {
  if (!faqs.value) return []
  
  let result = [...faqs.value]

  // Search
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter((faq) => {
      return faq.question.toLowerCase().includes(q) || 
             faq.answer.toLowerCase().includes(q)
    })
  }

  // Sort
  if (sortOrder.value === 'new') {
    result.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
  } else if (sortOrder.value === 'helpful') {
    result.sort((a, b) => b.reference_sum - a.reference_sum)
  }

  return result
})

const totalPages = computed(() => Math.ceil(filteredAllFaqs.value.length / itemsPerPage))

const paginatedFaqs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredAllFaqs.value.slice(start, end)
})

const currentRange = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage + 1
  const end = Math.min(start + itemsPerPage - 1, filteredAllFaqs.value.length)
  if (filteredAllFaqs.value.length === 0) return '0件'
  return `${start}〜${end}件`
})

const popularKeywords = ['iOS', 'アカウント', '引き継ぎ', '課金']

// Reset page on filter change
watch([searchQuery, sortOrder], () => {
  currentPage.value = 1
})
</script>

<template>
  <div class="min-h-screen bg-transparent font-maru flex flex-col">
    <Header :site-name="response?.meta.site_name" />
    
    <div class="flex-grow max-w-[700px] mx-auto px-0 sm:px-4 w-full">
      
      <!-- Tabs -->
      <div class="flex items-end">
        <div class="flex-1 sm:flex-none sm:w-1/2 bg-white text-kirara-green font-bold text-center py-4 rounded-none sm:rounded-t-lg border-t-4 border-kirara-green shadow-sm z-10 relative">
          <i class="fas fa-comments mr-2"></i>よくあるご質問
        </div>
        <NuxtLink to="/inquiry" class="flex-1 sm:flex-none sm:w-1/2 bg-kirara-gray text-white font-bold text-center py-4 rounded-none sm:rounded-t-lg opacity-90 cursor-pointer hover:opacity-100 transition no-underline">
          <i class="fas fa-envelope mr-2"></i>お問い合わせ
        </NuxtLink>
      </div>

      <!-- Main Content Box -->
      <div class="bg-white rounded-none sm:rounded-b-lg shadow-sm border-t-0 p-6 sm:p-10 min-h-[500px]">
        
        <!-- Header Text -->
        <div class="mb-6">
          <h2 class="text-xl font-bold text-gray-800 border-l-[6px] border-kirara-green pl-4 mb-3">
            よくあるご質問
          </h2>
          <p class="text-sm text-gray-600 leading-relaxed">
            よくお問い合わせいただくご質問とその回答をまとめています。<br>
            お問い合わせの前にご確認ください。
          </p>
        </div>

        <hr class="border-gray-200 mb-6" />

        <!-- Search -->
        <div class="mb-8">
          <div class="flex flex-col sm:flex-row gap-2 mb-4">
            <input 
              type="text" 
              v-model="searchQuery"
              placeholder="質問文を検索いただけます" 
              class="flex-1 border border-gray-300 p-3 rounded-none focus:border-kirara-green focus:ring-1 focus:ring-kirara-green outline-none text-gray-700"
            />
            <button class="bg-kirara-green hover:bg-kirara-green-dark text-white font-bold px-8 py-3 rounded-sm transition flex items-center justify-center gap-2">
              <i class="fas fa-search"></i>
              検索
            </button>
          </div>
          <div class="text-sm text-gray-600">
            <span class="font-bold block sm:inline mb-1 sm:mb-0">検索上位ワード：</span>
            <div class="inline-flex flex-wrap gap-3 ml-0 sm:ml-2">
              <button 
                v-for="word in popularKeywords" 
                :key="word" 
                @click="searchQuery = word"
                class="text-kirara-green hover:underline cursor-pointer"
              >
                {{ word }}
              </button>
            </div>
          </div>
        </div>

        <!-- Most Viewed Section (Fixed logic for visual variety) -->
        <div v-if="!searchQuery" class="mb-12">
          <h3 class="text-lg font-bold text-gray-800 mb-2">
            よく見られているご質問
          </h3>
          <FaqItem 
            v-for="faq in mostViewedFaqs" 
            :key="'popular-'+faq.id" 
            :question="faq.question" 
            :answer="faq.answer"
          />
        </div>

        <div v-else class="mb-8">
            <p class="text-gray-500 text-sm">検索結果: {{ filteredAllFaqs.length }}件</p>
        </div>

        <!-- Full List Section with Sort -->
        <div class="border-t border-gray-200 pt-6">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-lg font-bold text-gray-800">
              よくあるご質問
            </h3>
            <div class="relative">
              <select 
                v-model="sortOrder"
                class="appearance-none bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
              >
                <option value="default">デフォルト</option>
                <option value="helpful">参考になった順</option>
                <option value="new">更新日順</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <i class="fas fa-caret-down"></i>
              </div>
            </div>
          </div>

          <div v-if="paginatedFaqs.length > 0">
            <FaqItem 
              v-for="faq in paginatedFaqs" 
              :key="faq.id" 
              :question="faq.question" 
              :answer="faq.answer"
            />
          </div>
          <div v-else class="text-center py-10 text-gray-400">
            該当するFAQはありません。
          </div>

          <!-- Pager -->
          <div v-if="filteredAllFaqs.length > 0" class="mt-8 flex justify-between items-center bg-gray-100 p-2 rounded">
             <button 
                @click="currentPage--" 
                :disabled="currentPage === 1"
                class="bg-gray-400 hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold py-2 px-4 rounded-sm flex items-center gap-1"
             >
                <i class="fas fa-chevron-left"></i> 前の10件
             </button>

             <div class="relative bg-white border border-gray-300 text-gray-700 font-bold text-sm py-1 px-4 rounded-sm min-w-[100px] text-center">
                {{ currentRange }}
             </div>

             <button 
                @click="currentPage++" 
                :disabled="currentPage >= totalPages"
                class="bg-gray-600 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold py-2 px-4 rounded-sm flex items-center gap-1"
             >
                次の10件 <i class="fas fa-chevron-right"></i>
             </button>
          </div>
        </div>

        <!-- Contact Us Area -->
        <div class="mt-8 border-gray-200 text-center">
            <p class="text-sm text-gray-600 mb-6">上記項目で解決しない場合は下記リンクよりお問い合わせください</p>
            <NuxtLink to="/inquiry" class="bg-kirara-green hover:bg-kirara-green-dark text-white font-bold py-4 px-12 rounded shadow-sm hover:shadow-md transition w-full max-w-md mx-auto flex items-center justify-center gap-3 text-md no-underline">
                <i class="fas fa-envelope"></i> お問い合わせへ
            </NuxtLink>
        </div>

      </div>
    </div>
    
    <Footer :copyright="response?.meta.copyright" />
    <ScrollToTop />
  </div>
</template>
