const images = Array.from(document.querySelectorAll('.image img'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

/* abrir */
images.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    openLightbox();
  });
});

function openLightbox() {
  lightboxImg.src = images[currentIndex].src;
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

/* fechar */
function closeLightbox() {
  lightbox.style.display = 'none';
  document.body.style.overflow = '';
}

lightbox.addEventListener('click', closeLightbox);

/* navegação */
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex].src;
}

function prevImage() {
  currentIndex =
    (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
}

/* teclado */
document.addEventListener('keydown', (e) => {
  if (lightbox.style.display !== 'flex') return;

  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
});

/* scroll desktop */
lightbox.addEventListener('wheel', (e) => {
  e.preventDefault();
  e.deltaY > 0 ? nextImage() : prevImage();
}, { passive: false });

/* swipe mobile */
lightbox.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;
  const threshold = 50; // sensibilidade

  if (swipeDistance > threshold) {
    prevImage();
  } else if (swipeDistance < -threshold) {
    nextImage();
  }
}
