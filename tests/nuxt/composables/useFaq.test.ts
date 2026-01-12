import { describe, it, expect, beforeEach } from 'vitest'
import { registerEndpoint } from '@nuxt/test-utils/runtime'
import { useFaq } from '@/composables/useFaq'

// Mocking useHead since it is used in the component/page context usually,
// but useFaq doesn't call useHead. But wait, useFaq calls useFetch.

describe('useFaq', () => {
  // 各テストの前にAPIのエンドポイントをモック化するよ！
  beforeEach(() => {
    registerEndpoint('/api/faq', () => ({
      meta: {
        site_name: 'Test Site',
        copyright: 'Test Copy',
        title: 'Test Title',
        keywords: 'test',
        description: 'test desc',
      },
      faqs: [
        {
          id: 1,
          question: 'Apple',
          answer: 'A fruit',
          view_count: '10',
          reference_sum: 5,
          updated_at: '2023-01-01T00:00:00',
          category_id: 1,
          display_order: 1,
          reference_yes: '0',
          reference_no: '0',
          edited_at: '',
          created_at: '',
        },
        {
          id: 2,
          question: 'Banana',
          answer: 'Yellow fruit',
          view_count: '20',
          reference_sum: 10,
          updated_at: '2023-01-02T00:00:00',
          category_id: 1,
          display_order: 2,
          reference_yes: '0',
          reference_no: '0',
          edited_at: '',
          created_at: '',
        },
      ],
    }))
  })

  // FAQデータがちゃんと取得できるかチェック！
  it('fetches faqs', async () => {
    const { faqs } = await useFaq()
    expect(faqs.value.length).toBe(2)
  })

  // 検索クエリで正しくフィルタリングされるかチェック！
  it('filters by search query', async () => {
    const { searchQuery, filteredAllFaqs } = await useFaq()

    searchQuery.value = 'Apple'
    expect(filteredAllFaqs.value.length).toBe(1)
    expect(filteredAllFaqs.value[0]!.question).toBe('Apple')
  })

  // 「参考になった順」で正しくソートされるかチェック！
  it('sorts by helpfulness', async () => {
    const { sortOrder, filteredAllFaqs } = await useFaq()

    sortOrder.value = 'helpful'
    // Bananaの方が参考になった数（reference_sum）が多いので、先頭に来るはず！
    expect(filteredAllFaqs.value[0]!.question).toBe('Banana')
  })

  // フィルタを変えただけでは勝手にページが戻らないことを確認！
  // (明示的にresetCurrentPageを呼ぶ仕様になったからね✨)
  it('does not reset currentPage automatically on filter change', async () => {
    const { searchQuery, currentPage } = await useFaq()

    currentPage.value = 2
    searchQuery.value = 'Apple'

    // watchが削除されたので、2のままのはず！
    expect(currentPage.value).toBe(2)
  })

  // resetCurrentPageを呼んだ時にちゃんと1ページ目に戻るかチェック！
  it('resets currentPage when resetCurrentPage is called', async () => {
    const { currentPage, resetCurrentPage } = await useFaq()

    currentPage.value = 2
    resetCurrentPage()

    expect(currentPage.value).toBe(1)
  })
})
