const song = document.querySelector(".song");
const play = document.querySelector(".play");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".vid-container video");
let fakeDuration = 600;
//   Sounds
const sounds = document.querySelectorAll(".sound-picker button");
// Time Display
const timeDisplay = document.querySelector(".time-display");
// length of the outline
const outlineLength = outline.getTotalLength();
outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;
console.log(outline);

//   play sound
console.log(video);
play.addEventListener("click", () => {
  checkPlaying(song);
});

const changeTime = (e) => {
  console.log(e);
  fakeDuration = e.dataset.time;
  timeDisplay.textContent = `${fakeDuration / 60}:${fakeDuration % 60}"0`;
  song.currentTime = 0;
};

const changeSoundAndVideo = (e) => {
  song.src = e.dataset.sound;
  video.src = e.dataset.video;
  checkPlaying(song);
};

const checkPlaying = (song) => {
  if (song.paused) {
    song.play();
    video.play();
    play.src = "./svg/pause.svg";
  } else {
    song.pause();
    video.pause();
    play.src = "./svg/play.svg";
  }
};

song.ontimeupdate = () => {
  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime;
  let seconds = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);

  // ANimate the circle
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;

  timeDisplay.textContent = `${minutes}:${seconds}`;

  if (currentTime >= fakeDuration) {
    song.currentTime = 0;
    play.src = "./svg/play.svg";
    video.pause();
    song.pause();
  }
};
