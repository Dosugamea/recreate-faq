import type { Meta, StoryObj } from '@storybook/vue3'
import Pagination from '@/components/common/Pagination.vue'

const meta = {
  title: 'Common/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    currentPage: 1,
    totalPages: 10,
    currentRange: '1-10 / 100',
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    currentRange: '41-50 / 100',
  },
}

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    currentRange: '91-100 / 100',
  },
}
