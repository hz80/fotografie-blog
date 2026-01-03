document.addEventListener("DOMContentLoaded", () => {

  const images = document.querySelectorAll('.lightbox-img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox .close');

  if (!images.length || !lightbox || !lightboxImg) {
    console.warn("Lightbox: Elemente nicht gefunden");
    return;
  }

  let currentIndex = 0;

  images.forEach((img, index) => {
    img.addEventListener('click', (e) => {
      e.preventDefault();
      currentIndex = index;
      openLightbox(img.src);
    });
  });

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display !== 'flex') return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') navigate(1);
    if (e.key === 'ArrowLeft') navigate(-1);
  });

  function navigate(direction) {
    currentIndex = (currentIndex + direction + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
  }

});
