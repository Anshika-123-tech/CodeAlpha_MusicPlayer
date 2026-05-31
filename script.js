const songs = [
{
    title: "Escape Your Love",
    artist: "Unknown Artist",
    file: "songs/escapeyour love.mp3",
    cover: "images/escapeyour love.jpg"
},
{
    title: "Water",
    artist: "Kontraa",
    file: "songs/kontraa-water.mp3",
    cover: "images/water.jpg"
},
{
    title: "Powerfull",
    artist: "Unknown Artist",
    file: "songs/powerfull.mp3",
    cover: "images/powerfull.jpg"
}
];

let currentSong = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");

const volumeSlider = document.getElementById("volume");

const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const playlist = document.getElementById("playlist");

function loadSong(index) {

    const song = songs[index];

    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;

    audio.src = song.file;

    updatePlaylist();
}

loadSong(currentSong);

function playSong() {
    audio.play();
    playBtn.textContent = "⏸";
}

function pauseSong() {
    audio.pause();
    playBtn.textContent = "▶";
}

playBtn.addEventListener("click", () => {

    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }

});

nextBtn.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    playSong();

});

prevBtn.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    playSong();

});

audio.addEventListener("timeupdate", () => {

    const progressPercent =
        (audio.currentTime / audio.duration) * 100;

    progress.style.width =
        progressPercent + "%";

    currentTime.textContent =
        formatTime(audio.currentTime);

    duration.textContent =
        formatTime(audio.duration);

});

function formatTime(time) {

    if (isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

progressContainer.addEventListener("click", (e) => {

    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;

    audio.currentTime =
        (clickX / width) * audio.duration;

});

volumeSlider.addEventListener("input", () => {

    audio.volume = volumeSlider.value;

});

audio.addEventListener("ended", () => {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    playSong();

});

songs.forEach((song, index) => {

    const li = document.createElement("li");

    li.textContent =
        `${song.title} - ${song.artist}`;

    li.addEventListener("click", () => {

        currentSong = index;

        loadSong(index);
        playSong();

    });

    playlist.appendChild(li);

});

function updatePlaylist() {

    const items = playlist.querySelectorAll("li");

    items.forEach((item, index) => {

        item.classList.toggle(
            "active",
            index === currentSong
        );

    });

}