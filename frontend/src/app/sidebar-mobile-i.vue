<script setup lang="ts">
import { inject } from "vue"
import { useRouter } from "vue-router"
// component
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue"
import { UserIcon, XMarkIcon } from "@heroicons/vue/24/outline"
import { UseUserStateType, UseUserStateKey } from "@/app/user-state"
import { UseSidebarStateKey, IUseSidebarState } from "./sidebar-state"

const sidebarState = inject(UseSidebarStateKey) as IUseSidebarState
const userState = inject(UseUserStateKey) as UseUserStateType

const router = useRouter()

const hundleHomeClick = () => {
  sidebarState.close()
  router.push({ name: "home" })
}
</script>

<template>
  <!-- mobile-sidebar -->
  <div class="flex justify-end">
    <TransitionRoot
      as="template"
      :show="sidebarState.subscription.opened.value"
    >
      <Dialog as="div" class="relative z-40" @close="sidebarState.close()">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>
        <div class="fixed inset-0 flex justify-end">
          <!-- 移動アニメーション-->
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="translate-x-full"
          >
            <DialogPanel class="relative flex w-full max-w-xs flex-1">
              <!-- ✕ボタン-->
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div
                  class="flex w-16 items-start justify-center pt-5"
                  @click="sidebarState.close()"
                >
                  <button
                    type="button"
                    class="-m-2.5 p-2.5"
                    title="サイドバーを閉じる"
                    aria-label="サイドバーを  閉じる"
                  >
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <!-- サイドバー(desktop?) -->
              <div
                class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10"
              >
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="mt-7 flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-if="userState.subscription.logined.value">
                          <a
                            class="group flex cursor-pointer gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                            @click="hundleHomeClick()"
                          >
                            <component
                              :is="UserIcon"
                              class="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            {{ userState.subscription.user.value.name }}
                          </a>
                        </li>

                        <li
                          v-for="item in sidebarState.subscription.items.value"
                          :key="item.name"
                        >
                          <a
                            v-if="item.show.value"
                            :href="item.href"
                            :class="[
                              item.current
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                              'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                            ]"
                            @click="item.action"
                          >
                            <component
                              :is="item.icon"
                              class="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            {{ item.name }}
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
