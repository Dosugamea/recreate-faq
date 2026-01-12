import type { Meta, StoryObj } from '@storybook/vue3'
import Footer from '@/components/Footer.vue'

const meta = {
  title: 'Root/Footer',
  component: Footer,
  tags: ['autodocs'],
  args: {
    copyright: '© 2024 FAQ App',
  },
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomCopyright: Story = {
  args: {
    copyright: '© 2025 Custom Company',
  },
}
