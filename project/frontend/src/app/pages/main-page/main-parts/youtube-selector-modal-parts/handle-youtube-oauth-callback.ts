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
} from "@/app/pages/main-page/use-main-state"
import {
  UseUserStateKey,
  UseUserStateType,
} from "@/app/dashboard-parts/UseUserState"
import {
  UseLoadingStateKey,
  UseLoadingStateType,
} from "@/app/loading-parts/loading-state"
import { apiConfig } from "@/core/openapi"

export const handleYoutubeOauthCallback = async (code: string) => {
  const router = useRouter()
  const useAlretState = inject(UseAlretStateKey) as UseAlretStateType
  const useMainState = inject(UseMainStateKey) as UseMainStateType
  const useUserState = inject(UseUserStateKey) as UseUserStateType
  const useLoadingState = inject(UseLoadingStateKey) as UseLoadingStateType

  const loadingId = useLoadingState.run()
  const youtubeApi = new YoutubeApi(apiConfig)
  try {
    await youtubeApi.youtubeOauthPost({ inlineObject2: { code: code } })
    await useUserState.load()
    useMainState.youtubeModal.load()
    useLoadingState.stop(loadingId)
    useAlretState.clear()
    useLoadingState.save()
  } catch {
    useAlretState.add("Youtubeとの連携でエラーが発生しました。")
  }
  router.push({ name: "index" })
}
