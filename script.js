// Variables para la animación de intro
const intro = document.getElementById('intro');
const mainContent = document.getElementById('mainContent');

// Variables para el reproductor de música
const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progress = document.getElementById('progress');
const progressContainer = document.querySelector('.progress-bar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

// Variables para la galería y lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const caption = document.getElementById('caption');
const galleryImages = document.querySelectorAll('.gallery-item img');
let currentImageIndex = 0;

// Playlist de canciones (puedes agregar las URLs de tus canciones)
const songs = [
    {
        title: "Algo Contigo",
        artist: "La canción de nuestra relación",
        cover: "images/beso.jpeg",
        src: "images/dia5/Algo contigo.mp3",
        duration: "4:57"
    },
    {
        title: "Hold On, Going Home",
        artist: "Primera canción que te dedique",
        cover: "images/dia5/recuerdo58.jpeg",
        src: "images/dia5/Drake.mp3",
        duration: "3:51"
    }
];

let songIndex = 0;

// Función para mostrar la animación de intro y luego el contenido principal
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar la animación de intro
    intro.style.display = 'flex';
    
    // Después de 5 segundos, ocultar la intro y mostrar el contenido principal
    setTimeout(() => {
        intro.style.animation = 'fadeOut 1s ease-in-out forwards';
        
        setTimeout(() => {
            intro.style.display = 'none';
            mainContent.classList.remove('hidden');
        }, 1000);
    }, 5000);
    
    // Cargar la primera canción
    loadSong(songs[songIndex]);
});

// Funciones para el reproductor de música
function loadSong(song) {
    const songTitle = document.querySelector('.song-title');
    const songArtist = document.querySelector('.song-artist');
    const songCover = document.querySelector('.song-cover img');
    
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    songCover.src = song.cover;
    audioPlayer.src = song.src;
    durationEl.textContent = song.duration;
}

// Reproducir o pausar la canción
playBtn.addEventListener('click', () => {
    const isPlaying = playBtn.classList.contains('playing');
    
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

function playSong() {
    playBtn.classList.add('playing');
    playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
    audioPlayer.play();
}

function pauseSong() {
    playBtn.classList.remove('playing');
    playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
    audioPlayer.pause();
}

// Cambiar a la canción anterior
prevBtn.addEventListener('click', () => {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    if (playBtn.classList.contains('playing')) {
        playSong();
    }
});

// Cambiar a la siguiente canción
nextBtn.addEventListener('click', () => {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    if (playBtn.classList.contains('playing')) {
        playSong();
    }
});

// Actualizar la barra de progreso
audioPlayer.addEventListener('timeupdate', updateProgress);

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    if (duration) {
        // Actualizar la barra de progreso
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // Actualizar el tiempo actual
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        currentTimeEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
}

// Cambiar la posición de reproducción al hacer clic en la barra de progreso
progressContainer.addEventListener('click', setProgress);

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    if (audioPlayer.duration) {
        audioPlayer.currentTime = (clickX / width) * audioPlayer.duration;
    }
}

// Funciones para la galería y lightbox
function openLightbox(index) {
    lightbox.style.display = 'block';
    showImage(index);
}

function closeLightbox() {
    lightbox.style.display = 'none';
}

function showImage(index) {
    currentImageIndex = index;
    lightboxImg.src = galleryImages[index].src;
    caption.textContent = galleryImages[index].alt;
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    // Asegurarse de que el índice esté dentro de los límites
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    
    showImage(currentImageIndex);
}

// Cerrar el lightbox al hacer clic fuera de la imagen
lightbox.addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Cerrar el lightbox con la tecla Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.style.display === 'block') {
        closeLightbox();
    }
});