import InputPassword from "@/components/input-password.vue"
import type { Meta, StoryObj } from "@storybook/vue3"

type Story = StoryObj<typeof InputPassword>

const meta: Meta<typeof InputPassword> = {
  title: "components/input-password",
  component: InputPassword,
  tags: ["autodocs"]
}

export const Default: Story = {
  render: (args) => ({
    components: { InputPassword: InputPassword },
    setup() {
      return { args }
    },
    template: `<form onsubmit='return false;'>
                  <InputPassword v-bind='args'/>
                </form>`
  }),
  args: {
    value: "P@ssw0rd",
    id: "password",
    placeholder: "パスワードです。"
  }
}

export const Validation: Story = {
  render: (args) => ({
    components: { InputPassword: InputPassword },
    setup() {
      return { args }
    },
    template: `<form onsubmit='return false;'>
                  <p class="text-sm">入力済である事</p>
                  <p class="text-sm">7文字以上20文字以下である事</p>
                  <InputPassword v-bind='args'/>
                </form>`
  }),
  args: {
    value: "",
    id: "password",
    placeholder: "入力してENTER"
  }
}

export default meta
