import FormLabel from "@/components/form-label.vue"
import type { Meta, StoryObj } from "@storybook/vue3"

type Story = StoryObj<typeof FormLabel>

const meta: Meta<typeof FormLabel> = {
  title: "components/form-label",
  component: FormLabel,
  tags: ["autodocs"]
}

export const Default: Story = {
  render: (args) => ({
    components: { FormLabel: FormLabel },
    setup() {
      return { args }
    },
    template: `<FormLabel v-bind='args'>
                  <input
                    type="text"
                    class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                    id="full-name"
                    required
                    value="山田太郎"
                  />
                </FormLabel>`
  }),
  args: {
    required:true,
    id:"full-name",
    label:"氏名"
  }
}

export const Optional : Story = {
  render: (args) => ({
    components: { FormLabel: FormLabel },
    setup() {
      return { args }
    },
    template: `<FormLabel v-bind='args'>
                  <input
                    type="text"
                    class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                    id="full-name"
                    value="山田太郎"
                  />
                </FormLabel>`
  }),
  args: {
    required:false,
    id:"full-name",
    label:"氏名"
  }
}

export default meta
