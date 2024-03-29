<script setup lang="ts">
import { provide, inject, watch } from "vue"
import { UseMainState, UseMainStateKey } from "./main-page/use-main-state"
import { UseAlretStateKey, type UseAlretStateType } from "@/app/use-alret-state"
import { UseLoadingStateKey, type UseLoadingStateType } from "@/app/use-loading-state"
import PlayerOneI from "./main-page/player-one-i.vue"
import PlayerTwoI from "./main-page/player-two-i.vue"
import ModalSaveI from "./main-page/modal-save-i.vue"
import ModalOpenI from "./main-page/modal-open-i.vue"
import ModalYoutubeSelectorI from "./main-page/modal-youtube-selector-i.vue"
import ModalAdjustSpeedI from "./main-page/modal-adjust-speed-i.vue"
import FileControllerI from "./main-page/file-controller-i.vue"
import SyncControllerI from "./main-page/sync-controller-i.vue"
import SyncOptionI from "./main-page/sync-option-i.vue"
import Memo from "./main-page/memo.vue"
import { handleYoutubeOauthCallback } from "./main-page/handle-youtube-oauth-callback-i"
import { getComparisonById } from "@/core/get-comparison-by-id"
import { UseGetStatus } from "@/core/api-state/use-get-status"
import { usePostYoutubeOauth } from "@/core/api-state/use-post-youtube-oauth"

const mainState = UseMainState()
provide(UseMainStateKey, mainState)

const alretState = inject(UseAlretStateKey) as UseAlretStateType
const loadingState = inject(UseLoadingStateKey) as UseLoadingStateType

const getStatus = UseGetStatus()

// ログアウト後に同期状態をリセット
watch(getStatus.data, (value) => {
  if (value?.isLogined === false) {
    mainState.syncPlayer.resetSync()
  }
})

const urlParams = new URLSearchParams(window.location.search)
// 共有した比較結果を開いた時の処理
const comparisonId = urlParams.get("comparisonId")
if (comparisonId) {
  ;(async () => {
    const comparion = await getComparisonById(Number(comparisonId))
    const loadingId = loadingState.run()
    if (
      await mainState.syncPlayer.loadSync(
        comparion.video1Url,
        comparion.video1TimeSt,
        comparion.video2Url,
        comparion.video2TimeSt
      )
    ) {
      alretState.clear()
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
    } else {
      alretState.add("動画の読み込みでエラーが発生しました。")
    }
    loadingState.stop(loadingId)
  })()
}

// Oauthで認可された後の処理
const code = urlParams.get("code")
const postYoutubeOauth = usePostYoutubeOauth()
if (code) handleYoutubeOauthCallback(code, mainState, postYoutubeOauth)
</script>

<template>
  <div class="max-w-[600px]">
    <div class="px-1">
      <FileControllerI v-show="getStatus.data.value?.isLogined"></FileControllerI>
      <ModalSaveI></ModalSaveI>
      <ModalOpenI v-if="mainState.openModal.subscription.opened.value"></ModalOpenI>
      <Memo
        :title="mainState.memo.subscription.title.value"
        :memo="mainState.memo.subscription.memo.value"
        v-show="mainState.memo.subscription.isShowed.value"
      ></Memo>
      <SyncOptionI class="my-2"></SyncOptionI>
    </div>

    <PlayerOneI></PlayerOneI>
    <PlayerTwoI></PlayerTwoI>
    <SyncControllerI v-show="mainState.syncPlayer.subscription.synced.value"></SyncControllerI>
  </div>
  <ModalYoutubeSelectorI
    v-if="mainState.youtubeModal.subscription.opened.value"
  ></ModalYoutubeSelectorI>

  <ModalAdjustSpeedI></ModalAdjustSpeedI>
</template>
@/core/api-state/use-get-status
