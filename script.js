// Toggle mobile menu
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Close menu on link click (for mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});


document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".appflash-slider");
  const slides = document.querySelectorAll(".appflash-right-column");
  const leftArrow = document.querySelector(".appflash-nav-arrow.left");
  const rightArrow = document.querySelector(".appflash-nav-arrow.right");

  let currentIndex = 0;

  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  });

  rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  });

  updateSlider();
});