import { computed, ref } from "vue"
import YPlayer from "youtube-player"
import { IVideoPlayer, VideoType, Status } from "./IVideoPlayer"
import { YouTubePlayer as YouTubePlayerType } from "youtube-player/dist/types"
import PlayerStates from "youtube-player/dist/constants/PlayerStates"

export class YouTubePlayer implements IVideoPlayer {
  private _player: YouTubePlayerType
  private _youtubeId: string
  private _status = ref(Status.WAITING)
  public readonly VIDEO_TYPE = VideoType.YOUTUBE

  constructor(elementId: string, youtubeId: string) {
    this._player = YPlayer(elementId)
    this._youtubeId = youtubeId
  }

  load = async () => {
    // ステータス変更を監視
    this._player.on("stateChange", (status) => {
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
    return this._player.loadVideoById(this._youtubeId)
  }

  play = () => {
    return this._player.playVideo()
  }

  stop = async () => {
    return this._player.pauseVideo()
  }

  mute = () => {
    return this._player.mute()
  }

  unMute = () => {
    this._player.unMute()
  }

  adjustSpeed = (speed: number) => {
    this._player.setPlaybackRate(speed)
  }

  enableRepeat = () => {
    return
  }

  disableRepeat = () => {
    return
  }

  seekTo = async (seconds: number) => {
    return this._player.seekTo(seconds, true)
  }

  getCurrentTime = async (): Promise<number> => {
    return await this._player.getCurrentTime()
  }

  getDuration = async (): Promise<number> => {
    return this._player.getDuration()
  }

  destory(): Promise<void> {
    return this._player.destroy()
  }

  getPath = (): Promise<string> => {
    return this._player.getVideoUrl()
  }

  public subscription = {
    status: computed(() => {
      return this._status.value
    }),
  }
}
