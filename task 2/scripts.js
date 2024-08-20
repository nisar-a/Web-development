function addToCart(productName, price) {
    alert(`Added "${productName}" to your cart for $${price}.`);
}

function buyNow(productName, price) {
    alert(`Proceeding to purchase ${productName} for $${price}.`);
}

let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;

    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach((slide, i) => {
        slide.style.opacity = i === currentSlide ? '1' : '0';
    });
}

function moveSlide(step) {
    showSlide(currentSlide + step);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
    setInterval(() => moveSlide(1), 5000);
});
