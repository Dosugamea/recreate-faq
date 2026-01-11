import type { Meta, StoryObj } from '@storybook/vue3'
import FaqSorter from '@/components/faq/FaqSorter.vue'

const meta = {
  title: 'FAQ/FaqSorter',
  component: FaqSorter,
  tags: ['autodocs'],
  args: {
    modelValue: 'default',
  },
} satisfies Meta<typeof FaqSorter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SortedByDate: Story = {
  args: {
    modelValue: 'new',
  },
}
