(()=> {
    let speedIdx = 3 // For me, defaults to 2x speed.
    const speedMultiplyers = [0.5, 0.75, 1, 2, 4, 6, 8]

    // Visit https://keycode.info/ to remap the keys below.
    const DECREASE_SPEED = 219 // this is the ] char
    const INCREASE_SPEED = 221 // this is the [ char

    document.addEventListener('keydown', event => {
        if(event.keyCode === INCREASE_SPEED && speedIdx < speedMultiplyers.length){
            speedIdx += 1
        } else if (event.keyCode === DECREASE_SPEED && speedIdx > 0) {
            speedIdx -= 1
        }
        setPlayerSpeed(speedIdx)
    })

    const setPlayerSpeed = (speedIdx) => {
        const videoPlayer = document.getElementsByTagName('video')[0];
        videoPlayer.playbackRate = speedMultiplyers[speedIdx]
        console.log(`Now speeding at ${speedMultiplyers[speedIdx]}`)
    }

    setPlayerSpeed(speedIdx)
})()
