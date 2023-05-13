import { InjectionKey, reactive, computed, ComputedRef } from "vue"
import { IVideoPlayer } from "./IVideoPlayer"
import { YouTubePlayer } from "./YouTubePlayer"
import { VideoNo } from "@/app/pages/main/state/YoutubeSelectorModalState"
type UsePlayerType = {
  getPlayer(): IVideoPlayer
  setPlayer(player: IVideoPlayer): void
}

const usePlayer = (videoNo: VideoNo): UsePlayerType => {
  const player = new YouTubePlayer(
    "youtube-video-" + videoNo,
    "https://www.youtube.com/embed/nLKSSdMWZ8g"
  )
  const getPlayer = (): IVideoPlayer => {
    return player
  }

  const setPlayer = (player: IVideoPlayer) => {
    player = player
  }

  return {
    getPlayer: getPlayer,
    setPlayer: setPlayer,
  }
}

const UsePlayer1Key: InjectionKey<UsePlayerType> = Symbol("UsePlayer1")
const UsePlayer2Key: InjectionKey<UsePlayerType> = Symbol("UsePlayer2")

export { usePlayer, UsePlayer1Key, UsePlayer2Key, UsePlayerType }
