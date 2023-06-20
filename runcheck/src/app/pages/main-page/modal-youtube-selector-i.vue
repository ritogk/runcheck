<script setup lang="ts">
import { inject, ref, computed } from "vue"
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue"
import { XMarkIcon } from "@heroicons/vue/20/solid"
import {
  UseMainStateKey,
  UseMainStateType,
} from "@/app/pages/main-page/use-main-state"
import {
  UseLoadingStateKey,
  UseLoadingStateType,
} from "@/app/use-loading-state"
import { UseUserStateKey, UseUserStateType } from "@/app/use-user-state"
import { YoutubeApi } from "@/core/openapiClient"
import UseApiGetYoutubeVideo from "@/core/api-state/use-get-api-youtube-video"
import { PlayerNo } from "@/app/pages/main-page/main-state/modal-youtube-selector-state"

import { apiConfig } from "@/core/openapi"
import { changeYoutube } from "./player/helpers-player"

const useUserState = inject(UseUserStateKey) as UseUserStateType
const useMainState = inject(UseMainStateKey) as UseMainStateType
const useLoadingState = inject(UseLoadingStateKey) as UseLoadingStateType
const { data, isLoading, isSuccess, isError, refetch } = UseApiGetYoutubeVideo(
  useUserState.subscription.isYoutubeAuthroized.value
)

const filter = ref("")
const filteredVideos = computed(() => {
  if (isSuccess.value != true) return []
  if (!data.value) return []
  return data.value.filter((video) => {
    return (
      video.title.includes(filter.value) ||
      video.description.includes(filter.value)
    )
  })
})

const onClose = () => {
  useMainState.youtubeModal.close()
  useMainState.youtubeModal.save()
}

const youtubeApi = new YoutubeApi(apiConfig)
const redirectToAuthorize = async () => {
  const response = await youtubeApi.youtubeOauthAuthorizeGet()
  useMainState.youtubeModal.save()
  useLoadingState.run()
  useLoadingState.save()
  location.href = response.redirectUrl
}

const selectVideo = async (url: string) => {
  const loadingId = useLoadingState.run()
  const playerNo = useMainState.youtubeModal.subscription.currentPlayerNo.value
  const player =
    playerNo === PlayerNo.ONE
      ? useMainState.syncPlayer.playerOne
      : useMainState.syncPlayer.playerTwo
  await changeYoutube(player, url, playerNo)
  useMainState.youtubeModal.close()
  useLoadingState.stop(loadingId)
}

const hundleTermsClick = () => {
  location.href = "/terms"
}

const hundlePrivacyClick = () => {
  location.href = "/privacy"
}
</script>

