import { inject } from "vue"
import { useRouter } from "vue-router"
import { YoutubeApi } from "@/core/openapiClient"
import {
  useAlretStateKey,
  useAlretStateType,
} from "@/app/dashboard-parts/useAlretState"
import { UseMainStateKey, UseMainStateType } from "@/pages/main/UseMainState"
import {
  useUserStateKey,
  useUserStateType,
} from "@/app/dashboard-parts/useUserState"

export const callbackYoutubeOauth = async (code: string) => {
  const router = useRouter()
  const useAlretState = inject(useAlretStateKey) as useAlretStateType
  const useMainState = inject(UseMainStateKey) as UseMainStateType
  const useUserState = inject(useUserStateKey) as useUserStateType

  const youtubeApi = new YoutubeApi()
  try {
    await youtubeApi.youtubeOauthPost({ inlineObject2: { code: code } })
    await useUserState.load()
    useMainState.youtubeModal.load()
  } catch {
    useAlretState.add("Youtubeとの連携でエラーが発生しました。")
  }
  router.push({ name: "index" })
}
