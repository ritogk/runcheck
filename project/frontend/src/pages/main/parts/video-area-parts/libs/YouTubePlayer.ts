import { computed, ref } from "vue"
import YPlayer from "youtube-player"
import { IVideoPlayer, VideoType, Status } from "./IVideoPlayer"
import { YouTubePlayer as YouTubePlayerType } from "youtube-player/dist/types"
import PlayerStates from "youtube-player/dist/constants/PlayerStates"

export class YouTubePlayer implements IVideoPlayer {
  private player: YouTubePlayerType
  public _status = ref(Status.WAITING)

  constructor(elementId: string, youtubeUrl: string) {
    this.player = YPlayer(elementId)
    this.player.loadVideoByUrl(youtubeUrl)
    // ステータス変更を監視
    this.player.on("stateChange", (status) => {
      switch (status.data) {
        case PlayerStates.UNSTARTED:
          this._status.value = Status.WAITING
          break
        case PlayerStates.BUFFERING:
          this._status.value = Status.CAN_PLAY
          break
        case PlayerStates.PLAYING:
          this._status.value = Status.PLAYING
          break
        case PlayerStates.PAUSED:
          this._status.value = Status.PAUSE
          break
        case PlayerStates.ENDED:
          this._status.value = Status.ENDED
          break
      }
    })
  }

  get videoType() {
    return VideoType.YOUTUBE
  }

  changeVideo(url: string): void {
    this.player.loadVideoByUrl(url)
  }

  play = () => {
    return this.player.playVideo()
  }

  stop = async () => {
    return this.player.pauseVideo()
  }

  mute = () => {
    return this.player.mute()
  }

  unMute = () => {
    this.player.unMute()
  }

  adjustSpeed = (speed: number) => {
    this.player.setPlaybackRate(speed)
  }

  enableRepeat = () => {
    return
  }

  disableRepeat = () => {
    return
  }

  seekTo = async (seconds: number) => {
    return this.player.seekTo(seconds, true)
  }

  getCurrentPosition = async (): Promise<number> => {
    return await this.player.getCurrentTime()
  }

  setCurrentPosition = (currentPosition: number) => {}

  getDuration = async (): Promise<number> => {
    return this.player.getDuration()
  }

  destory(): Promise<void> {
    return this.player.destroy()
  }

  public subscription = {
    status: computed(() => {
      return this._status.value
    }),
  }
}
