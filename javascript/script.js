
const carousel = document.querySelector('.carousel');
const slides = [...document.querySelectorAll('.slide')];
const dots = [...document.querySelectorAll('.dot')];
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const counter = document.querySelector('.counter');

let currentIndex = 0;
let autoplay;
const interval = 6000;

const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
);

function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
        const isActive = i === currentIndex;

        slide.classList.toggle('active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));

        if (isActive) {
            slide.removeAttribute('inert');
        } else {
            slide.setAttribute('inert', '');
        }
    });

    dots.forEach((dot, i) => {
        const isActive = i === currentIndex;

        dot.classList.toggle('active', isActive);

        if (isActive) {
            dot.setAttribute('aria-current', 'true');
        } else {
            dot.removeAttribute('aria-current');
        }
    });

    counter.textContent =
        `${String(currentIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function previousSlide() {
    showSlide(currentIndex - 1);
}

function stopAutoplay() {
    clearInterval(autoplay);
}

function startAutoplay() {
    stopAutoplay();

    if (!reduceMotion.matches && !document.hidden) {
        autoplay = setInterval(nextSlide, interval);
    }
}

function restartAutoplay() {
    startAutoplay();
}

nextButton.addEventListener('click', () => {
    nextSlide();
    restartAutoplay();
});

prevButton.addEventListener('click', () => {
    previousSlide();
    restartAutoplay();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        restartAutoplay();
    });
});

carousel.addEventListener('mouseenter', stopAutoplay);
carousel.addEventListener('mouseleave', startAutoplay);

carousel.addEventListener('focusin', stopAutoplay);
carousel.addEventListener('focusout', (event) => {
    if (!carousel.contains(event.relatedTarget)) {
        startAutoplay();
    }
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopAutoplay();
    } else {
        startAutoplay();
    }
});

document.addEventListener('keydown', (event) => {
    if (!carousel.contains(document.activeElement)) return;

    if (event.key === 'ArrowRight') {
        nextSlide();
        restartAutoplay();
    }

    if (event.key === 'ArrowLeft') {
        previousSlide();
        restartAutoplay();
    }
});

reduceMotion.addEventListener('change', startAutoplay);

showSlide(0);
startAutoplay();
