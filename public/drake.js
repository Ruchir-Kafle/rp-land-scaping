const carouselTemplate = document.querySelector(`template.carousel-template`);
const reviewTemplate = document.querySelector(`template.review-template`);
const whyUsTemplate = document.querySelector(`template.why-us-template`)
const serviceTemplate = document.querySelector(`template.service-template`);
const notificationTemplate = document.querySelector(`template.notification-template`);

const maxNotifcations = 1;
let notificationCount = 0;
let totalNotifications = 0;

const star = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round"
stroke-linejoin="round" class="w-4 h-4 fill-current">
    <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
    </polygon>
</svg>
`;

const imagesPath = "./images/";

const whyUs = {
    "Affordable Pricing": ["money-svgrepo-com.svg", "We provide top-quality landscaping without the inflated costs. No oversized trucks, no corporate overhead—just great work at a fair price."],
    "Personalized Experience": ["people-svgrepo-com.svg", "With smaller crews and fewer houses per week, we give each property the attention it deserves. Every yard gets the care and detail that makes it stand out."],
    "Support Local Entrepreneurship": ["cycle-svgrepo-com.svg", "We’re a team of hardworking high school and college students from the community. 100% of profit goes to local entrepreneurship with 0% going to a corprate job."]
}

const carousels = {
    "Hedge Trimming": ["HedgingBefore.jpeg", "HedgingAfter.jpeg"],
    "Pressure Washing": ["PressureWashingBefore.jpeg", "PressureWashingAfter.jpeg"],
    "Mulching": ["MulchingBefore.jpeg", "MulchingAfter.jpeg"],
};

const reviews = [
    "Quote coming soon!",
    "Quote coming soon!",
    "Quote coming soon!"
]

const services = {
    "Routine Lawn Care": "Weekly or bi-weekly mowing, edging, trimming, and driveway blowing—everything you need to keep your lawn sharp and healthy.",
    "Spring/Fall Cleanup": "Get your lawn ready for the changing seasons with our spring and fall cleanup services. Leaf blowing, stick removal, debris removal, and more included.",
    "Mulching & Bed Edging": "Mulching services offered. We can provide the mulch, edge your beds, and clear out weeds and debris.",
    "Weeding": "Routine or one-time weeding of beds at an affordable price to keep your property neat and low-maintenance.",
    "Hedging": "Shaping and styling your bushes so they look crisp, healthy, and well-kept.",
    "Pressure Washing": "Driveways, Patios, Houses, Fences? No problem! We offer a wide range of pressure washing services.",
    "More!": "Got something else in mind? Just ask—we’re flexible and ready to help with most outdoor projects."
}


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

    Object.keys(carousels).forEach((carousel, carouselIndex) => {
        const cloneCarouselTemplate = carouselTemplate.content.cloneNode(true);
        const cloneCarousel = cloneCarouselTemplate.querySelector(`.carousel`);
        const cloneCarouselCaption = cloneCarouselTemplate.querySelector(`.carousel-caption`);
        const buttons = cloneCarouselTemplate.querySelectorAll(`button`);

        cloneCarousel.setAttribute("data-carousel", carouselIndex);
        carousels[carousel].forEach((image, imageIndex) => {
            const newImage = document.createElement(`img`);
            newImage.src = imagesPath + image;
            newImage.alt = carousel + (imageIndex == 0 ? " Before" : " After");
            newImage.className = "w-full h-full object-cover min-w-full";

            cloneCarousel.appendChild(newImage);
        })

        buttons.forEach((button, buttonIndex) => {
            const order = buttonIndex == 0 ? "data-carousel-prev" : "data-carousel-next";
            button.setAttribute(order, carouselIndex);
        });

        cloneCarouselCaption.innerHTML = carousel + " Before/After";

        carouselContainer.appendChild(cloneCarouselTemplate);
    });

}


function generateWhyUs() {
    const whyUsContainer = document.querySelector(`.why-us-container`);
    whyUsContainer.innerHTML = ``;

    Object.keys(whyUs).forEach((title) => {
        const cloneWhyUsTemplate = whyUsTemplate.content.cloneNode(true);
        const whyUsMain = cloneWhyUsTemplate.querySelector(`.why-us-main`);
        const cloneWhyUsTitle = cloneWhyUsTemplate.querySelector(`.why-us-title`);
        const cloneWhyUsDescription = cloneWhyUsTemplate.querySelector(`.why-us-description`);

        const newImage = document.createElement(`img`);
        newImage.src = imagesPath + whyUs[title][0];
        newImage.alt = title + "icon";
        newImage.className = "why-us-svgs text-primary";

        whyUsMain.prepend(newImage);

        cloneWhyUsTitle.innerHTML = title;
        cloneWhyUsDescription.innerHTML = whyUs[title][1];

        whyUsContainer.appendChild(cloneWhyUsTemplate);
    });

}


function generateServices() {
    const serviceContainer = document.querySelector(`.services-container`);
    serviceContainer.innerHTML = ``;

    Object.keys(services).forEach((service) => {
        const cloneServiceTemplate = serviceTemplate.content.cloneNode(true);
        const cloneHeadline = cloneServiceTemplate.querySelector(`.service-headline`);
        const cloneDescription = cloneServiceTemplate.querySelector(`.service-description`);

        cloneHeadline.innerHTML = service;
        cloneDescription.innerHTML = services[service];

        serviceContainer.appendChild(cloneServiceTemplate);
    });

}


function generateReviews() {
    const reviewsContainer = document.querySelector(`.reviews-container`);
    reviewsContainer.innerHTML = ``;

    reviews.forEach((review, reviewIndex) => {
        const cloneReviewTemplate = reviewTemplate.content.cloneNode(true);
        const cloneClient = cloneReviewTemplate.querySelector(`.client`);
        const cloneStarContainer = cloneReviewTemplate.querySelector(`.star-container`);
        const cloneQuote = cloneReviewTemplate.querySelector(`.quote`);

        cloneClient.innerHTML = "Client " + (reviewIndex + 1);

        for (let i = 0; i < 5; i++) {
            cloneStarContainer.innerHTML += star;
        }

        cloneQuote.innerHTML = review;

        reviewsContainer.appendChild(cloneReviewTemplate);
    });

}


async function handleFormSubmission() {
    const form = document.querySelector(`#contact-form`);
    const formData = new FormData(form);

    // fetch('/public/drake.js', {
    //     method: 'POST',
    //     body: formData
    // })
    // .then(res => res.json())
    // .then(data => console.log('Response:', data))
    // .catch(err => console.error(err));
}


