<script setup lang="ts">
import { inject, ref, computed, watch } from "vue"
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue"
import { XMarkIcon } from "@heroicons/vue/20/solid"
import { UseMainStateKey, UseMainStateType } from "@/pages/main/UseMainState"
import { YoutubeApi } from "@/core/openapiClient"
import { VideoListState } from "@/pages/main/parts/video-area-parts/video-selector-parts/youtube-select-modal/VideoListState"
import { VideoNo } from "./video-area-parts/video-selector-parts/youtube-select-modal/UseModalState"
import { YouTubePlayer } from "./video-area-parts/libs/YouTubePlayer"
import { callbackYoutubeOauth } from "./CallbackYoutubeOauth"

const useMainState = inject(UseMainStateKey) as UseMainStateType

const videoListState = VideoListState()
watch(useMainState.youtubeModal.subscription.opened, (value) => {
  if (value) videoListState.load()
})

const filter = ref("")
const filteredVideos = computed(() => {
  return videoListState.subscription.videos.value.filter((video) => {
    return (
      video.title.includes(filter.value) ||
      video.description.includes(filter.value)
    )
  })
})

const onClose = () => {
  useMainState.youtubeModal.close()
}

const youtubeApi = new YoutubeApi()
const redirectToAuthorize = async () => {
  const response = await youtubeApi.youtubeOauthAuthorizeGet()
  useMainState.youtubeModal.save()
  location.href = response.redirectUrl
}

const playerOneManager = useMainState.syncPlayer.playerOneManager
const playerTwoManager = useMainState.syncPlayer.playerTwoManager

const selectVideo = async (url: string) => {
  useMainState.youtubeModal.select(url)
  const videoNo = useMainState.youtubeModal.subscription.currentVideoNo.value
  switch (videoNo) {
    case VideoNo.ONE:
      playerOneManager.subscription.player.value.destory()
      const playerOne = new YouTubePlayer("youtube-video-one", url)
      await playerOne.load()
      playerOneManager.changePlayer(playerOne)
      break
    case VideoNo.TWO:
      playerTwoManager.subscription.player.value.destory()
      const playerTwo = new YouTubePlayer("youtube-video-two", url)
      await playerTwo.load()
      playerTwoManager.changePlayer(playerTwo)
      break
  }
  useMainState.youtubeModal.close()
}

// Oauthで認可された後の処理
const urlParams = new URLSearchParams(window.location.search)
const code = urlParams.get("code")
if (code) callbackYoutubeOauth(code)
</script>

<template>
  <TransitionRoot
    as="template"
    :show="useMainState.youtubeModal.subscription.opened.value"
  >
    <Dialog as="div" class="relative z-50" @close="onClose">
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
                  class="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  @click="onClose"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="mt-3">
                <!-- Youtube Oauth-->
                <div class="text-center">
                  <!-- Empty state, show/hide based on command palette state -->
                  <div class="px-2 py-4 text-center text-sm sm:px-14">
                    <p class="text-gray-500">
                      このボタンをクリックすると、あなたのYouTube動画一覧が表示されます。
                    </p>

                    <div
                      class="bg-red-500 text-gray-100 hover:text-white shadow text-sm font-bold py-2 px-2 rounded flex justify-start items-center cursor-pointer w-64 mt-2 mx-auto"
                      @click="redirectToAuthorize"
                    >
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
                              <stop offset="0" style="stop-color: #e52d27" />
                              <stop offset="1" style="stop-color: #bf171d" />
                            </linearGradient>
                            <path
                              fill="url(#SVGID_1_)"
                              d="M1013,156.3c0,0-10-70.4-40.6-101.4C933.6,14.2,890,14,870.1,11.6C727.1,1.3,512.7,1.3,512.7,1.3    h-0.4c0,0-214.4,0-357.4,10.3C135,14,91.4,14.2,52.6,54.9C22,85.9,12,156.3,12,156.3S1.8,238.9,1.8,321.6v77.5    C1.8,481.8,12,564.4,12,564.4s10,70.4,40.6,101.4c38.9,40.7,89.9,39.4,112.6,43.7c81.7,7.8,347.3,10.3,347.3,10.3    s214.6-0.3,357.6-10.7c20-2.4,63.5-2.6,102.3-43.3c30.6-31,40.6-101.4,40.6-101.4s10.2-82.7,10.2-165.3v-77.5    C1023.2,238.9,1013,156.3,1013,156.3z M407,493V206l276,144L407,493z"
                            />
                          </g>
                        </g>
                      </svg>
                      <span
                        class="border-l border-red-700 h-6 w-1 block mr-1 ml-2"
                      ></span>
                      <span class="pl-3">YouTube 動画一覧を取得</span>
                    </div>
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
                      class="h-12 border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
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
                    <!-- スケルトン -->
                    <div v-if="!videoListState.subscription.read">
                      <li
                        v-for="i in 5"
                        :key="i"
                        class="animate-pulse group flex cursor-default select-none rounded-xl p-3 border-b border-b-gray-100 focus:bg-gray-100"
                        id="option-1"
                        role="option"
                        tabindex="-1"
                      >
                        <div
                          class="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-gray-200"
                        >
                          <svg
                            class="text-white w-[24px] h-[24px]"
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
                            class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-4/5 mb-4"
                          ></div>
                          <!-- Active: "text-gray-700", Not Active: "text-gray-500" -->
                          <div
                            class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-3/5"
                          ></div>
                        </div>
                      </li>
                    </div>

                    <!-- Active: "bg-gray-100" -->
                    <div
                      v-if="
                        videoListState.subscription.read &&
                        filteredVideos.length >= 1
                      "
                    >
                      <li
                        v-for="video in filteredVideos"
                        :key="video.url"
                        class="group flex cursor-default select-none rounded-xl p-3 border-b border-b-gray-100 focus:bg-gray-100"
                        id="option-1"
                        role="option"
                        tabindex="-1"
                        @click="selectVideo(video.url)"
                      >
                        <div
                          class="flex w-[40px] h-[40px]flex-shrink-0 items-center justify-center"
                        >
                          <img
                            :src="video.thumbnailUrl"
                            alt="サムネイル"
                            class="rounded-lg w-[40px] h-[40px]"
                          />
                        </div>
                        <div
                          class="ml-4 flex flex-col flex-1 w-[calc(100%_-_40px_-_1rem)]"
                        >
                          <!-- Active: "text-gray-900", Not Active: "text-gray-700" -->
                          <p class="text-sm font-medium text-gray-700 truncate">
                            {{ video.title }}
                          </p>
                          <!-- Active: "text-gray-700", Not Active: "text-gray-500" -->
                          <p class="text-sm text-gray-500 truncate">
                            {{ video.description }}
                          </p>
                        </div>
                      </li>
                    </div>

                    <!-- More items... -->
                  </ul>
                  <!-- Empty state, show/hide based on command palette state -->
                  <div
                    v-if="
                      videoListState.subscription.read &&
                      filteredVideos.length === 0
                    "
                  >
                    <div class="px-3 py-3 text-center text-sm sm:px-14 mb-2">
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
