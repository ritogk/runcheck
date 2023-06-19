import { inject } from "vue"
import { ComparisonsApi } from "@/core/openapiClient"
import { UseAlretStateKey, UseAlretStateType } from "@/app/alret-state"
import { UseMainStateType } from "@/app/pages/main-page/main-state"
import { UseLoadingStateKey, UseLoadingStateType } from "@/app/loading-state"
import { YouTubePlayer } from "@/app/pages/main-page/player/youtube-player"
import { extractYoutubeId } from "@/core/extract-youtube-id"
import { apiConfig } from "@/core/openapi"

export const handleComparisonOpen = async (
  comparisonId: number,
  mainState: UseMainStateType
) => {
  const alretState = inject(UseAlretStateKey) as UseAlretStateType
  const loadingState = inject(UseLoadingStateKey) as UseLoadingStateType

  const loadingId = loadingState.run()
  const comparisonsApi = new ComparisonsApi(apiConfig)
  try {
    const response = await comparisonsApi.comparisonsComparisonIdGet({
      comparisonId: comparisonId,
    })
    mainState.memo.changeTitle(response.title ?? "")
    mainState.memo.changeMemo(response.memo ?? "")

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
      mainState.syncPlayer.playerOne.value = playerOne
      mainState.syncPlayer.playerTwo.value = playerTwo
      // seekToをした後に数秒待機しないとcurrentTimeが古い値になる。
      setTimeout(async () => {
        mainState.syncPlayer.runSync()
        loadingState.stop(loadingId)
        alretState.clear()
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
      }, 3000)
    }, 2000)
  } catch {
    alretState.add("動画の読み込みでエラーが発生しました。")
  }
}
