import InputEmail from "../components/input-email.vue"
import type { Meta, StoryObj } from "@storybook/vue3"

type Story = StoryObj<typeof InputEmail>

const meta: Meta<typeof InputEmail> = {
  title: "components/input-email",
  component: InputEmail,
  tags: ["autodocs"]
}

export const Default: Story = {
  render: (args) => ({
    components: { InputEmail },
    setup() {
      return { args }
    },
    template: "<form onsubmit='return false;'><InputEmail v-bind='args'/></form>"
  }),
  args: {
    value: "test@example.com",
    id: "email",
    placeholder: "メールアドレスです",
    required: true
  }
}

export const Validation: Story = {
  render: (args) => ({
    components: { InputEmail: InputEmail },
    setup() {
      return { args }
    },
    template: `<form onsubmit='return false;'>
                  <p class="text-sm">メールアドレスの書式である事</p>
                  <InputEmail v-bind='args'/>
                </form>`
  }),
  args: {
    value: "",
    id: "password",
    placeholder: "入力してENTER"
  }
}

export default meta
