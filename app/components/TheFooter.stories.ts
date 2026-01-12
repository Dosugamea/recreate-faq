import type { Meta, StoryObj } from '@storybook/vue3'
import TheFooter from '@/components/TheFooter.vue'

const meta = {
  title: 'Root/TheFooter',
  component: TheFooter,
  tags: ['autodocs'],
  args: {
    copyright: '© 2024 FAQ App',
  },
} satisfies Meta<typeof TheFooter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomCopyright: Story = {
  args: {
    copyright: '© 2025 Custom Company',
  },
}
