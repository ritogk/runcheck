import { inject } from "vue"
import { useRouter } from "vue-router"
import { YoutubeApi } from "@/core/openapiClient"
import { UseAlretStateKey, UseAlretStateType } from "@/app/alret-state"
import { UseMainStateType } from "@/app/pages/main-page/main-state"
import { UseUserStateKey, UseUserStateType } from "@/app/user-state"
import { UseLoadingStateKey, UseLoadingStateType } from "@/app/loading-state"
import { apiConfig } from "@/core/openapi"

/**
 * Youtube連携後の処理
 */
export const handleYoutubeOauthCallback = async (
  code: string,
  mainState: UseMainStateType
) => {
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
