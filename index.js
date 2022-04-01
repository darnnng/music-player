let audio = document.getElementById("audio");   
let time = document.querySelector(".timeline");
let curTime = document.querySelector(".current-time");
let durTime = document.querySelector(".duration-time");
let btnPlay = document.querySelector(".playBtn");  
let btnPrev = document.querySelector(".backwardBtn");   
let btnNext = document.querySelector(".forwardBtn"); 
let background = document.querySelector(".background"); 
let album = document.querySelector(".playerpicture");
let artist = document.querySelector(".artist");
let song = document.querySelector(".song");
const audioPlayer = document.querySelector(".audio-player");
let picture = document.querySelector(".playerpicture");
let slider = document.getElementById("myrange");


let playlist = [
    'beyonce.mp3',
    'dontstartnow.mp3',
    'motive.mp3',
    'neig.mp3'
];

let photos = [
    'lemonade.png',
    'dontstartnow.png',
    'ariana.png',
    'neig.jpg'
]

let photosAlbum = [
    'lemonade.png',
    'dontstartnow.png',
    'ariana.png',
    'neig.jpg'
]

let nameOfArtist = [
    'Beyonce',
    'Dua Lipa',
    'Ariana Grande',
    'The Neighbourhood'
]

let nameOfSong = [
    "Don't Hurt Yourself",
    "Don't Start Now",
    "Motive",
    "The Beach"
]

let treck;
let back;
let alb;
let songname;
let artistname;
let isPlay = false;


window.onload = function() {
    treck = 0; 
    back = 0;
    alb = 0;
    songname = 0;
    artistname = 0;
}

function switchTreck (numTreck, numPhoto, numAlbum, numArtist, numSong) {
    audio.src = 'assets/music/' + playlist[numTreck];
    background.src = 'assets/' + photos[numPhoto];
    album.src = 'assets/' + photosAlbum[numAlbum];
    artist.textContent = nameOfArtist[numArtist];
    song.textContent = nameOfSong[numSong];
    audio.currentTime = 0;
    audio.play();
    btnPlay.classList.add("pause");

}

function getDuration(songDur) {
    let seconds = parseInt(songDur);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
}


audio.addEventListener('loadeddata', () => {
    let audioDuration = audio.duration;
        durTime.textContent = getDuration(audioDuration);
        time.max = audio.duration;

        time.onchange = () => {
            audio.currentTime = time.value;
            curTime.textContent = getDuration(audio.currentTime);
        }

        audio.ontimeupdate = () => {
            time.value = audio.currentTime;
            curTime.textContent = getDuration(audio.currentTime); }
 })


btnPlay.addEventListener("click", function() {  

        if (audio.paused) {

            picture.classList.add("active");
            btnPlay.classList.add("pause");
          audio.play();
        } else {
            picture.classList.remove("active");
            btnPlay.classList.remove("pause");
          audio.pause();
        }

    audioPlay = setInterval(function() {
        let audioTime = Math.round(audio.currentTime);
        let audioLength = Math.round(audio.duration);
        time.style.width = (audioTime * 100) / audioLength + '%';
        time.value = `${time.style.width}`;

        if (audioTime == audioLength && treck < 3) {
            treck++; 
            back++;
            alb++;
            songname++;
            artistname++;
            switchTreck(treck,back,alb,artistname,songname); 

        } else if (audioTime == audioLength && treck >= 3) {
            treck = 0;
            back = 0;
            alb = 0;
            songname = 0;
            artistname = 0;
            switchTreck(treck,back,alb,artistname,songname); 
        }
    }, 10)
});

btnPrev.addEventListener("click", function() {

    if (treck > 0) {
        treck--;
        back--;
        alb--;
        artistname--;
        songname--;
        switchTreck(treck,back,alb,artistname,songname); 
    } else { 
        treck = 3;
        alb = 3;
        back =3;
        artistname =3;
        songname = 3;
        switchTreck(treck, back, alb, artistname,songname); 
    }
});

btnNext.addEventListener("click", function() {

    if (treck < 3) { 
        treck++;
        back++;
        alb++;
        songname++;
        artistname++;
        switchTreck(treck, back, alb,artistname,songname); 
    } else { 
        treck = 0;
        back = 0;
        alb = 0;
        songname = 0;
        artistname = 0; 
        switchTreck(treck, back, alb, artistname, songname); 
    }
});
