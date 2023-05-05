import { computed, ref } from "vue"
import { IVideoPlayer, VideoType, Status } from "./IVideoPlayer"

export class LocalVideoPlayer implements IVideoPlayer {
  private videoElement: HTMLVideoElement
  public _status = ref(Status.WAITING)

  constructor(videoElement: HTMLVideoElement, objectURL: string) {
    videoElement.src = objectURL
    videoElement.load()
    this.videoElement = videoElement

    // ステータスの変更を監視
    this.videoElement.addEventListener("loadeddata", () => {
      this._status.value = Status.WAITING
    })
    this.videoElement.addEventListener("canplay", () => {
      this._status.value = Status.CAN_PLAY
    })
    this.videoElement.addEventListener("play", () => {
      this._status.value = Status.PLAYING
    })
    this.videoElement.addEventListener("pause", () => {
      this._status.value = Status.PAUSE
    })
    this.videoElement.addEventListener("ended", () => {
      this._status.value = Status.ENDED
    })
  }

  get videoType() {
    return VideoType.LOCAL
  }

  changeVideo(url: string): void {
    this.videoElement.src = url
    this.videoElement.load()
  }

  play = () => {
    this.videoElement.play()
  }

  stop = async () => {
    return Promise.resolve(this.videoElement.pause())
  }

  mute = () => {
    this.videoElement.muted = true
  }

  unMute = () => {
    this.videoElement.muted = false
  }

  adjustSpeed = (speed: number) => {
    return
  }

  enableRepeat = () => {
    return
  }

  disableRepeat = () => {
    return
  }

  seekTo = async (seconds: number) => {
    this.videoElement.currentTime = seconds
    return Promise.resolve()
  }

  getCurrentPosition = async (): Promise<number> => {
    return Promise.resolve(this.videoElement.currentTime)
  }

  setCurrentPosition = (currentPosition: number) => {
    return
  }

  async destory(): Promise<void> {
    this.videoElement.src = ""
    return
  }

  public subscription = {
    status: computed(() => {
      return this._status.value
    }),
  }
}
