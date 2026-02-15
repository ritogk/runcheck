import { inject } from "vue"
import { useRouter } from "vue-router"
import { UseAlretStateKey, type UseAlretStateType } from "@/app/use-alret-state"
import { type UseMainStateType } from "@/app/pages/main-page/use-main-state"
import { UseLoadingStateKey, type UseLoadingStateType } from "@/app/use-loading-state"
import { usePostYoutubeOauth } from "@/core/api-state/use-post-youtube-oauth"

/**
 * Youtube連携後の処理
 */
export const handleYoutubeOauthCallback = async (
  code: string,
  mainState: UseMainStateType,
  postYoutubeOauth: ReturnType<typeof usePostYoutubeOauth>
) => {
  const router = useRouter()
  const alretState = inject(UseAlretStateKey) as UseAlretStateType
  const loadingState = inject(UseLoadingStateKey) as UseLoadingStateType

  const loadingId = loadingState.run()
  try {
    await postYoutubeOauth.mutateAsync(code)
    mainState.youtubeModal.load()
    loadingState.stop(loadingId)
    alretState.clear()
    loadingState.save()
  } catch {
    alretState.add("Youtubeとの連携でエラーが発生しました。")
  }
  router.push({ name: "index" })
}
