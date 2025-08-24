const images = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

function showImage(index) {
  if (images[index]) {
    lightboxImg.src = images[index].getAttribute('src');
    lightbox.classList.remove('hidden');
    currentIndex = index;
  }
}

images.forEach((img, i) => {
  img.style.setProperty('--i', i);
  img.addEventListener('click', () => showImage(i));
});

closeBtn.addEventListener('click', () => {
  lightbox.classList.add('hidden');
  lightboxImg.src = '';
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    lightbox.classList.add('hidden');
    lightboxImg.src = '';
  }
});