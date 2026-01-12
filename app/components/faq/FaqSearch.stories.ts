import type { Meta, StoryObj } from '@storybook/vue3'
import FaqSearch from '@/components/faq/FaqSearch.vue'

const meta = {
  title: 'FAQ/FaqSearch',
  component: FaqSearch,
  tags: ['autodocs'],
  args: {
    modelValue: '',
  },
} satisfies Meta<typeof FaqSearch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithSearchTerm: Story = {
  args: {
    modelValue: 'Initial Search',
  },
}
