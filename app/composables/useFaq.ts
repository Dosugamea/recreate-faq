import type { FaqApiResponse } from '@/types'

export const useFaq = async () => {
  const { data: response } = await useFetch<FaqApiResponse>('/api/faq')
  const faqs = computed(() => response.value?.faqs || [])

  const searchQuery = ref('')
  const sortOrder = ref('default') // default, helpful, new
  const currentPage = ref(1)
  const itemsPerPage = 10

  // Filter for main list
  const filteredAllFaqs = computed(() => {
    if (!faqs.value) return []

    let result = [...faqs.value]

    // Search
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter((faq) => {
        return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q)
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

  // Top 5 for "Most Viewed"
  const mostViewedFaqs = computed(() => {
    if (!faqs.value) return []
    // If filtering is active (searchQuery is set), we might want to hide "Most Viewed" or show filtered?
    // Original logic: "Most Viewed" is only shown when !searchQuery.
    // So here we just calculate the top 5 from *all* faqs, unrelated to filtering.
    return [...faqs.value]
      .sort((a, b) => parseInt(b.view_count) - parseInt(a.view_count))
      .slice(0, 5)
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

  // Reset page on filter change
  watch([searchQuery, sortOrder], () => {
    currentPage.value = 1
  })

  return {
    response,
    faqs,
    searchQuery,
    sortOrder,
    currentPage,
    itemsPerPage,
    filteredAllFaqs,
    mostViewedFaqs,
    paginatedFaqs,
    totalPages,
    currentRange,
  }
}
