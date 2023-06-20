import InputEmail from '../components/input-email.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

type Story = StoryObj<typeof InputEmail>

const meta: Meta<typeof InputEmail> = {
  title: 'components/input-email',
  component: InputEmail
}

export const Default: Story = {
  render: (args) => ({
    components: { InputEmail },
    setup() {
      return { args }
    },
    template: "<InputEmail v-bind='args'/>"
  }),
  args: {
    value: 'test@example.com',
    id: 'email',
    placeholder: 'メールアドレスです',
    required: true
  }
}

export default meta
