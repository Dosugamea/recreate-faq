import type { Meta, StoryObj } from '@storybook/vue3'
import TabNavigation from '@/components/common/TabNavigation.vue'

const meta = {
  title: 'Common/TabNavigation',
  component: TabNavigation,
  tags: ['autodocs'],
  args: {
    activeTab: 'faq',
  },
} satisfies Meta<typeof TabNavigation>

export default meta
type Story = StoryObj<typeof meta>

export const FaqActive: Story = {}

export const InquiryActive: Story = {
  args: {
    activeTab: 'inquiry',
  },
}
