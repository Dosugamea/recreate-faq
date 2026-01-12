import type { Meta, StoryObj } from '@storybook/vue3'
import AppLayout from '@/components/AppLayout.vue'

const meta = {
  title: 'Root/AppLayout',
  component: AppLayout,
  tags: ['autodocs'],
  args: {
    activeTab: 'faq',
    title: 'FAQ Page',
    description: 'This is the description for the FAQ page.',
    siteName: 'FAQ App',
    copyright: '© 2024 FAQ App',
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AppLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { AppLayout },
    setup() {
      return { args }
    },
    template: `
      <AppLayout v-bind="args">
        <div class="p-4 border border-dashed border-gray-300 rounded bg-gray-50 text-center text-gray-500">
          Main Content Slot Area
        </div>
      </AppLayout>
    `,
  }),
}

export const InquiryTab: Story = {
  args: {
    activeTab: 'inquiry',
    title: 'Inquiry Form',
    description: 'Please fill out the form below.',
  },
  render: (args) => ({
    components: { AppLayout },
    setup() {
      return { args }
    },
    template: `
      <AppLayout v-bind="args">
        <div class="p-4 border border-dashed border-gray-300 rounded bg-gray-50 text-center text-gray-500">
          Inquiry Form Slot Area
        </div>
      </AppLayout>
    `,
  }),
}
