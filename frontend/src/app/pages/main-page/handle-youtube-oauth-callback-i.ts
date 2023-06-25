import { inject } from "vue"
import { useRouter } from "vue-router"
import { YoutubeApi } from "@/core/openapiClient"
import { UseAlretStateKey, type UseAlretStateType } from "@/app/use-alret-state"
import { type UseMainStateType } from "@/app/pages/main-page/use-main-state"
import { UseUserStateKey, type UseUserStateType } from "@/app/use-user-state"
import { UseLoadingStateKey, type UseLoadingStateType } from "@/app/use-loading-state"
import { apiConfig } from "@/core/openapi"

/**
 * Youtube連携後の処理
 */
export const handleYoutubeOauthCallback = async (code: string, mainState: UseMainStateType) => {
  const router = useRouter()
  const alretState = inject(UseAlretStateKey) as UseAlretStateType
  const userState = inject(UseUserStateKey) as UseUserStateType
  const loadingState = inject(UseLoadingStateKey) as UseLoadingStateType

  const loadingId = loadingState.run()
  const youtubeApi = new YoutubeApi(apiConfig)
  try {
    await youtubeApi.youtubeOauthPost({ inlineObject2: { code: code } })
    await userState.load()
    mainState.youtubeModal.load()
    loadingState.stop(loadingId)
    alretState.clear()
    loadingState.save()
  } catch {
    alretState.add("Youtubeとの連携でエラーが発生しました。")
  }
  router.push({ name: "index" })
}
