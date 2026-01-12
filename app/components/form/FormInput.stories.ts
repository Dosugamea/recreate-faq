import type { Meta, StoryObj } from '@storybook/vue3'
import FormInput from '@/components/form/FormInput.vue'

const meta = {
  title: 'form/FormInput',
  component: FormInput,
  tags: ['autodocs'],
  args: {
    modelValue: '',
    id: 'test-input',
    label: 'Test Input',
  },
} satisfies Meta<typeof FormInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = {
  args: {
    modelValue: 'Initial Value',
  },
}

export const Required: Story = {
  args: {
    required: true,
    label: 'Required Input',
  },
}

export const Email: Story = {
  args: {
    type: 'email',
    label: 'Email Input',
  },
}
