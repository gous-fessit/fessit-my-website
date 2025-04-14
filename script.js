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

  // Create a dot for each slide
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("appflash-dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateSlider();
    });
    dotsContainer.appendChild(dot);
  });

  function updateSlider(instant = false) {
    if (instant) {
      // Disable transition temporarily
      slider.style.transition = "none";
    } else {
      // Use smooth transition
      slider.style.transition = "transform 0.5s ease";
    }

    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update dot active state
    document.querySelectorAll(".appflash-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });

    if (instant) {
      // Force reflow and re-enable transition
      void slider.offsetWidth; // This triggers reflow
      slider.style.transition = "transform 0.5s ease";
    }
  }

  leftArrow.addEventListener("click", () => {
    const previousIndex = currentIndex;
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider(previousIndex === 0); // jump if looping from 0 to last
  });

  rightArrow.addEventListener("click", () => {
    const previousIndex = currentIndex;
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider(previousIndex === slides.length - 1); // jump if looping from last to 0
  });

  updateSlider(); // Initial call
});
