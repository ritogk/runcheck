import ModalBase from "@/components/modal-base.vue"
import type { Meta, StoryObj } from "@storybook/vue3"
import { expect } from "@storybook/jest"
import { userEvent, within } from "@storybook/testing-library"

type Story = StoryObj<typeof ModalBase>

const meta: Meta<typeof ModalBase> = {
  title: "components/modal-base",
  component: ModalBase,
  tags: ["autodocs"]
}

export const Default: Story = {
  render: (args) => ({
    components: { ModalBase: ModalBase },
    setup() {
      return { args }
    },
    template: `<p>props.isShowed = trueで表示</p>
                <ModalBase v-bind='args' @hudnle-close="args.isShowed=false">
                  <div class="mt-3">
                    <p>モーダルサンプル</p>
                    <p>モーダルサンプル</p>
                    <p>モーダルサンプル</p>
                    <p>モーダルサンプル</p>
                  </div>
                </ModalBase>`
  }),
  args: {
    isShowed: false,
  }
}

export default meta
