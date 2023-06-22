import Button from "@/components/button.vue"
import type { Meta, StoryObj } from "@storybook/vue3"
import Reload from "@/components/svg/reload.vue"
import TwitterIcon from "@/components/svg/twitter.vue"

type Story = StoryObj<typeof Button>

const meta: Meta<typeof Button> = {
  title: "components/button",
  component: Button,
  tags: ["autodocs"]
}

export const Default: Story = {
  render: (args) => ({
    components: { Button: Button },
    setup() {
      return { args }
    },
    template: `<Button v-bind='args' class="mt-7"></Button>`
  }),
  args: {
    label: "新規登録",
    type: "button",
    variant: "primary"
  },
  argTypes: {
    variant: {
      control: {
        type: "inline-radio"
      },
      options: ["primary", "danger", "secondary", "custom", undefined]
    },
    type: {
      control: {
        type: "inline-radio"
      },
      options: ["button", "submit", "reset"]
    }
  }
}

export const Danger: Story = {
  render: (args) => ({
    components: { Button: Button },
    setup() {
      return { args }
    },
    template: `<Button v-bind='args' class="mt-7"></Button>`
  }),
  args: {
    label: "削除します",
    type: "button",
    variant: "danger"
  }
}

export const Secondary: Story = {
  render: (args) => ({
    components: { Button: Button },
    setup() {
      return { args }
    },
    template: `<Button v-bind='args' class="mt-7"></Button>`
  }),
  args: {
    label: "編集する",
    type: "button"
  }
}

export const IconButton: Story = {
  render: (args) => ({
    components: { Button: Button, Reload: Reload },
    setup() {
      return { args }
    },
    template: `<Button v-bind='args'>
                  <Reload/>
              </Button>`
  }),
  args: {
    label: "更新する",
    type: "button"
  }
}

export const IconOnlyButton: Story = {
  render: (args) => ({
    components: { Button: Button, Reload: Reload },
    setup() {
      return { args }
    },
    template: `<Button v-bind='args'>
                  <Reload/>
              </Button>`
  }),
  args: {
    label: "",
    type: "button"
  }
}

export const CustomButton: Story = {
  render: (args) => ({
    components: { Button: Button, TwitterIcon: TwitterIcon },
    setup() {
      return { args }
    },
    template: `<Button v-bind='args' class="bg-[#16A2F3] text-white ring-[#1697f3] hover:bg-[#45b7f7] focus-visible:outline-[#0f73bb]">
                <TwitterIcon></TwitterIcon>
              </Button>`
  }),
  args: {
    label: "ツイートする",
    variant: "custom",
    type: "button"
  }
}

export default meta
