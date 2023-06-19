<script setup lang="ts">
import { provide, inject } from "vue"
import { UseMainState, UseMainStateKey } from "./main-page/main-state"
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
import { UseUserStateKey, UseUserStateType } from "@/app/user-state"
import { handleYoutubeOauthCallback } from "./main-page/handle-youtube-oauth-callback-i"

const useMainState = UseMainState()
provide(UseMainStateKey, useMainState)
// Oauthで認可された後の処理
const urlParams = new URLSearchParams(window.location.search)
const code = urlParams.get("code")
if (code) handleYoutubeOauthCallback(code, useMainState)

const userState = inject(UseUserStateKey) as UseUserStateType
</script>

<template>
  <div class="max-w-[600px]">
    <div class="px-1">
      <FileControllerI
        v-show="userState.subscription.logined.value"
      ></FileControllerI>
      <ModalSaveI></ModalSaveI>
      <ModalOpenI></ModalOpenI>
      <Memo
        :title="useMainState.memo.subscription.title.value"
        :memo="useMainState.memo.subscription.memo.value"
        v-show="
          userState.subscription.logined.value &&
          useMainState.memo.subscription.title.value &&
          useMainState.memo.subscription.memo.value
        "
      ></Memo>
      <SyncOptionI class="my-2"></SyncOptionI>
    </div>

    <PlayerOneI></PlayerOneI>
    <PlayerTwoI></PlayerTwoI>
    <SyncControllerI
      v-show="useMainState.syncPlayer.subscription.synced.value"
    ></SyncControllerI>
  </div>
  <ModalYoutubeSelectorI
    v-if="useMainState.youtubeModal.subscription.opened.value"
  ></ModalYoutubeSelectorI>
  <ModalAdjustSpeedI></ModalAdjustSpeedI>
</template>
