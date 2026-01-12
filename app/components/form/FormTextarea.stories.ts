import type { Meta, StoryObj } from '@storybook/vue3'
import FormTextarea from '@/components/form/FormTextarea.vue'

const meta = {
  title: 'form/FormTextarea',
  component: FormTextarea,
  tags: ['autodocs'],
  args: {
    modelValue: '',
    id: 'test-textarea',
    label: 'Description',
  },
} satisfies Meta<typeof FormTextarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithContent: Story = {
  args: {
    modelValue: 'Initial content in textarea.',
  },
}

export const Required: Story = {
  args: {
    required: true,
    label: 'Required Description',
  },
}

export const CustomRows: Story = {
  args: {
    rows: 10,
    label: 'Tall Textarea',
  },
}
