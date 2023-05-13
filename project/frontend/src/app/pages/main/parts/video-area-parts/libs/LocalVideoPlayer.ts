import { computed, ref } from "vue"
import { IVideoPlayer, VideoType, Status } from "./IVideoPlayer"

export class LocalVideoPlayer implements IVideoPlayer {
  private videoElement: HTMLVideoElement
  public _status = ref(Status.WAITING)

  constructor(videoElement: HTMLVideoElement, objectURL: string) {
    videoElement.src = objectURL
    this.videoElement = videoElement
  }

  get videoType() {
    return VideoType.LOCAL
  }

  load = async () => {
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
    return Promise.resolve(this.videoElement.load())
  }

  changeVideo(url: string): void {
    this.videoElement.src = url
    this.videoElement.load()
  }

  play = () => {
    return this.videoElement.play()
  }

  stop = async () => {
    return Promise.resolve(this.videoElement.pause())
  }

  mute = async () => {
    this.videoElement.muted = true
    return Promise.resolve()
  }

  unMute = () => {
    this.videoElement.muted = false
  }

  adjustSpeed = (speed: number) => {
    this.videoElement.playbackRate = speed
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

  getDuration = async (): Promise<number> => {
    return Promise.resolve(this.videoElement.duration)
  }

  getPath = (): Promise<string> => {
    return Promise.resolve(this.videoElement.src)
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
