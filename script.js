const images = Array.from({ length: 100 }, (_, i) => ({
  src: `images/poem (${i + 1}).jpg`,
  title: `Poem ${i + 1}`
}));

let currentIndex = 0;
const poemImage = document.getElementById('poem-image');
const title = document.getElementById('title');
const pageNumber = document.getElementById('page-number');

function showPage(index) {
  poemImage.style.opacity = 0;
  setTimeout(() => {
    poemImage.src = images[index].src;
    title.textContent = images[index].title;
    pageNumber.textContent = `Page ${index + 1} of ${images.length}`;
    poemImage.style.opacity = 1;
  }, 300);
}

function nextPage() {
  currentIndex = (currentIndex + 1) % images.length;
  showPage(currentIndex);
}

function prevPage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showPage(currentIndex);
}

showPage(currentIndex);

// ✅ Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextPage();
  if (e.key === 'ArrowLeft') prevPage();
});

// ✅ Swipe gesture for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
});

function handleGesture() {
  const swipeThreshold = 50; // Minimum distance for swipe
  if (touchEndX < touchStartX - swipeThreshold) nextPage();
  if (touchEndX > touchStartX + swipeThreshold) prevPage();
}

document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

const fullscreenBtn = document.getElementById('fullscreen-toggle');

fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    fullscreenBtn.textContent = '❌ Exit Fullscreen';
  } else {
    document.exitFullscreen();
    fullscreenBtn.textContent = '🔲 Fullscreen';
  }
});
