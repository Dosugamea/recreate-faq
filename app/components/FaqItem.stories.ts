import type { Meta, StoryObj } from '@storybook/vue3'
import FaqItem from '@/components/FaqItem.vue'

const meta = {
  title: 'FAQ/FaqItem',
  component: FaqItem,
  tags: ['autodocs'],
  args: {
    question: 'How do I reset my password?',
    answer:
      'You can reset your password by clicking on the "Forgot Password" link on the login page.',
  },
} satisfies Meta<typeof FaqItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LongContent: Story = {
  args: {
    question:
      'This is a very long question that might wrap to multiple lines to test how the component handles large amounts of text in the question area?',
    answer:
      'Here is an equally long answer to demonstrate the expansion capability and text wrapping properties of the answer section. It should contain enough text to ensure that it looks good even when there is a lot of content.\n\nIt also supports multiple paragraphs as shown here.',
  },
}
