import type { Meta, StoryObj } from '@storybook/vue3'
import FormSelect from '@/components/form/FormSelect.vue'

const meta = {
  title: 'form/FormSelect',
  component: FormSelect,
  tags: ['autodocs'],
  args: {
    modelValue: '',
    id: 'test-select',
    label: 'Choose an option',
    options: [
      { value: 'opt1', label: 'Option 1' },
      { value: 'opt2', label: 'Option 2' },
      { value: 'opt3', label: 'Option 3' },
    ],
  },
} satisfies Meta<typeof FormSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Selected: Story = {
  args: {
    modelValue: 'opt2',
  },
}

export const Required: Story = {
  args: {
    required: true,
    label: 'Required Selection',
  },
}
