console.log("Welcome to Melody Mix");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/[i].mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Ignite", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Lean On", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Hey Mama", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Shape Of You", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Girls Like You", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Sunn Beliya", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Yeh Raaten Yeh Mausam", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Aajkal Tere Mere Pyar", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Chhaila", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Khoobsurat", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
    {songName: "A Mawa Ninna Magala", filePath: "songs/11.mp3", coverPath: "covers/11.jpg"},
    {songName: "Ava Kottana Anta", filePath: "songs/12.mp3", coverPath: "covers/11.jpg"},
    {songName: "Bangara Hattedena Ninagena", filePath: "songs/13.mp3", coverPath: "covers/11.jpg"},
    {songName: "Bittu Hontyalla", filePath: "songs/14.mp3", coverPath: "covers/11.jpg"},
    {songName: "Chendulla Chaluvi", filePath: "songs/15.mp3", coverPath: "covers/11.jpg"},
    {songName: "Kallava Kela Mallava", filePath: "songs/16.mp3", coverPath: "covers/11.jpg"},
    {songName: "Kunitallo", filePath: "songs/17.mp3", coverPath: "covers/11.jpg"},
    {songName: "Naa Drivera", filePath: "songs/18.mp3", coverPath: "covers/11.jpg"},
    {songName: "Nanna Gelati", filePath: "songs/19.mp3", coverPath: "covers/11.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
// Get references to elements
const playlistButton = document.getElementById('playlistButton');
const favoritesButton = document.getElementById('favoritesButton');
const playlists = document.getElementById('playlists');
const favorites = document.getElementById('favorites');

// Toggle visibility function
function toggleVisibility(target, other) {
    if (target.style.display === 'none' || target.style.display === '') {
        target.style.display = 'block'; // Show the target section
        other.style.display = 'none';  // Hide the other section
    } else {
        target.style.display = 'none'; // Hide the target section
    }
}

const playlistDropdown = document.getElementById('playlistDropdown');
const favoritesDropdown = document.getElementById('favoritesDropdown');

// Toggle Dropdown
function toggleDropdownVisibility(target) {
    if (target.style.display === 'none' || target.style.display === '') {
        target.style.display = 'block';
    } else {
        target.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const playlistButton = document.getElementById('playlistButton');
    const favoritesButton = document.getElementById('favoritesButton');
    const playlistDropdown = document.getElementById('playlistDropdown');
    const favoritesDropdown = document.getElementById('favoritesDropdown');
    const masterSongName = document.getElementById('masterSongName');
    const progressBar = document.getElementById('myProgressBar');
    const playButton = document.getElementById('masterPlay');
    const gif = document.getElementById('gif');
    let audioElement = new Audio();
    let isPlaying = false;
    masterSongName.innerText = '';

    // Toggle visibility of Playlists and Favorites dropdowns
    playlistButton.addEventListener('click', () => {
        playlistDropdown.style.display = playlistDropdown.style.display === 'none' ? 'block' : 'none';
        favoritesDropdown.style.display = 'none'; // Close Favorites dropdown if open
    });

    favoritesButton.addEventListener('click', () => {
        favoritesDropdown.style.display = favoritesDropdown.style.display === 'none' ? 'block' : 'none';
        playlistDropdown.style.display = 'none'; // Close Playlists dropdown if open
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (event) => {
        if (!playlistButton.contains(event.target) && !playlistDropdown.contains(event.target)) {
            playlistDropdown.style.display = 'none';
        }
        if (!favoritesButton.contains(event.target) && !favoritesDropdown.contains(event.target)) {
            favoritesDropdown.style.display = 'none';
        }
    });

    // Toggle dropdown visibility for categories
    window.toggleDropdown = function (element) {
        const ul = element.nextElementSibling;
        ul.style.display = ul.style.display === 'block' ? 'none' : 'block';
    };

    // Play song logic
    window.playSong = function (songPath) {
        if (audioElement.src !== songPath) {
            audioElement.src = songPath;
            audioElement.currentTime = 0;
        }
        if (isPlaying) {
            audioElement.pause();
            playButton.classList.replace('fa-pause-circle', 'fa-play-circle');
            gif.style.opacity = '0';
            isPlaying = false;
            masterSongName.innerText = ''; // Clear song name when paused
        } else {
            audioElement.play();
            playButton.classList.replace('fa-play-circle', 'fa-pause-circle');
            masterSongName.innerText = songPath.split('/').pop().replace('.mp3', '').replace(/_/g, ' ');
            gif.style.opacity = '1';
            isPlaying = true;
        }
    };

    // Play/Pause button at the bottom
    playButton.addEventListener('click', () => {
        if (isPlaying) {
            audioElement.pause();
            playButton.classList.replace('fa-pause-circle', 'fa-play-circle');
            gif.style.opacity = '0';
            isPlaying = false;
            masterSongName.innerText = ''; // Clear song name when paused
        } else {
            audioElement.play();
            playButton.classList.replace('fa-play-circle', 'fa-pause-circle');
            gif.style.opacity = '1';
            isPlaying = true;
        }

    });

    // Update progress bar
    audioElement.addEventListener('timeupdate', () => {
        const progress = (audioElement.currentTime / audioElement.duration) * 100;
        progressBar.value = progress || 0;
    });

    // Seek functionality
    progressBar.addEventListener('input', () => {
        audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
    });

    // Handle when audio ends
    audioElement.addEventListener('ended', () => {
        playButton.classList.replace('fa-pause-circle', 'fa-play-circle');
        gif.style.opacity = '0';
        isPlaying = false;
        masterSongName.innerText = ''; // Clear song name when audio ends
    });
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.addEventListener('click', () => {
        if (audioElement.src !== songs[i].filePath) {
            audioElement.src = songs[i].filePath;
            audioElement.currentTime = 0;
            audioElement.play();
            masterSongName.innerText = songs[i].songName;
            masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
            gif.style.opacity = 1;
            isPlaying = true;
        } else {
            if (audioElement.paused) {
                audioElement.play();
                masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
                gif.style.opacity = 1;
                isPlaying = true;
            } else {
                audioElement.pause();
                masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
                gif.style.opacity = 0;
                isPlaying = false;
            }
        }
    });
});

// Play/Pause button at the bottom
let isPlaying = false;
masterPlay.addEventListener('click', () => {
    if (isPlaying) {
        audioElement.pause();
        masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
        gif.style.opacity = 0;
        isPlaying = true;
        masterSongName.innerText = '';
    } else {
        audioElement.play();
        masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
        gif.style.opacity = 1;
        isPlaying = false;
    }
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress || 0;
});

// Seek functionality
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Handle when audio ends
audioElement.addEventListener('ended', () => {
    masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
    gif.style.opacity = 0;
    isPlaying = false;
    masterSongName.innerText = ''; // Clear song name when audio ends
});
