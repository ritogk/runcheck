import { IVideoPlayer } from "./IVideoPlayer"

export class YouTubePlayer implements IVideoPlayer {
  private youtubeUrl: string
  constructor(youtubeUrl: string) {
    this.youtubeUrl = youtubeUrl
  }

  play = () => {
    return
  }

  stop = () => {
    return
  }

  mute = () => {
    return
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

  getCurrentPosition = (): number => {
    return 1
  }

  setCurrentPosition = (currentPosition: number) => {
    return
  }
}
