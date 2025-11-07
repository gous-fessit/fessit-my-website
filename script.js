// Preloader functionality
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Add fade out class
        preloader.style.opacity = '0';
        // Remove from DOM after animation
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500); // Match this with your CSS transition duration
    }
});

// Dark mode toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

if (themeToggleBtn) {
    // Change the icons inside the button based on previous settings
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        themeToggleLightIcon?.classList.remove('hidden');
        themeToggleDarkIcon?.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        themeToggleLightIcon?.classList.add('hidden');
        themeToggleDarkIcon?.classList.remove('hidden');
    }

    themeToggleBtn.addEventListener('click', function() {
        // Toggle icons
        themeToggleDarkIcon?.classList.toggle('hidden');
        themeToggleLightIcon?.classList.toggle('hidden');

        // If is set in localStorage
        if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            }
        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        }
    });
}

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Close mobile menu when clicking outside
window.addEventListener('click', (e) => {
    if (mobileMenu && mobileMenuButton && !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        mobileMenu.classList.add('hidden');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Toggle mobile menu
document.querySelector('.menu-toggle')?.addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});

// Close menu on link click (for mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.remove('active');
  });
});

// Close menu if clicked outside of it
document.addEventListener('click', (event) => {
  const menu = document.querySelector('.nav-links');
  const menuToggle = document.querySelector('.menu-toggle');
  
  // If the click is outside of the menu or the menu toggle button
  if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
      menu.classList.remove('active');
  }
});

// Slider functionality (unchanged)
document.addEventListener("DOMContentLoaded", () => {
const slider = document.querySelector(".appflash-slider");
const slides = document.querySelectorAll(".appflash-right-column");
const leftArrow = document.querySelector(".appflash-nav-arrow.left");
const rightArrow = document.querySelector(".appflash-nav-arrow.right");
const dotsContainer = document.querySelector(".appflash-dots");

let currentIndex = 0;

// Update slider position
function updateSlider(jumpInstant = false) {
  if (jumpInstant) {
    slider.style.transition = "none";
  } else {
    slider.style.transition = "transform 0.5s ease";
  }

  slider.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Update dots
  document.querySelectorAll(".appflash-dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });

  // Restore transition if jumpInstant was true
  if (jumpInstant) {
    void slider.offsetWidth; // Force reflow
    slider.style.transition = "transform 0.5s ease";
  }
}

// Create navigation dots
slides.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("appflash-dot");
  if (index === 0) dot.classList.add("active");

  dot.addEventListener("click", () => {
    const jumpInstant = Math.abs(index - currentIndex) > 1 || 
                       (index === 0 && currentIndex === slides.length - 1) || 
                       (index === slides.length - 1 && currentIndex === 0);
    currentIndex = index;
    updateSlider(jumpInstant);
  });

  dotsContainer.appendChild(dot);
});

// Left arrow click
leftArrow.addEventListener("click", () => {
  const isJump = currentIndex === 0;
  currentIndex = isJump ? slides.length - 1 : currentIndex - 1;
  updateSlider(isJump);
});

// Right arrow click
rightArrow.addEventListener("click", () => {
  const isJump = currentIndex === slides.length - 1;
  currentIndex = isJump ? 0 : currentIndex + 1;
  updateSlider(isJump);
});

// Initial state
updateSlider(false);
});
