// User Settings
const DECREASE_SPEED = 219; // this is the [ char by default. Visit https://keycode.info/ to remap the keys below.
const INCREASE_SPEED = 221; // this is the ] char by default.
const INITIATE_PLAYER = 220; // this is the \ char by default.
const GET_MULTIPLIER = (currentPlaybackRate, direction) => currentPlaybackRate >= 3 && (direction > 0 || currentPlaybackRate >= 3.25) ? 0.25 : 0.1;
// End User Settings

let currentSpeed;
let videoPlayer;

const updateSpeedDisplay = value => {
  document.getElementById("videoPlayerDisplay").innerHTML = `Speed: ${
    videoPlayer.playbackRate
  }`;
};

document.addEventListener("keydown", event => {
  if (event.keyCode === INITIATE_PLAYER) {
    videoPlayer = document.getElementsByTagName("video")[0];
    if (!videoPlayer) {
      console.log("no video found");
      return;
    } else {
      var newDiv = document.createElement("div");
      var newContent = document.createTextNode(
        `Speed: ${videoPlayer.playbackRate}`
      );
      newDiv.prepend(newContent);
      newDiv.id = "videoPlayerDisplay";
      newDiv.style =
        "position: fixed; top: 0px !important; left: 0px !important; display: inline-block; z-index: 99999; color: white; background-color: black; opacity: 0.25;";
      document.body.appendChild(newDiv);
    }
  }

  if (event.keyCode === INCREASE_SPEED || event.keyCode === DECREASE_SPEED) {
    const currentPlaybackRate = videoPlayer.playbackRate;
    const direction = event.keyCode === INCREASE_SPEED ? 1 : -1;
    const multiplier = GET_MULTIPLIER(currentPlaybackRate, direction);

    const newPlaybackRate = currentPlaybackRate + direction * multiplier;

    videoPlayer.playbackRate = newPlaybackRate;
    updateSpeedDisplay(newPlaybackRate);
  }
});
