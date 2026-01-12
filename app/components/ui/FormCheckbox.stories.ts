import type { Meta, StoryObj } from '@storybook/vue3'
import FormCheckbox from '@/components/ui/FormCheckbox.vue'

const meta = {
  title: 'UI/FormCheckbox',
  component: FormCheckbox,
  tags: ['autodocs'],
  args: {
    modelValue: false,
    id: 'test-checkbox',
    label: 'Agree to terms',
  },
} satisfies Meta<typeof FormCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = {
  args: {
    modelValue: true,
  },
}

export const Required: Story = {
  args: {
    required: true,
    label: 'Required Agreement',
  },
}
