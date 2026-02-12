type Device = "PC" | "IOS" | "ANDROID"

export const getDevice = (): Device => {
  const ua = navigator.userAgent
  if (/android/i.test(ua)) {
    return "ANDROID"
  } else if (
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  ) {
    return "IOS"
  } else {
    return "PC"
  }
}
