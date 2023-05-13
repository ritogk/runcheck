<script setup lang="ts">
import { ref, provide, inject, computed } from "vue"
import { useRouter } from "vue-router"
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue"
import {
  Bars3Icon,
  UserIcon,
  UserPlusIcon,
  XMarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/vue/24/outline"

import AlretArea from "@/app/dashboard-parts/AlretArea.vue"
import {
  useAlretState,
  useAlretStateKey,
} from "./dashboard-parts/useAlretState"
import {
  useUserStateKey,
  useUserStateType,
} from "@/app/dashboard-parts/useUserState"

const alretState = useAlretState()
provide(useAlretStateKey, alretState)

const useUserState = inject(useUserStateKey) as useUserStateType
const userState = useUserState.subscription

const router = useRouter()

const hundleHeaderClick = () => {
  location.href = location.origin + router.resolve("index").href
}

const hundleHomeClick = () => {
  sidebarOpen.value = false
  router.push({ name: "home" })
}

const navigation = [
  {
    name: "ログイン",
    href: "#",
    icon: ArrowRightOnRectangleIcon,
    current: false,
    action: () => {
      sidebarOpen.value = false
      router.push({ name: "login" })
    },
    show: computed(() => !userState.value.logined),
  },
  {
    name: "ログアウト",
    href: "#",
    icon: ArrowLeftOnRectangleIcon,
    current: false,
    action: async () => {
      sidebarOpen.value = false
      useUserState.logout()
      router.push({ name: "index" })
    },
    show: computed(() => userState.value.logined),
  },
  {
    name: "新規登録",
    href: "#",
    icon: UserPlusIcon,
    current: false,
    action: async () => {
      sidebarOpen.value = false
      router.push({ name: "register" })
    },
    show: computed(() => !userState.value.logined),
  },
  {
    name: "このアプリについて",
    href: "#",
    icon: QuestionMarkCircleIcon,
    current: false,
    action: () => {},
    show: computed(() => true),
  },
  {
    name: "問い合わせ",
    href: "#",
    icon: ChatBubbleOvalLeftEllipsisIcon,
    current: false,
    action: () => {
      location.href = "https://twitter.com/homing_fd2"
    },
    show: computed(() => true),
  },
]

const sidebarOpen = ref(false)
</script>

<template>
  <div>
    <div class="flex justify-end">
      <TransitionRoot as="template" :show="sidebarOpen">
        <Dialog
          as="div"
          class="relative z-50 lg:hidden"
          @close="sidebarOpen = false"
        >
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
                    class="flex w-16 justify-center pt-5 items-start"
                    @click="sidebarOpen = false"
                  >
                    <button type="button" class="-m-2.5 p-2.5">
                      <span class="sr-only">Close sidebar</span>
                      <XMarkIcon
                        class="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </TransitionChild>
                <!-- サイドバー -->
                <div
                  class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10"
                >
                  <div class="flex h-16 shrink-0 items-center">
                    <img
                      class="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <nav class="flex flex-1 flex-col">
                    <ul role="list" class="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" class="-mx-2 space-y-1">
                          <li v-if="userState.logined">
                            <a
                              class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer"
                              @click="hundleHomeClick()"
                            >
                              <component
                                :is="UserIcon"
                                class="h-6 w-6 shrink-0"
                                aria-hidden="true"
                              />
                              {{ userState.user.name }}
                            </a>
                          </li>

                          <li v-for="item in navigation" :key="item.name">
                            <a
                              v-if="item.show.value"
                              :href="item.href"
                              :class="[
                                item.current
                                  ? 'bg-gray-800 text-white'
                                  : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
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

    <!-- Static sidebar for desktop -->
    <div
      class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
    >
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
        <div
          class="text-sm font-semibold leading-6 text-slate-100 cursor-pointer mt-5"
          @click="hundleHeaderClick()"
        >
          <div>
            <div class="text-[20px]">RunCheck</div>
            <div class="text-[10px] font-normal leading-5">
              車載動画でサーキットを攻略！タイムアップのための比較アプリ
            </div>
          </div>
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-if="userState.logined">
                  <a
                    class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer"
                    @click="hundleHomeClick()"
                  >
                    <component
                      :is="UserIcon"
                      class="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    {{ userState.user.name }}
                  </a>
                </li>
                <li v-for="item in navigation" :key="item.name">
                  <a
                    v-if="item.show.value"
                    :href="item.href"
                    :class="[
                      item.current
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
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
    </div>

    <div
      class="z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-3 shadow-sm sm:px-6 lg:hidden"
    >
      <div
        class="flex-1 text-sm font-semibold leading-6 text-slate-100 cursor-pointer"
        @click="hundleHeaderClick()"
      >
        <div>
          <div class="text-lg">RunCheck</div>
          <div class="text-[9px] font-normal leading-3">
            車載動画でサーキットを攻略！タイムアップのための比較アプリ
          </div>
        </div>
      </div>
      <button
        type="button"
        class="-m-2.5 p-2.5 text-gray-400 lg:hidden"
        @click="sidebarOpen = true"
      >
        <span class="sr-only">Open sidebar</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>
    </div>

    <main class="lg:pl-72">
      <AlretArea></AlretArea>
      <div class="sm:px-1 lg:px-8 bg-gray-100">
        <!-- Your content -->
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>