<template>
  <TransitionRoot
    as="template"
    :show="useMainState.youtubeModal.subscription.opened.value"
  >
    <Dialog as="div" class="relative z-30" @close="onClose">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative w-full transform rounded-lg bg-gray-100 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div class="absolute right-0 top-0 pr-4 pt-4 sm:block">
                <button
                  type="button"
                  class="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                  title="閉じる"
                  aria-label="閉じる"
                  @click="onClose"
                >
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="mt-3">
                <!-- Youtube Oauth-->
                <div class="text-center">
                  <!-- Empty state, show/hide based on command palette state -->
                  <div class="px-1 py-4 text-center text-sm">
                    <p class="text-gray-500">
                      このボタンをクリックすると、あなたのYouTube動画一覧が表示されます。
                    </p>
                    <div class="text-center">
                      <button
                        class="group mt-2 w-64 rounded bg-red-500 px-2 py-2 text-sm font-bold text-gray-100 shadow hover:bg-red-400"
                        @click="redirectToAuthorize"
                      >
                        <div class="flex justify-start">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            version="1.1"
                            id="YouTube_Icon"
                            x="0px"
                            y="0px"
                            viewBox="0 0 1024 721"
                            enable-background="new 0 0 1024 721"
                            xml:space="preserve"
                            style="width: 24px; height: 24px"
                          >
                            <path
                              id="Triangle"
                              fill="#FFFFFF"
                              d="M407,493l276-143L407,206V493z"
                            />
                            <path
                              id="The_Sharpness"
                              opacity="0.12"
                              fill="#420000"
                              d="M407,206l242,161.6l34-17.6L407,206z"
                            />
                            <g id="Lozenge">
                              <g>
                                <linearGradient
                                  id="SVGID_1_"
                                  gradientUnits="userSpaceOnUse"
                                  x1="512.5"
                                  y1="719.7"
                                  x2="512.5"
                                  y2="1.2"
                                  gradientTransform="matrix(1 0 0 -1 0 721)"
                                >
                                  <stop
                                    offset="0"
                                    style="stop-color: #e52d27"
                                  />
                                  <stop
                                    offset="1"
                                    style="stop-color: #bf171d"
                                  />
                                </linearGradient>
                                <path
                                  fill="url(#SVGID_1_)"
                                  d="M1013,156.3c0,0-10-70.4-40.6-101.4C933.6,14.2,890,14,870.1,11.6C727.1,1.3,512.7,1.3,512.7,1.3    h-0.4c0,0-214.4,0-357.4,10.3C135,14,91.4,14.2,52.6,54.9C22,85.9,12,156.3,12,156.3S1.8,238.9,1.8,321.6v77.5    C1.8,481.8,12,564.4,12,564.4s10,70.4,40.6,101.4c38.9,40.7,89.9,39.4,112.6,43.7c81.7,7.8,347.3,10.3,347.3,10.3    s214.6-0.3,357.6-10.7c20-2.4,63.5-2.6,102.3-43.3c30.6-31,40.6-101.4,40.6-101.4s10.2-82.7,10.2-165.3v-77.5    C1023.2,238.9,1013,156.3,1013,156.3z M407,493V206l276,144L407,493z"
                                />
                              </g>
                            </g>
                          </svg>
                          <span
                            class="ml-2 mr-1 block h-6 w-1 border-l border-red-700 group-hover:border-red-600"
                          ></span>
                          <span class="pl-3">YouTube 動画一覧を取得</span>
                        </div>
                      </button>
                    </div>
                    <p
                      class="mt-2 text-center text-[12px] text-gray-500"
                      hidden
                    >
                      <a
                        class="underline"
                        @click="hundleTermsClick()"
                        href="javascript: void(0);"
                        >利用規約</a
                      >、<a
                        class="underline"
                        @click="hundlePrivacyClick()"
                        href="javascript: void(0);"
                        >プライバシーポリシー</a
                      >に同意したうえで取得してください。
                    </p>
                  </div>
                </div>
                <!-- 動画一覧 -->
                <div
                  class="mx-auto max-w-3xl transform divide-y divide-gray-100 rounded-t-lg bg-white ring-1 ring-black ring-opacity-5 transition-all"
                >
                  <div class="relative">
                    <svg
                      class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <input
                      type="text"
                      class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                      placeholder="動画を絞り込む..."
                      role="combobox"
                      aria-expanded="false"
                      aria-controls="options"
                      v-model="filter"
                    />
                  </div>
                  <!-- Results, show/hide based on command palette state -->
                  <ul
                    class="max-h-96 scroll-py-3 overflow-y-auto overflow-x-hidden p-1"
                    id="options"
                    role="listbox"
                  >
                    <div
                      class="relative"
                      v-if="
                        !isSuccess &&
                        useUserState.subscription.isYoutubeAuthroized.value
                      "
                    >
                      <!-- スケルトン -->
                      <div>
                        <li
                          v-for="i in 5"
                          :key="i"
                          class="group flex animate-pulse cursor-default select-none rounded-xl border-b border-b-gray-100 p-3 focus:bg-gray-100"
                          id="option-1"
                          role="option"
                          tabindex="-1"
                        >
                          <div
                            class="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-gray-200"
                          >
                            <svg
                              class="h-[24px] w-[24px] text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path
                                stroke-linecap="round"
                                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                              ></path>
                            </svg>
                          </div>
                          <div class="ml-4 flex-auto">
                            <!-- Active: "text-gray-900", Not Active: "text-gray-700" -->
                            <div
                              class="rounded-fullw-4/5 mb-4 h-2.5 bg-gray-200"
                            ></div>
                            <!-- Active: "text-gray-700", Not Active: "text-gray-500" -->
                            <div
                              class="h-2.5 w-3/5 rounded-full bg-gray-200"
                            ></div>
                          </div>
                        </li>
                      </div>
                      <!-- ローディングの背景 -->
                      <div
                        class="absolute left-0 top-0 h-full w-full rounded-lg bg-gray-50 opacity-10 brightness-50 backdrop-blur-lg"
                      ></div>
                      <!-- ローディングのスピナー -->
                      <div
                        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      >
                        <svg
                          aria-hidden="true"
                          class="mr-2 h-12 w-12 animate-spin fill-slate-500 text-slate-300"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>

                    <!-- Active: "bg-gray-100" -->
                    <div v-if="filteredVideos.length >= 1">
                      <li
                        v-for="video in filteredVideos"
                        :key="video.url"
                        class="group flex cursor-default select-none rounded-xl border-b border-b-gray-100 p-3 focus:bg-gray-100"
                        id="option-1"
                        role="option"
                        tabindex="-1"
                        @click="selectVideo(video.url)"
                      >
                        <div
                          class="h-[40px]flex-shrink-0 flex w-[40px] items-center justify-center"
                        >
                          <img
                            :src="video.thumbnailUrl"
                            alt="サムネイル"
                            class="h-[40px] w-[40px] rounded-lg"
                          />
                        </div>
                        <div
                          class="ml-4 flex w-[calc(100%_-_40px_-_1rem)] flex-1 flex-col"
                        >
                          <!-- Active: "text-gray-900", Not Active: "text-gray-700" -->
                          <p class="truncate text-sm font-medium text-gray-700">
                            {{ video.title }}
                          </p>
                          <!-- Active: "text-gray-700", Not Active: "text-gray-500" -->
                          <p class="truncate text-sm text-gray-500">
                            {{ video.description }}
                          </p>
                        </div>
                      </li>
                    </div>

                    <!-- More items... -->
                  </ul>

                  <!-- 空 -->
                  <div
                    v-if="
                      (isSuccess && filteredVideos.length === 0) ||
                      !useUserState.subscription.isYoutubeAuthroized.value
                    "
                  >
                    <div class="mb-2 px-3 py-3 text-center text-sm sm:px-14">
                      <svg
                        class="mx-auto h-6 w-6 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                        />
                      </svg>
                      <p class="mt-4 font-semibold text-gray-900">
                        結果が見つかりませんでした
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
