import { describe, it, expect, beforeEach } from 'vitest'
import { registerEndpoint } from '@nuxt/test-utils/runtime'
import { useFaq } from '@/composables/useFaq'

// Mocking useHead since it is used in the component/page context usually,
// but useFaq doesn't call useHead. But wait, useFaq calls useFetch.

describe('useFaq', () => {
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

  it('fetches faqs', async () => {
    // We need a component context or setup for useFetch to work with registerEndpoint?
    // Usually tests run in a Nuxt environment with @nuxt/test-utils.

    // We can use runWithContext if needed, but let's try calling it directly inside a setup context wrapper like mountSuspended or just calling it if the environment is set up correctly in vitest.config.

    // Simplest way to test composable that uses auto-imports:
    const { faqs } = await useFaq()
    expect(faqs.value.length).toBe(2)
  })

  it('filters by search query', async () => {
    const { searchQuery, filteredAllFaqs } = await useFaq()

    searchQuery.value = 'Apple'
    expect(filteredAllFaqs.value.length).toBe(1)
    expect(filteredAllFaqs.value[0]!.question).toBe('Apple')
  })

  it('sorts by helpfulness', async () => {
    const { sortOrder, filteredAllFaqs } = await useFaq()

    sortOrder.value = 'helpful'
    // Banana (10) > Apple (5)
    expect(filteredAllFaqs.value[0]!.question).toBe('Banana')
  })
})
