let speedIdx = 3 // For me, defaults to 2x speed.
const speedMultiplyers = [0.5, 0.75, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30]

// Visit https://keycode.info/ to remap the keys below.
const DECREASE_SPEED = 219 // this is the ] char
const INCREASE_SPEED = 221 // this is the [ char

let currentVideoPlayerId = null

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const setPlayerSpeed = (speedIdx) => {
    const videoPlayer = document.getElementsByTagName('video')[0];

    if(!videoPlayer){
        return
    }

    videoPlayer.playbackRate = speedMultiplyers[speedIdx]
    console.log(`Now speeding at ${speedMultiplyers[speedIdx]}`)
}

document.addEventListener('keydown', event => {
    if(event.keyCode === INCREASE_SPEED && speedIdx < speedMultiplyers.length){
        speedIdx += 1
    } else if (event.keyCode === DECREASE_SPEED && speedIdx > 0) {
        speedIdx -= 1
    }
    setPlayerSpeed(speedIdx)
})

const applySettingsToNewVideo = async () => {
    let nextVideoPlayerId
    let nextVideoPlayer
    console.log(currentVideoPlayerId, nextVideoPlayerId)
    while(currentVideoPlayerId === nextVideoPlayerId || typeof nextVideoPlayerId === 'undefined'){
      await sleep(50)
      nextVideoPlayer = document.getElementsByTagName('video')[0]

      if (typeof nextVideoPlayer === "undefined"){
          continue
      }

      nextVideoPlayerId = nextVideoPlayer.id
      console.log(currentVideoPlayerId, nextVideoPlayerId)

    }

    setPlayerSpeed(speedIdx)
    nextVideoPlayer.addEventListener('play', () => {
        console.log(`Now starting new video at ${speedMultiplyers[speedIdx]}`)
        setPlayerSpeed(speedIdx)
    })
}

window.addEventListener('load', () => {
    const videoPlayer = document.getElementsByTagName('video')[0];

    if(!videoPlayer){
        return
    }

    currentVideoPlayerId = videoPlayer.id

    setPlayerSpeed(speedIdx)

    // When player pauses and resumes on some sites, the speed resets itself.
    videoPlayer.addEventListener('play', () => {
        console.log(`Now resuming at ${speedMultiplyers[speedIdx]}`)
        setPlayerSpeed(speedIdx)
    })

    // When current video is done, get ready to apply settings to next video.
    videoPlayer.addEventListener('ended', () => {
        applySettingsToNewVideo()
    })
}, false);
