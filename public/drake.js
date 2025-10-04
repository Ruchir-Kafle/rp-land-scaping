const carouselTemplate = document.querySelector(`.carousel-template`);


const carousels = {
    "Hedge Trimming": ["HedgingBefore.jpeg", "HedgingAfter.jpeg"],
    "Pressure Washing": ["PressureWashingBefore.jpeg", "PressureWashingAfter.jpeg"],
    "Mulching": ["MulchingBefore.jpeg", "MulchingAfter.jpeg"],
};

const imagesPath = "../images/";



function carouselImageSwitching() {
    document.querySelectorAll('[data-carousel]').forEach(carousel => {
        const index = carousel.getAttribute('data-carousel');
        let currentSlide = 0;
        const slides = carousel.children.length;
    
        const prevButton = document.querySelector(`[data-carousel-prev="${index}"]`);
        const nextButton = document.querySelector(`[data-carousel-next="${index}"]`);
    
        function updateCarousel() {
          carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
    
        prevButton.addEventListener('click', () => {
          currentSlide = (currentSlide - 1 + slides) % slides;
          updateCarousel();
        });
    
        nextButton.addEventListener('click', () => {
          currentSlide = (currentSlide + 1) % slides;
          updateCarousel();
        });
    });
}


function generateCarousels() {
    const carouselContainer = document.querySelector(`.carousel-container`);
    carouselContainer.innerHTML = ``;

    Object.keys(carousels).forEach((value, index) => {
        const cloneTemplate = carouselTemplate.content.cloneNode(true);
        const cloneCarousel = cloneTemplate.querySelector(`.carousel`);
        const cloneCarouselCaption = cloneTemplate.querySelector(`.carousel-caption`);
        const buttons = cloneTemplate.querySelectorAll(`button`);

        cloneCarousel.setAttribute("data-carousel", index);
        carousels[value].forEach((image, i) => {
            const newImage = document.createElement(`img`);
            newImage.src = imagesPath + image;
            newImage.alt = value + (i == 0 ? " Before" : " After");
            newImage.className = "w-full h-full object-cover min-w-full";

            cloneCarousel.appendChild(newImage);
        })

        buttons.forEach((button, buttonIndex) => {
            const order = buttonIndex == 0 ? "data-carousel-prev": "data-carousel-next";
            button.setAttribute(order, index);
        });

        cloneCarouselCaption.innerHTML = value + " Before/After";

        carouselContainer.appendChild(cloneTemplate);
    });
    
}


function main() {
    generateCarousels()
    carouselImageSwitching();

}

main();