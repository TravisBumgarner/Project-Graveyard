// ==UserScript==
// @name         Custom Video Speeds
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Add Custom Video Speeds to Video Players
// @author       Travis Bumgarner
// @include /.*/
// @grant        none
// ==/UserScript==

// User Settings
const DEFAULT_SPEED_INDEX = 3
const SPEED_MULTIPLYERS = [0.5, 0.75, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8, 9, 10, 15] // Max multiplyer is 15x.
const DECREASE_SPEED = 219 // this is the [ char by default. Visit https://keycode.info/ to remap the keys below.
const INCREASE_SPEED = 221 // this is the ] char by default.
// End User Settings

let speedIdx = DEFAULT_SPEED_INDEX
let currentVideoPlayerId = null

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const setPlayerSpeed = (speedIdx) => {
    const videoPlayer = document.getElementsByTagName('video')[0];

    if(!videoPlayer){return}

    videoPlayer.playbackRate = SPEED_MULTIPLYERS[speedIdx]
    console.log(`Now speeding at ${SPEED_MULTIPLYERS[speedIdx]}`)
}

document.addEventListener('keydown', event => {
    if(event.keyCode === INCREASE_SPEED && speedIdx < SPEED_MULTIPLYERS.length){
        speedIdx += 1
    } else if (event.keyCode === DECREASE_SPEED && speedIdx > 0) {
        speedIdx -= 1
    }
    setPlayerSpeed(speedIdx)
})

const addVideoEventListeners = (videoPlayer) => {
    // When player pauses and resumes on some sites, the speed resets itself.
    videoPlayer.addEventListener('play', () => {
        console.log(`Now resuming at ${SPEED_MULTIPLYERS[speedIdx]}`)
        setPlayerSpeed(speedIdx)
    })

    // When current video is done, get ready to apply settings to next video.
    videoPlayer.addEventListener('ended', () => {
        applySettingsToNewVideo()
    })
}

const applySettingsToNewVideo = async () => {
    let nextVideoPlayerId
    let nextVideoPlayer

    while(currentVideoPlayerId === nextVideoPlayerId || typeof nextVideoPlayerId === 'undefined'){
        await sleep(50)
        nextVideoPlayer = document.getElementsByTagName('video')[0]

        if (typeof nextVideoPlayer === "undefined"){continue}
        nextVideoPlayerId = nextVideoPlayer.id
    }
    currentVideoPlayerId = nextVideoPlayerId
    addVideoEventListeners(nextVideoPlayer)
    setPlayerSpeed(speedIdx)
}

window.addEventListener('load', () => {
    const videoPlayer = document.getElementsByTagName('video')[0];

    if(!videoPlayer){return}

    currentVideoPlayerId = videoPlayer.id

    setPlayerSpeed(speedIdx)
    addVideoEventListeners(videoPlayer)
}, false);
