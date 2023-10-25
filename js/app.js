// Selectors

const musicContainer = document.querySelector("#music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

const audio = document.querySelector("#music");
const progress = document.querySelector("#progress");
const progressContainer = document.querySelector("#progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

// Song titles

const songs = [
  "CEM ADRIAN",
  "JONY",
  "JAH KHALIB",
  "EMIN",
  "BILLIE EILISH",
  "XXXTENTACION",
  "JANAGA",
];
let songIndex = 0;

// Load Song details

//Update song details
loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `./music/${song}.mp3`;
  cover.src = `./images/${song}.jpg`;
}

// Event Listener

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Play song function
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i").classList.remove("fa-play");
  playBtn.querySelector("i").classList.add("fa-pause");
  audio.play();
}

// Pause song function

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  audio.pause();
}

// Change songs
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// prev song function

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// next song function
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Time song update
audio.addEventListener("timeupdate", updateProgress);
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime * 100) / duration;
  progress.style.width = `${progressPercent}%`;
}

//Click on progress bar

progressContainer.addEventListener("click", setProgress);
function setProgress(e) {
  const width = this.clientWidth;
  // console.log(width);
  const clickX = e.offsetX;
  console.log(clickX);
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
