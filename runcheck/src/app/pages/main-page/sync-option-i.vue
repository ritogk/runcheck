<script setup lang="ts">
import { inject } from "vue"
import Button from "@/components/button.vue"
import ReloadIcon from "@/components/svg/reload.vue"
import TwitterIcon from "@/components/svg/twitter.vue"
import { UseMainStateKey, UseMainStateType } from "@/app/pages/main-page/use-main-state"
import { UseLoadingStateKey, UseLoadingStateType } from "@/app/use-loading-state"
import { VideoType } from "./player/i-video-player"

const useMainState = inject(UseMainStateKey) as UseMainStateType
const useLoadingState = inject(UseLoadingStateKey) as UseLoadingStateType

const hundleVideoRunSyncClick = async () => {
  if (!(await validateVideoSelect())) return
  useMainState.syncPlayer.runSync()
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
}

const hundleVideoStopSyncClick = () => {
  useMainState.syncPlayer.stopSync()
}

const hundleTweetClick = async () => {
  if (!(await validateVideoSelect())) return
  if (
    useMainState.syncPlayer.playerOne.value.subscription.videoType.value !== VideoType.YOUTUBE ||
    useMainState.syncPlayer.playerTwo.value.subscription.videoType.value != VideoType.YOUTUBE
  ) {
    alert("共有はYouTubeの動画に限定されています。")
    return
  }
  const loadingId = useLoadingState.run()
  const compoarion = await useMainState.syncPlayer.saveSync(true)
  await useMainState.syncPlayer.publishSync(compoarion.id)
  // ツイートする
  const url = `${window.location.origin}${window.location.pathname}?comparisonId=${compoarion.id}`
  useLoadingState.stop(loadingId)
  location.href = "https://twitter.com/intent/tweet?text=" + url
}

const validateVideoSelect = async (): Promise<boolean> => {
  if (
    useMainState.syncPlayer.playerOne.value.subscription.videoType.value === VideoType.NONE ||
    useMainState.syncPlayer.playerTwo.value.subscription.videoType.value === VideoType.NONE
  ) {
    alert("比較対象の動画を選択した後に実行して下さい。")
    return false
  }
  return true
}
</script>

<template>
  <!-- 動画を同期 and つぶやく-->
  <div class="flex gap-2">
    <Button
      class="w-1/2"
      :label="'動画を同期'"
      :variant="'primary'"
      v-show="!useMainState.syncPlayer.subscription.synced.value"
      @click="hundleVideoRunSyncClick"
    >
      <ReloadIcon></ReloadIcon>
    </Button>
    <Button
      class="w-1/2"
      :label="'同期を解除'"
      :variant="'primary'"
      v-show="useMainState.syncPlayer.subscription.synced.value"
      @click="hundleVideoStopSyncClick"
    >
      <ReloadIcon></ReloadIcon>
    </Button>

    <Button
      :variant="'custom'"
      :label="'比較結果を共有'"
      @click="hundleTweetClick()"
      class="w-1/2 bg-[#16A2F3] text-white ring-[#1697f3] hover:bg-[#45b7f7] focus-visible:outline-[#0f73bb]"
    >
      <TwitterIcon></TwitterIcon>
    </Button>
  </div>
</template>
