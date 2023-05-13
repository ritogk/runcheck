import { inject } from "vue"
import { useRouter } from "vue-router"
import { YoutubeApi } from "@/core/openapiClient"
import {
  useAlretListStateKey,
  useAlretListStateType,
} from "@/pages/dashboard/parts/AlretList/useAlretListState"
import { UseMainStateKey, UseMainStateType } from "@/pages/main/UseMainState"
import { useUserStateKey, useUserStateType } from "@/components/useUserState"

export const callbackYoutubeOauth = async (code: string) => {
  const router = useRouter()
  const useAlretListState = inject(
    useAlretListStateKey
  ) as useAlretListStateType
  const useMainState = inject(UseMainStateKey) as UseMainStateType
  const useUserState = inject(useUserStateKey) as useUserStateType

  const youtubeApi = new YoutubeApi()
  try {
    await youtubeApi.youtubeOauthPost({ inlineObject2: { code: code } })
    await useUserState.load()
    useMainState.youtubeModal.load()
  } catch {
    useAlretListState.add("Youtubeとの連携でエラーが発生しました。")
  }
  router.push({ name: "index" })
}
