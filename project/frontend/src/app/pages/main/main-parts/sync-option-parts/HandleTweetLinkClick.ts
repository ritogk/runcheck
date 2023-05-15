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

export const handleTweetLinkClick = async (comparisonId: number) => {
  const useAlretState = inject(UseAlretStateKey) as UseAlretStateType
  const useMainState = inject(UseMainStateKey) as UseMainStateType
  const useLoadingState = inject(UseLoadingStateKey) as UseLoadingStateType

  useLoadingState.run()
  const comparisonsApi = new ComparisonsApi()
  try {
    const response = await comparisonsApi.comparisonsComparisonIdGet({
      comparisonId: comparisonId,
    })
    useMainState.memo.changeTitle(response.title ?? "")
    useMainState.memo.changeMemo(response.memo ?? "")

    const youtubeOneId = response.video1Url.substring(
      response.video1Url.length - 11
    )
    const youtubeTwoId = response.video2Url.substring(
      response.video2Url.length - 11
    )
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
      useMainState.syncPlayer.playerOneManager.changePlayer(playerOne)
      useMainState.syncPlayer.playerTwoManager.changePlayer(playerTwo)
      // seekToをした後に数秒待機しないとcurrentTimeが古い値になる。
      setTimeout(async () => {
        useMainState.syncPlayer.runSync()
        useLoadingState.stop()
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
      }, 2000)
    }, 2000)
  } catch {
    useAlretState.add("動画の読み込みでエラーが発生しました。")
  }
}
