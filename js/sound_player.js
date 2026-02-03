const tracks = [
    {
        title: "Six",
        artist: "All That Remains",
        src: "sounds/All That Remains - Six.mp3",
        cover: "img/All That Remains - Six.jpg"
    },
    {
        title: "vesna",
        artist: "iskrit, ioneweb",
        src: "sounds/iskrit, ioneweb - vesna.mp3",
        cover: "img/iskrit, ioneweb - vesna.jpg"
    },
    {
        title: "Gone",
        artist: "Miss May I",
        src: "sounds/Miss May I - Gone.mp3",
        cover: "img/Miss May I - Gone.jpg"
    },
    {
        title: "Masses Of A Dying Breed",
        artist: "Miss May I",
        src: "sounds/Miss May I - Masses Of A Dying Breed.mp3",
        cover: "img/Miss May I - Masses Of A Dying Breed.jpg"
    },
    {
        title: "Перепутала",
        artist: "SEREBRO",
        src: "sounds/SEREBRO - Перепутала.mp3",
        cover: "img/SEREBRO - Перепутала.jpg"
    },
    {
        title: "СЛАДКО",
        artist: "SEREBRO",
        src: "sounds/SEREBRO - СЛАДКО.mp3",
        cover: "img/SEREBRO - СЛАДКО.jpg"
    },
    {
        title: "Nomadic",
        artist: "Slipknot",
        src: "sounds/Slipknot - Nomadic.mp3",
        cover: "img/Slipknot - Nomadic.jpg"
    },
    {
        title: "Weapon of vanity",
        artist: "Soilwork",
        src: "sounds/Soilwork - Weapon of vanity.mp3",
        cover: "img/Soilwork - Weapon of vanity.jpg"
    },
    {
        title: "Магмель",
        artist: "Stigmata",
        src: "sounds/Stigmata - Магмель.mp3",
        cover: "img/Stigmata - Магмель.jpg"
    },
    {
        title: "Dying in Your Arms",
        artist: "Trivium",
        src: "sounds/Trivium - Dying in Your Arms.mp3",
        cover: "img/Trivium - Dying in Your Arms.jpg"
    },
    {
        title: "Вместо последней строчки",
        artist: "билборды",
        src: "sounds/билборды - Вместо последней строчки.mp3",
        cover: "img/билборды - Вместо последней строчки.jpg"
    },
    {
        title: "Снег",
        artist: "билборды",
        src: "sounds/билборды - Снег.mp3",
        cover: "img/билборды - Снег.jpg"
    },
    {
        title: "Призраки",
        artist: "Мегамозг, Stigmata",
        src: "sounds/Мегамозг, Stigmata - Призраки.mp3",
        cover: "img/Мегамозг, Stigmata - Призраки.jpg"
    }
];

const audioPlayer = new Audio();
let currentTrackIndex = 0;
let isPlaying = false;
let isRepeat = false;
let updateInterval;

const albumCover = document.getElementById('albumCover');
const trackTitle = document.getElementById('trackTitle');
const trackArtist = document.getElementById('trackArtist');
const progressFill = document.getElementById('progressFill');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const repeatBtn = document.getElementById('repeatBtn');
const repeatIcon = document.getElementById('repeatIcon');
const volumeSlider = document.getElementById('volumeSlider');

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function loadTrack(index) {
    if (index < 0) index = tracks.length - 1;
    if (index >= tracks.length) index = 0;
    
    currentTrackIndex = index;
    const track = tracks[index];
    
    audioPlayer.src = track.src;
    albumCover.src = track.cover;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    
    progressFill.style.width = '0%';
    currentTimeEl.textContent = '0:00';
    
    audioPlayer.addEventListener('loadedmetadata', () => {
        totalTimeEl.textContent = formatTime(audioPlayer.duration);
    }, { once: true });
    
    if (isPlaying) {
        audioPlayer.play();
    }
}

function togglePlayPause() {
    if (isPlaying) {
        audioPlayer.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        clearInterval(updateInterval);
    } else {
        audioPlayer.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        
        updateInterval = setInterval(updateProgress, 100);
    }
    isPlaying = !isPlaying;
}

function updateProgress() {
    if (audioPlayer.duration) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressFill.style.width = `${progress}%`;
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    }
}

document.querySelector('.progress-container').addEventListener('click', (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.offsetX;
    const progressBarWidth = progressBar.clientWidth;
    const percentage = clickPosition / progressBarWidth;
    
    if (audioPlayer.duration) {
        audioPlayer.currentTime = percentage * audioPlayer.duration;
        updateProgress();
    }
});

function toggleRepeat() {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active', isRepeat);
    repeatIcon.style.color = isRepeat ? '#00ff00' : '';
}

function nextTrack() {
    loadTrack(currentTrackIndex + 1);
    if (isPlaying) {
        audioPlayer.play();
    }
}

function prevTrack() {
    if (audioPlayer.currentTime > 3) {
        audioPlayer.currentTime = 0;
        updateProgress();
    } else {
        loadTrack(currentTrackIndex - 1);
        if (isPlaying) {
            audioPlayer.play();
        }
    }
}

function setVolume() {
    audioPlayer.volume = volumeSlider.value / 100;
}

playPauseBtn.addEventListener('click', togglePlayPause);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);
repeatBtn.addEventListener('click', toggleRepeat);
volumeSlider.addEventListener('input', setVolume);

audioPlayer.addEventListener('ended', () => {
    if (isRepeat) {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    } else {
        nextTrack();
    }
});

currentTrackIndex = Math.floor(Math.random() * tracks.length);
loadTrack(currentTrackIndex);
setVolume();