const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const shuffleBtn = document.getElementById('rand');

// Music
const songs = [
  {
    name: 'song1',
    image: 'img1',
    displayName: "Don't Think About It (Prod. Louis Bell)",
    artist: 'Moosh & Twist',
  },
  {
    name: 'song2',
    image: 'img2',
    displayName: 'Changes (Léon - Tired of Talking Remix)',
    artist: 'Skizzy Mars',
  },
  {
    name: 'song3',
    image: 'img3',
    displayName: 'Bout It (ft. Daniel James & Benjamin O)',
    artist: 'Jeremy Zucker',
  },
  {
    name: 'song4',
    image: 'img4',
    displayName: 'The Alphabet',
    artist: 'Luke Christopher',
  },
  {
    name: 'song5',
    image: 'img5',
    displayName: 'Paint',
    artist: 'Sol',
  },
  {
    name: 'song6',
    image: 'img6',
    displayName: 'You And I (Prod. Scotty Muzik)',
    artist: 'Nate Good',
  },
  {
    name: 'song7',
    image: 'img7',
    displayName: 'Roses (Remix) (Prod. Azel North)',
    artist: "Gentleman's Vibe",
  },
  {
    name: 'song8',
    image: 'img8',
    displayName: "I'm Good (ft. RoZe) (Prod. Drumma Battalion)",
    artist: 'Abstract',
  },
  {
    name: 'song9',
    image: 'img9',
    displayName: 'Live It Up',
    artist: 'YONAS',
  },
  {
    name: 'song10',
    image: 'img10',
    displayName: 'Logic',
    artist: 'Juice',
  },
  {
    name: 'song11',
    image: 'img11',
    displayName: 'Gold Coast (Prod. Jacob Levan)',
    artist: 'Nate Good',
  },
  {
    name: 'song12',
    image: 'img12',
    displayName: 'Champagne Rain',
    artist: 'Luke Christopher',
  },
];

// Check if playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}
// pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update the DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.image}.jpg`;
}

// Song Indexes
let songIndex = 0;
let lastIndex = songs.length - 1;

// Previous Song
function prevSong() {
  if (songIndex !== 0) {
    songIndex--;
  } else {
    songIndex = lastIndex;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  if (songIndex !== lastIndex) {
    songIndex++;
  } else {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Random Song Index Generator
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// Shuffle Songs
function shuffleSong() {
  let randomIndex = getRandomInt(0, lastIndex);
  loadSong(songs[randomIndex]);
  playSong();
}

// On page load - select first song
loadSong(songs[songIndex]);

// Update progress bar & time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // update the progress width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMin = Math.floor(duration / 60);
    let durationSec = Math.floor(duration % 60);
    if (durationSec < 10) {
      durationSec = `0${durationSec}`;
    }
    // Delay switching duration element to avoid NaN
    if (durationSec) {
      durationEl.textContent = `${durationMin}:${durationSec}`;
    }
    // Calculate display for currentTime
    const currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
      currentSec = `0${currentSec}`;
    }
    currentTimeEl.textContent = `${currentMin}:${currentSec}`;
  }
}

// set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
shuffleBtn.addEventListener('click', shuffleSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);
