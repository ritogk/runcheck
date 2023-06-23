<script setup lang="ts">
import { provide, inject } from "vue"
import { UseMainState, UseMainStateKey } from "./main-page/use-main-state"
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
import { UseUserStateKey, UseUserStateType } from "@/app/use-user-state"
import { handleYoutubeOauthCallback } from "./main-page/handle-youtube-oauth-callback-i"
import { handleComparisonOpen } from "./main-page/handle-comparison-open-i"

const mainState = UseMainState()
provide(UseMainStateKey, mainState)

const urlParams = new URLSearchParams(window.location.search)
// 比較情報を開いた場合の処理
const comparisonId = urlParams.get("comparisonId")
if (comparisonId) {
  ;(async () => {
    await handleComparisonOpen(Number(comparisonId), mainState)
  })()
}

// Oauthで認可された後の処理
const code = urlParams.get("code")
if (code) handleYoutubeOauthCallback(code, mainState)

const userState = inject(UseUserStateKey) as UseUserStateType
</script>

<template>
  <div class="max-w-[600px]">
    <div class="px-1">
      <FileControllerI v-show="userState.subscription.logined.value"></FileControllerI>
      <ModalSaveI></ModalSaveI>
      <ModalOpenI></ModalOpenI>
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
