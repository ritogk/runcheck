import InputPassword from "@/components/input-password.vue"
import type { Meta, StoryObj } from "@storybook/vue3"

type Story = StoryObj<typeof InputPassword>

const meta: Meta<typeof InputPassword> = {
  title: "components/input-password",
  component: InputPassword
}

export const Default: Story = {
  render: (args) => ({
    components: { InputPassword: InputPassword },
    setup() {
      return { args }
    },
    template: "<InputPassword v-bind='args'/>"
  }),
  args: {
    value: "P@ssw0rd",
    id: "password",
    placeholder: "パスワードです。"
  }
}

export default meta
