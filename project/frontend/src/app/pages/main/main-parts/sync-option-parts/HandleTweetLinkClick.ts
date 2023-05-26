import { inject } from "vue"
import { ComparisonsApi } from "@/core/openapiClient"
import {
  UseAlretStateKey,
  UseAlretStateType,
} from "@/app/dashboard-parts/UseAlretState"
import {
  UseMainStateKey,
  UseMainStateType,
} from "@/app/pages/main/UseMainState"
import {
  UseLoadingStateKey,
  UseLoadingStateType,
} from "@/app/loading-parts/LoadingState"
import { YouTubePlayer } from "@/app/pages/main/main-parts/player-area-parts/YouTubePlayer"
import { extractYoutubeId } from "@/core/extractYoutubeId"
import { apiConfig } from "@/core/openapi"

export const handleTweetLinkClick = async (comparisonId: number) => {
  const useAlretState = inject(UseAlretStateKey) as UseAlretStateType
  const useMainState = inject(UseMainStateKey) as UseMainStateType
  const useLoadingState = inject(UseLoadingStateKey) as UseLoadingStateType

  const loadingId = useLoadingState.run()
  const comparisonsApi = new ComparisonsApi(apiConfig)
  try {
    const response = await comparisonsApi.comparisonsComparisonIdGet({
      comparisonId: comparisonId,
    })
    useMainState.memo.changeTitle(response.title ?? "")
    useMainState.memo.changeMemo(response.memo ?? "")

    const youtubeOneId = extractYoutubeId(response.video1Url)
    const youtubeTwoId = extractYoutubeId(response.video2Url)
    const playerOne = new YouTubePlayer("youtube-video-one", youtubeOneId)
    const playerTwo = new YouTubePlayer("youtube-video-two", youtubeTwoId)
    await playerOne.load()
    await playerTwo.load()
    // iframe生成後に数秒待機しないとなぜかiframeの制御が効かない。
    setTimeout(async () => {
      await playerOne.stop()
      await playerTwo.stop()
      await playerOne.seekTo(response.video1TimeSt)
      await playerTwo.seekTo(response.video2TimeSt)
      useMainState.syncPlayer.playerOneManager.value = playerOne
      useMainState.syncPlayer.playerTwoManager.value = playerTwo
      // seekToをした後に数秒待機しないとcurrentTimeが古い値になる。
      setTimeout(async () => {
        useMainState.syncPlayer.runSync()
        useLoadingState.stop(loadingId)
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
      }, 3000)
    }, 2000)
  } catch {
    useAlretState.add("動画の読み込みでエラーが発生しました。")
  }
}