function handleClose(e = null, actualNotification = null) { // change how the arguments are being pass through. prob object dereferencing
    let entireNotifcation;

    if (e) {
        const notificationIndex = e.target.getAttribute("data-part-of-notification");
        entireNotifcation = document.querySelector(`[data-notification-count="${notificationIndex}"]`);
    } else if (actualNotification) {
        entireNotifcation = actualNotification;
    } // throw error or something here

    entireNotifcation.addEventListener("transitionend", (e) => {
        e.target.remove();
    });
    entireNotifcation.style.transform += `translateX(40rem)`;
    notificationCount -= 1;

    // if (notificationCount > 0) {
    //     const allNotifications = document.querySelectorAll(`.notification`);

    //     allNotifications.forEach((eachNotification) => {
    //         if (eachNotification.getAttribute("data-notification-count") < notificationIndex) {
    //             eachNotification.style.transform += `translateY(9rem)`
    //         }
    //     });
    // }
}


function timeClose(operatingNotification, seconds) {
    const notification = document.querySelector(`[data-notification-count="${operatingNotification}"]`);
    const progressBar = notification.querySelector(`.current-progress-bar`);

    let width = 25;
    let timeBarInterval = setInterval(() => {
        progressBar.style.width = width + "rem";

        width -= 25 / seconds / 100;

        if (width <= 0) {
            width = 0;
            handleClose(null, notification);
            clearInterval(timeBarInterval);
        }

    }, 10);
}


function formSubmittedNotification() {

    // if (notificationCount > 0) {
    //     const allNotifications = document.querySelectorAll(`.notification`);

    //     allNotifications.forEach((eachNotification) => {
    //         eachNotification.style.transform += `translateY(-9rem)`
    //     });
    // }

    notificationCount++;
    totalNotifications++;

    const cloneNotificationTemplate = notificationTemplate.content.cloneNode(true);
    const cloneNotification = cloneNotificationTemplate.querySelector(`.notification`);
    cloneNotification.setAttribute("data-notification-count", totalNotifications);

    const cloneButton = cloneNotification.querySelector(`button`);
    cloneButton.setAttribute("data-part-of-notification", totalNotifications);
    cloneButton.addEventListener("click", (e) => handleClose(e, null));

    document.body.appendChild(cloneNotificationTemplate);

    const notification = document.querySelector(`[data-notification-count="${totalNotifications}"]`);

    void notification.offsetWidth;

    notification.style.transform = `translateX(-20rem)`;

    timeClose(totalNotifications, 7);
}


document.addEventListener("submit", (e) => {
    e.preventDefault();

    if (notificationCount < maxNotifcations) {
        handleFormSubmission();
        formSubmittedNotification();
    }
})

function main() {
    generateCarousels()
    generateServices();
    generateReviews();
    generateWhyUs();

    carouselImageSwitching();
}

main();