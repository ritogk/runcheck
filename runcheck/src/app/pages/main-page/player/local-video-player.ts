import { computed, ref } from "vue"
import { IVideoPlayer, VideoType, Status } from "./i-video-player"

export class LocalVideoPlayer implements IVideoPlayer {
  private _videoElement: HTMLVideoElement
  private _status = ref(Status.WAITING)

  constructor(videoElement: HTMLVideoElement, objectURL: string) {
    videoElement.src = objectURL
    this._videoElement = videoElement
  }

  load = async () => {
    // ステータスの変更を監視
    this._videoElement.addEventListener("loadeddata", () => {
      this._status.value = Status.WAITING
    })
    this._videoElement.addEventListener("canplay", () => {
      this._status.value = Status.CAN_PLAY
    })
    this._videoElement.addEventListener("play", () => {
      this._status.value = Status.PLAYING
    })
    this._videoElement.addEventListener("pause", () => {
      this._status.value = Status.PAUSE
    })
    this._videoElement.addEventListener("ended", () => {
      this._status.value = Status.ENDED
    })
    return Promise.resolve(this._videoElement.load())
  }

  play = () => {
    return this._videoElement.play()
  }

  stop = async () => {
    return Promise.resolve(this._videoElement.pause())
  }

  mute = async () => {
    this._videoElement.muted = true
    return Promise.resolve()
  }

  unMute = () => {
    this._videoElement.muted = false
  }

  adjustSpeed = (speed: number) => {
    this._videoElement.playbackRate = speed
  }

  enableRepeat = () => {
    return
  }

  disableRepeat = () => {
    return
  }

  seekTo = async (seconds: number) => {
    this._videoElement.currentTime = seconds
    return Promise.resolve()
  }

  getCurrentTime = async (): Promise<number> => {
    return Promise.resolve(this._videoElement.currentTime)
  }

  getDuration = async (): Promise<number> => {
    return Promise.resolve(this._videoElement.duration)
  }

  getPath = (): Promise<string> => {
    return Promise.resolve(this._videoElement.src)
  }

  async destory(): Promise<void> {
    this._videoElement.src = ""
    return
  }

  public subscription = {
    status: computed(() => {
      return this._status.value
    }),
    videoType: computed(() => {
      return VideoType.LOCAL
    }),
  }
}
