import type { Meta, StoryObj } from '@storybook/vue3'
import Header from '@/components/Header.vue'

const meta = {
  title: 'Root/Header',
  component: Header,
  tags: ['autodocs'],
  args: {
    siteName: 'FAQ App',
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomTitle: Story = {
  args: {
    siteName: 'My Awesome FAQ',
  },
}
