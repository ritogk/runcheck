<script setup lang="ts">
import { ref, inject, watch } from "vue"
import { PlayerNo } from "@/app/pages/main-page/main-state/youtube-selector-modal-state"
import { YouTubePlayer } from "./player/youtube-player"
import { LocalVideoPlayer } from "./player/local-video-player"
import {
  UseMainStateKey,
  UseMainStateType,
} from "@/app/pages/main-page/main-state"
import { VideoCameraIcon } from "@heroicons/vue/20/solid"
import AdjustmentArea from "./player/adjustment-area.vue"
import { VideoType } from "./player/i-video-player"
import { extractYoutubeId } from "@/core/extract-youtube-id"

const playerNo = PlayerNo.TWO

const useMainState = inject(UseMainStateKey) as UseMainStateType
const youtubeUrl = ref("")

const elements = {
  localVideo: {
    file: ref<HTMLInputElement | null>(null),
    video: ref<HTMLVideoElement | null>(null),
  },
  videoArea: ref<HTMLInputElement | null>(null),
}

const calcVideoHeight = ref("300px")
watch(elements.videoArea, () => {
  const width = elements.videoArea.value?.offsetWidth ?? 600
  calcVideoHeight.value = `${width * (9 / 16)}px`
})

const hundleLocalVideoSelect = () => {
  elements.localVideo.file.value?.click()
}

const playerTwo = useMainState.syncPlayer.playerTwo

const hundleLocalVideoChange = async (event: Event) => {
  const file = (event as any).currentTarget.files[0]
  const objectURL = URL.createObjectURL(file)

  playerTwo.value.destory()
  const localVideoPlayer = new LocalVideoPlayer(
    elements.localVideo.video.value as HTMLVideoElement,
    objectURL
  )
  localVideoPlayer.load()
  playerTwo.value = localVideoPlayer
}

const hundleYoutubeUrlEnter = async (youtubeUrl: string) => {
  playerTwo.value.destory()
  const youtubeId = extractYoutubeId(youtubeUrl)
  const player = new YouTubePlayer("youtube-video-two", youtubeId)
  player.load()
  playerTwo.value = player
}

const hundleYoutubeSearch = () => {
  useMainState.youtubeModal.open(playerNo)
}
</script>

<style>
/** 要素を追加する場合は0px→124pxの間をゆるやかにアニメーションさせる */
.adjustment-enter-from {
  height: 0px;
}
.adjustment-enter-to {
  height: 124px;
}
/** 要素を削除する場合は124px→0pxの間をゆるやかにアニメーションさせる */
.adjustment-leave-from {
  height: 124px;
}
.adjustment-leave-to {
  height: 0px;
}
/** from → toのアニメーション設定 */
.adjustment-enter-active,
.adjustment-leave-active {
  transition: all 0.5s ease;
}
</style>

<template>
  <div>
    <!-- Video -->
    <div :ref="elements.videoArea">
      <div v-show="playerTwo.subscription.videoType.value === VideoType.NONE">
        <div
          class="relative w-full bg-gray-300"
          :style="{ height: calcVideoHeight }"
        >
          <VideoCameraIcon
            class="absolute bottom-0 left-0 right-0 top-0 m-auto h-2/5 w-2/5 text-gray-400"
            aria-hidden="true"
          />
        </div>
      </div>
      <div
        v-show="playerTwo.subscription.videoType.value === VideoType.YOUTUBE"
      >
        <div
          id="youtube-video-two"
          class="w-full"
          :style="{ height: calcVideoHeight }"
        ></div>
      </div>
      <div v-show="playerTwo.subscription.videoType.value === VideoType.LOCAL">
        <video
          :ref="elements.localVideo.video"
          controls
          playsinline
          preload="none"
          class="w-full"
          :style="{ height: calcVideoHeight }"
        ></video>
      </div>
    </div>

    <Transition name="adjustment">
      <div
        v-show="!useMainState.syncPlayer.subscription.synced.value"
        class="overflow-hidden pb-2"
      >
        <!-- selector -->
        <div class="px-1">
          <div>
            <div class="mt-2 flex gap-2 rounded-md">
              <!-- Youtube -->
              <div
                class="relative flex w-10/12 flex-grow items-stretch shadow-sm focus-within:z-10"
              >
                <label
                  for="youtube-url-two"
                  class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                  >YouTube</label
                >
                <!-- Youtube url -->
                <input
                  type="email"
                  name="youtube-url-two"
                  id="youtube-url-two"
                  class="block w-9/12 rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                  placeholder="https://youtube.com/nLKSSdMWZ8g"
                  v-model="youtubeUrl"
                  @keyup.enter="hundleYoutubeUrlEnter(youtubeUrl)"
                />
                <!-- 検索 -->
                <button
                  type="button"
                  class="relative -ml-px inline-flex w-3/12 items-center gap-x-1.5 rounded-r-md bg-white text-sm font-semibold text-gray-900 ring-1 ring-inset ring-slate-300 hover:bg-gray-100"
                  title="YouTube動画選択"
                  aria-label="YouTube動画選択"
                  @click="hundleYoutubeSearch()"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    width="20px"
                    height="20px"
                    class="mx-auto stroke-gray-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </div>
              <!-- 端末動画選択 -->
              <button
                class="w-2/12 rounded-md bg-white text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-10"
                title="端末動画選択"
                aria-label="端末動画選択"
                @click="hundleLocalVideoSelect()"
              >
                <div class="flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 56 41"
                    xmlns="http://www.w3.org/2000/svg"
                    class="fill-gray-500"
                  >
                    <path
                      d="M43.6667 7.33333C43.6667 5.91885 43.1048 4.56229 42.1046 3.5621C41.1044 2.5619 39.7478 2 38.3333 2H6.33333C4.91885 2 3.56229 2.5619 2.5621 3.5621C1.5619 4.56229 1 5.91885 1 7.33333V34C1 35.4145 1.5619 36.771 2.5621 37.7712C3.56229 38.7714 4.91885 39.3333 6.33333 39.3333H38.3333C39.7478 39.3333 41.1044 38.7714 42.1046 37.7712C43.1048 36.771 43.6667 35.4145 43.6667 34V25.112L54.3333 34V7.33333L43.6667 16.2213V7.33333ZM33 23.3333H25V31.3333H19.6667V23.3333H11.6667V18H19.6667V10H25V18H33V23.3333Z"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <input
            type="file"
            :ref="elements.localVideo.file"
            @change="hundleLocalVideoChange"
            hidden
          />
        </div>

        <!-- adjustment-->
        <AdjustmentArea :player="playerTwo" class="mt-2 px-1"></AdjustmentArea>
      </div>
    </Transition>
  </div>
</template>
