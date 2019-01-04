let speedIdx = 2
const speedMultiplyers = [0.5, 0.75, 1, 2, 4, 8]

// Visit https://keycode.info/ to remap the keys below. 
const INCREASE_SPEED = 93 // this is the [ char
const DECREASE_SPEED = 91 // this is the ] char

document.addEventListener('keypress', event => {
    if(event.keyCode === INCREASE_SPEED && speedIdx < speedMultiplyers.length){
        speedIdx += 1
    } else if (event.keyCode === DECREASE_SPEED && speedIdx > 0) {
        speedIdx -= 1
    }
    const videoPlayer = document.getElementsByTagName('video')[0];
    videoPlayer.playbackRate = speedMultiplyers[speedIdx]
});
