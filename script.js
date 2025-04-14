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
  const dotsContainer = document.querySelector(".appflash-dots");

  let currentIndex = 0;

  // Function to update slider position
  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    document.querySelectorAll(".appflash-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  // Create navigation dots
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("appflash-dot");
    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      // Jump instantly without transition
      slider.style.transition = "none";
      currentIndex = index;
      updateSlider();

      // Force reflow and restore transition for next move
      void slider.offsetWidth;
      slider.style.transition = "transform 0.5s ease";
    });

    dotsContainer.appendChild(dot);
  });

  // Arrow click with animation
  leftArrow.addEventListener("click", () => {
    slider.style.transition = "transform 0.5s ease";
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  });

  rightArrow.addEventListener("click", () => {
    slider.style.transition = "transform 0.5s ease";
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  });

  // Initial update
  slider.style.transition = "transform 0.5s ease";
  updateSlider();
});


