import Modal from "@/components/modal.vue"
import type { Meta, StoryObj } from "@storybook/vue3"

type Story = StoryObj<typeof Modal>

const meta: Meta<typeof Modal> = {
  title: "components/modal",
  component: Modal,
  tags: ["autodocs"]
}

export const Default: Story = {
  render: (args) => ({
    components: { Modal: Modal },
    setup() {
      return { args }
    },
    template: `<p>props.isShowed = trueで表示</p>
                <Modal v-bind='args' @hudnle-close="args.isShowed=false">
                  <div class="mt-3">
                    <p>モーダルサンプル</p>
                    <p>モーダルサンプル</p>
                    <p>モーダルサンプル</p>
                    <p>モーダルサンプル</p>
                  </div>
                </Modal>`
  }),
  args: {
    isShowed: false
  }
}

export default meta
