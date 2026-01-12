import type { FaqApiResponse } from '@/types'
import { SORT_ORDER } from '@/composables/useFaqConstants'
import type { SortOrder } from '@/composables/useFaqConstants'

/**
 * FAQ関連のロジックを管理するコンポーザブルだよ！
 * APIからのデータ取得、フィルタリング、ソート、ページネーションをまるっと解決しちゃうよ✨
 */
export const useFaq = async () => {
  // APIからFAQデータを取得するよ！
  const { data: response } = await useFetch<FaqApiResponse>('/api/faq')
  // responseが空っぽのときは空配列を返すようにしてるよ
  const faqs = computed(() => response.value?.faqs || [])

  // 検索クエリ、ソート順、現在のページ番号をリアクティブに管理！
  const searchQuery = ref('')
  const sortOrder = ref<SortOrder>(SORT_ORDER.DEFAULT)
  const currentPage = ref(1)
  const itemsPerPage = 10 // 1ページあたりの表示件数だね！

  /**
   * メインリスト用のフィルタリングとソートを行う算出プロパティだよ！
   * 検索ワードにヒットするかどうか、選ばれたソート順で並び替えるよ✨
   */
  const filteredAllFaqs = computed(() => {
    if (faqs.value.length === 0) return []

    const q = searchQuery.value.toLowerCase()

    // 検索クエリがある場合は、質問文か回答文に含まれているかチェック！
    const filtered = searchQuery.value
      ? faqs.value.filter(
          (faq) => faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q)
        )
      : faqs.value

    // 選択されたソート順に基づいて並び替え！
    switch (sortOrder.value) {
      // 更新日時が新しい順（降順）
      case SORT_ORDER.NEW:
        return filtered.toSorted(
          (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        )
      // 参考になった数が多い順（降順）
      case SORT_ORDER.HELPFUL:
        return filtered.toSorted((a, b) => b.reference_sum - a.reference_sum)
      // デフォルト（並び替えなし）
      default:
        return filtered
    }
  })

  /**
   * 「よく見られている質問」トップ5を抽出するよ！
   * 閲覧数（view_count）が多い順に並べて、上位5件をゲット✨
   */
  const mostViewedFaqs = computed(() => {
    if (!faqs.value) return []
    return faqs.value.toSorted((a, b) => b.view_count - a.view_count).slice(0, 5)
  })

  // 全体のページ数を計算するよ！
  const totalPages = computed(() => Math.ceil(filteredAllFaqs.value.length / itemsPerPage))

  /**
   * 現在のページに表示するFAQだけを切り出すよ！
   */
  const paginatedFaqs = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredAllFaqs.value.slice(start, end)
  })

  /**
   * 現在表示されている件数の範囲（例：1〜10件）を返すよ！
   */
  const currentRange = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage + 1
    const end = Math.min(start + itemsPerPage - 1, filteredAllFaqs.value.length)
    if (filteredAllFaqs.value.length === 0) return '0件'
    return `${start}〜${end}件`
  })

  /**
   * ページを1ページ目に戻す関数だよ！
   * 検索ワードやソート順が変わった時に呼んでね✨
   */
  const resetCurrentPage = () => {
    currentPage.value = 1
  }

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
    resetCurrentPage,
  }
}
