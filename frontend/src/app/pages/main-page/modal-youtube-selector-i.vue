<script setup lang="ts">
import { inject, ref, computed } from "vue"
import Modal from "@/components/modal.vue"
import YoutubeIcon from "@/components/svg/youtube.vue"
import Button from "@/components/button.vue"
import { UseMainStateKey, type UseMainStateType } from "@/app/pages/main-page/use-main-state"
import { UseLoadingStateKey, type UseLoadingStateType } from "@/app/use-loading-state"
import { YoutubeApi } from "@/core/openapiClient"
import UseGetYoutubeVideo from "@/core/api-state/use-get-youtube-video"
import { PlayerNo } from "@/app/pages/main-page/main-state/modal-youtube-selector-state"
import { apiConfig } from "@/core/openapi"
import { mountYoutube } from "./player/helpers-player"

const useMainState = inject(UseMainStateKey) as UseMainStateType
const useLoadingState = inject(UseLoadingStateKey) as UseLoadingStateType
const { data, isLoading, isSuccess, isFetching, isError, refetch } = UseGetYoutubeVideo(true)

const filter = ref("")
const filteredVideos = computed(() => {
  if (isSuccess.value != true) return []
  if (!data.value) return []
  return data.value.filter((video) => {
    return video.title.includes(filter.value) || video.description.includes(filter.value)
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
  if (playerNo === PlayerNo.ONE) {
    const player = await mountYoutube(
      useMainState.syncPlayer.subscription.playerOne.value,
      url,
      playerNo
    )
    useMainState.syncPlayer.changePlayerOne(player)
  } else {
    const player = await mountYoutube(
      useMainState.syncPlayer.subscription.playerTwo.value,
      url,
      playerNo
    )
    useMainState.syncPlayer.changePlayerTwo(player)
  }
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
  <Modal :is-showed="useMainState.youtubeModal.subscription.opened.value" @hudnle-close="onClose">
    <div class="mt-3">
      <!-- Youtube Oauth-->
      <div class="text-center">
        <!-- Empty state, show/hide based on command palette state -->
        <div class="px-1 py-4 text-center text-sm">
          <p class="text-gray-500">
            このボタンをクリックすると、あなたのYouTube動画一覧が表示されます。
          </p>

          <Button
            :label="'YouTube動画を取得'"
            :variant="'custom'"
            :size="'lg'"
            @click="redirectToAuthorize"
            class="mt-3 w-4/6 bg-red-500 text-gray-100 ring-red-500 hover:bg-red-400 focus-visible:outline-red-600"
          >
            <YoutubeIcon></YoutubeIcon>
            <div class="flex justify-start"></div>
          </Button>
          <p class="mt-2 text-center text-[12px] text-gray-500" hidden>
            <a class="underline" @click="hundleTermsClick()" href="javascript: void(0);">利用規約</a
            >、<a class="underline" @click="hundlePrivacyClick()" href="javascript: void(0);"
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
          <div class="relative" v-if="isFetching">
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
                  <div class="rounded-fullw-4/5 mb-4 h-2.5 bg-gray-200"></div>
                  <!-- Active: "text-gray-700", Not Active: "text-gray-500" -->
                  <div class="h-2.5 w-3/5 rounded-full bg-gray-200"></div>
                </div>
              </li>
            </div>
            <!-- ローディングの背景 -->
            <div
              class="absolute left-0 top-0 h-full w-full rounded-lg bg-gray-50 opacity-10 brightness-50 backdrop-blur-lg"
            ></div>
            <!-- ローディングのスピナー -->
            <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
              class="cursor-default select-none rounded-xl border-b border-b-gray-100 p-3 focus:bg-gray-100"
              id="option-1"
              role="option"
              tabindex="-1"
              @click="selectVideo(video.url)"
            >
              <button class="group flex w-full">
                <div class="h-[40px]flex-shrink-0 flex w-[40px] items-center justify-center">
                  <img
                    :src="video.thumbnailUrl"
                    alt="サムネイル"
                    class="h-[40px] w-[40px] rounded-lg"
                  />
                </div>
                <div class="ml-4 flex w-[calc(100%_-_40px_-_1rem)] flex-1 flex-col text-left">
                  <!-- Active: "text-gray-900", Not Active: "text-gray-700" -->
                  <p class="truncate text-sm font-medium text-gray-700">
                    {{ video.title }}
                  </p>
                  <!-- Active: "text-gray-700", Not Active: "text-gray-500" -->
                  <p class="truncate text-sm text-gray-500">
                    {{ video.description }}
                  </p>
                </div>
              </button>
            </li>
          </div>

          <!-- More items... -->
        </ul>

        <!-- 空 -->
        <div v-if="!isFetching && filteredVideos.length === 0">
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
            <p class="mt-4 font-semibold text-gray-900">結果が見つかりませんでした</p>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>
@/core/api-state/use-get-status @/core/api-state/use-get-youtube-video
