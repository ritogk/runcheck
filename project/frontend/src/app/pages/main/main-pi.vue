<script setup lang="ts">
import { provide, inject } from "vue"
import { UseMainState, UseMainStateKey } from "./UseMainState"
import PlayerOneI from "./main-parts/player-one-i.vue"
import PlayerTwoI from "./main-parts/player-two-i.vue"
import YoutubeSelectorModalI from "./main-parts/youtube-selector-modal-i.vue"
import AdjustSpeedModalI from "./main-parts/adjust-speed-modal-i.vue"
import FileControllerI from "./main-parts/file-controller-i.vue"
import SyncControllerI from "./main-parts/sync-controller-i.vue"
import SyncOptionI from "./main-parts/sync-option-i.vue"
import Memo from "./main-parts/memo.vue"
import {
  UseUserStateKey,
  UseUserStateType,
} from "@/app/dashboard-parts/UseUserState"

const useMainState = UseMainState()
provide(UseMainStateKey, useMainState)

const userState = inject(UseUserStateKey) as UseUserStateType
</script>

<template>
  <div class="max-w-[600px]">
    <div class="px-1">
      <FileControllerI
        v-show="userState.subscription.logined.value"
      ></FileControllerI>
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
  <YoutubeSelectorModalI></YoutubeSelectorModalI>
  <AdjustSpeedModalI></AdjustSpeedModalI>
</template>
