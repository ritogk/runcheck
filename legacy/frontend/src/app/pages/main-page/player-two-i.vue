<script setup lang="ts">
import { ref, inject, watch } from "vue"
import AdjustmentArea from "./player/adjustment-area.vue"
import Button from "@/components/button.vue"
import PlusVideoIcon from "@/components/svg/plus-video.vue"
import SearchIcon from "@/components/svg/search.vue"
import { PlayerNo } from "@/app/pages/main-page/main-state/modal-youtube-selector-state"
import { UseMainStateKey, type UseMainStateType } from "@/app/pages/main-page/use-main-state"
import { VideoCameraIcon } from "@heroicons/vue/20/solid"
import { VideoType } from "./player/i-video-player"
import { mountYoutube, mountLocalVideo } from "./player/helpers-player"

const playerNo = PlayerNo.TWO

const useMainState = inject(UseMainStateKey) as UseMainStateType
const youtubeUrl = ref("")

const elements = {
  localVideo: {
    file: ref<HTMLInputElement | null>(null),
    video: ref<HTMLVideoElement | null>(null)
  },
  videoArea: ref<HTMLInputElement | null>(null)
}

const calcVideoHeight = ref("300px")
watch(elements.videoArea, () => {
  const width = elements.videoArea.value?.offsetWidth ?? 600
  calcVideoHeight.value = `${width * (9 / 16)}px`
})

const hundleLocalVideoSelect = () => {
  elements.localVideo.file.value?.click()
}

const playerTwo = useMainState.syncPlayer.subscription.playerTwo

const hundleLocalVideoChange = async (event: Event) => {
  const file = (event as any).currentTarget.files[0]
  if (!elements.localVideo.video.value) return
  const player = await mountLocalVideo(playerTwo.value, file, elements.localVideo.video.value)
  useMainState.syncPlayer.changePlayerTwo(player)
}

const hundleYoutubeUrlEnter = async (youtubeUrl: string) => {
  const player = await mountYoutube(playerTwo.value, youtubeUrl, playerNo)
  useMainState.syncPlayer.changePlayerTwo(player)
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
  <div id="player-two">
    <!-- Video -->
    <div :ref="elements.videoArea">
      <div v-show="playerTwo.subscription.videoType.value === VideoType.NONE">
        <div class="relative w-full bg-gray-300" :style="{ height: calcVideoHeight }">
          <VideoCameraIcon
            class="absolute bottom-0 left-0 right-0 top-0 m-auto h-2/5 w-2/5 text-gray-400"
            aria-hidden="true"
          />
        </div>
      </div>
      <div v-show="playerTwo.subscription.videoType.value === VideoType.YOUTUBE">
        <div id="youtube-video-two" class="w-full" :style="{ height: calcVideoHeight }"></div>
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
      <div v-show="!useMainState.syncPlayer.subscription.synced.value" class="overflow-hidden pb-2">
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
                  type="text"
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
                  <SearchIcon class="mx-auto stroke-gray-500"></SearchIcon>
                </button>
              </div>
              <!-- 端末動画選択 -->
              <Button
                :accessibility-title="'端末動画選択'"
                class="w-2/12"
                @click="hundleLocalVideoSelect()"
              >
                <PlusVideoIcon></PlusVideoIcon>
              </Button>
            </div>
          </div>
          <input
            type="file"
            accept="video/*"
            :ref="elements.localVideo.file"
            @change="hundleLocalVideoChange"
            hidden
          />
        </div>

        <!-- adjustment-->
        <AdjustmentArea :player="playerTwo" class="mt-2 px-1"></AdjustmentArea>
        <div class="mx-1 border-b border-gray-300 pb-2"></div>
      </div>
    </Transition>
  </div>
</template>
