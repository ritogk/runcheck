import { computed } from "vue"
import { IVideoPlayer, VideoType, Status } from "./IVideoPlayer"

export class DummyPlayer implements IVideoPlayer {
  public readonly VIDEO_TYPE = VideoType.NONE

  load = async () => {
    return Promise.resolve()
  }

  play = () => {
    return Promise.resolve()
  }

  stop = async () => {
    return Promise.resolve()
  }

  mute = () => {
    return Promise.resolve()
  }

  unMute = () => {
    return
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
    return Promise.resolve()
  }

  getCurrentTime = async (): Promise<number> => {
    return 1
  }

  getDuration = async (): Promise<number> => {
    return 1
  }

  async destory(): Promise<void> {
    return
  }

  getVideoType = (): VideoType => {
    return VideoType.NONE
  }

  getPath = (): Promise<string> => {
    return Promise.resolve("")
  }

  subscription = {
    status: computed(() => {
      return Status.WAITING
    }),
  }
}
