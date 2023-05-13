import { inject } from "vue"
import { useRouter } from "vue-router"
import { YoutubeApi } from "@/core/openapiClient"
import {
  UseAlretStateKey,
  UseAlretStateType,
} from "@/app/dashboard-parts/UseAlretState"
import {
  UseMainStateKey,
  UseMainStateType,
} from "@/app/pages/main/UseMainState"
import {
  UseUserStateKey,
  UseUserStateType,
} from "@/app/dashboard-parts/UseUserState"

export const callbackYoutubeOauth = async (code: string) => {
  const router = useRouter()
  const useAlretState = inject(UseAlretStateKey) as UseAlretStateType
  const useMainState = inject(UseMainStateKey) as UseMainStateType
  const useUserState = inject(UseUserStateKey) as UseUserStateType

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
