import type { Meta, StoryObj } from '@storybook/vue3'
import FaqList from '@/components/faq/FaqList.vue'

const meta = {
  title: 'FAQ/FaqList',
  component: FaqList,
  tags: ['autodocs'],
  args: {
    faqs: [
      {
        id: 1,
        question: 'Question 1',
        answer: 'Answer 1',
        category_id: 1,
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
        edited_at: '2024-01-01',
        view_count: 10,
        reference_sum: 5,
        display_order: 0,
        reference_yes: 'a',
        reference_no: 'a',
      },
      {
        id: 2,
        question: 'Question 2',
        answer: 'Answer 2',
        category_id: 1,
        created_at: '2024-01-02',
        updated_at: '2024-01-02',
        edited_at: '2024-01-02',
        view_count: 5,
        reference_sum: 2,
        display_order: 0,
        reference_yes: 'a',
        reference_no: 'a',
      },
    ],
  },
} satisfies Meta<typeof FaqList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Empty: Story = {
  args: {
    faqs: [],
  },
}
