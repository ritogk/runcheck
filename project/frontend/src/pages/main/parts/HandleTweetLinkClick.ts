import { inject } from "vue"
import { ComparisonsApi } from "@/core/openapiClient"
import {
  useAlretListStateKey,
  useAlretListStateType,
} from "@/pages/dashboard/parts/AlretList/useAlretListState"
import { UseMainStateKey, UseMainStateType } from "@/pages/main/UseMainState"
import { YouTubePlayer } from "@/pages/main/parts/video-area-parts/libs/YouTubePlayer"

export const handleTweetLinkClick = async (comparisonId: number) => {
  const useAlretListState = inject(
    useAlretListStateKey
  ) as useAlretListStateType
  const useMainState = inject(UseMainStateKey) as UseMainStateType
  const comparisonsApi = new ComparisonsApi()
  try {
    const response = await comparisonsApi.comparisonsComparisonIdGet({
      comparisonId: comparisonId,
    })
    useMainState.title.changeTitle(response.title ?? "")
    useMainState.title.changeMemo(response.memo ?? "")
    const playerOne = new YouTubePlayer("youtube-video-own", response.video1Url)
    const playerTwo = new YouTubePlayer("youtube-video-two", response.video2Url)
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
      }, 2000)
    }, 2000)
  } catch {
    useAlretListState.add("動画の読み込みでエラーが発生しました。")
  }
}
