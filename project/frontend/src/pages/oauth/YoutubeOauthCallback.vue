<script setup lang="ts">
import { inject } from "vue"
import { useRouter } from "vue-router"
import { YoutubeApi } from "@/core/openapiClient"
import {
  useAlretListStateKey,
  useAlretListStateType,
} from "@/pages/dashboard/parts/AlretList/useAlretListState"
const router = useRouter()

const useAlretListState = inject(useAlretListStateKey) as useAlretListStateType

const exec = async () => {
  // 現在のURLを取得
  const urlParams = new URLSearchParams(window.location.search)
  // キーに対応する値を取得
  const code = urlParams.get("code")
  if (code) {
    const youtubeApi = new YoutubeApi()
    try {
      await youtubeApi.youtubeOauthPost({ inlineObject2: { code: code } })
    } catch {
      useAlretListState.add("Youtubeとの連携でエラーが発生しました。")
    }
  }
  router.push({ name: "index" })
}

exec()
</script>

<template>
  <div></div>
</template>
