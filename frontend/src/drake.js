const ENDPOINT = "/submitForm";

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
    {
        name: "Meri V",
        text: "Ryan was highly motivated to care and maintain my large property. He and his employees cut my grass once a week, also weed whacked, weeded and always blew all cuttings away. Ryan even planted some bulbs for me! He was always very polite, accommodating and professional. I would highly recommend his services."
    },
    {
        name: "MaryPat M",
        text: "Our property has needed many projects. RP Landscaping has been reliable, dedicated and hardworking. All the crew members get the job done. They go beyond my expectations."
    },
    {
        name: "Jeff P",
        text: "RP Landscaping did a great job with a fall cleanup on my property. They did a great job for a low price. I highly recommend RP Landscaping."
    }
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



function initSliders() {
    document.querySelectorAll('.comparison-container').forEach(container => {
        const sliderHandle = container.querySelector('.slider-handle');
        const beforeContainer = container.querySelector('.before-container');
        const beforeImage = container.querySelector('.before-image');

        // Match the before image width to the container width so it doesn't skew
        // We'll update this on resize as well
        const updateImageWidth = () => {
            beforeImage.style.width = `${container.offsetWidth}px`;
        };

        // Initial set
        updateImageWidth();
        window.addEventListener('resize', updateImageWidth);

        let isDragging = false;

        const moveSlider = (x) => {
            const containerRect = container.getBoundingClientRect();
            let pos = ((x - containerRect.left) / containerRect.width) * 100;

            // Clamp between 0 and 100
            pos = Math.max(0, Math.min(100, pos));

            beforeContainer.style.width = `${pos}%`;
            sliderHandle.style.left = `${pos}%`;
        };

        const onMouseDown = (e) => {
            isDragging = true;
            moveSlider(e.clientX);
        };

        const onMouseUp = () => {
            isDragging = false;
        };

        const onMouseMove = (e) => {
            if (!isDragging) return;
            moveSlider(e.clientX);
        };

        // Touch events
        const onTouchStart = (e) => {
            isDragging = true;
            moveSlider(e.touches[0].clientX);
        };

        const onTouchMove = (e) => {
            if (!isDragging) return;
            // prevent scrolling while dragging
            e.preventDefault();
            moveSlider(e.touches[0].clientX);
        };

        const onTouchEnd = () => {
            isDragging = false;
        };


        // Event Listeners
        container.addEventListener('mousedown', onMouseDown);
        container.addEventListener('mousemove', onMouseMove);
        // We attach mouseup to window so dragging doesn't stick if you leave the element
        window.addEventListener('mouseup', onMouseUp);

        container.addEventListener('touchstart', onTouchStart, { passive: false });
        container.addEventListener('touchmove', onTouchMove, { passive: false });
        container.addEventListener('touchend', onTouchEnd);
    });
}


function generateCarousels() {
    const carouselContainer = document.querySelector(`.carousel-container`);
    carouselContainer.innerHTML = ``;

    Object.keys(carousels).forEach((carouselTitle) => {
        const cloneCarouselTemplate = carouselTemplate.content.cloneNode(true);

        const afterImage = cloneCarouselTemplate.querySelector('.after-image');
        const beforeImage = cloneCarouselTemplate.querySelector('.before-image');
        const caption = cloneCarouselTemplate.querySelector('.carousel-caption');

        // Data format found in `carousels` object: [beforeImg, afterImg]
        // "Hedge Trimming": ["HedgingBefore.jpeg", "HedgingAfter.jpeg"]
        const [beforeImgSrc, afterImgSrc] = carousels[carouselTitle];

        afterImage.src = imagesPath + afterImgSrc;
        beforeImage.src = imagesPath + beforeImgSrc;

        caption.innerHTML = carouselTitle + " Before/After";

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

    reviews.forEach((reviewData) => {
        const cloneReviewTemplate = reviewTemplate.content.cloneNode(true);
        const cloneClient = cloneReviewTemplate.querySelector(`.client`);
        const cloneStarContainer = cloneReviewTemplate.querySelector(`.star-container`);
        const cloneQuote = cloneReviewTemplate.querySelector(`.quote`);
        const cloneImage = cloneReviewTemplate.querySelector('img');

        cloneClient.innerHTML = reviewData.name;

        const initials = reviewData.name.split(' ').map(n => n[0]).join('');
        cloneImage.src = `https://placehold.co/40x40.png?text=${initials}`;
        cloneImage.alt = reviewData.name;

        for (let i = 0; i < 5; i++) {
            cloneStarContainer.innerHTML += star;
        }

        cloneQuote.innerHTML = `"${reviewData.text}"`;

        reviewsContainer.appendChild(cloneReviewTemplate);
    });

}



async function handleFormSubmission(form) {
    const formData = new FormData(form);

    // Extract fields
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const userMessage = formData.get('message');
    const address = formData.get('address');
    const contactMethod = formData.get('contact_method');
    const services = formData.getAll('services').join(', ');

    // Combine into a single message block for the backend storage
    const combinedMessage = `
Services: ${services}
Preferred Contact: ${contactMethod}
Address: ${address || 'Not provided'}

Notes:
${userMessage}
    `.trim();

    const payload = {
        name,
        phone,
        email,
        message: combinedMessage
    };

    fetch(`${ENDPOINT}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(data => console.log('Response:', data))
        .catch(err => console.error(err));
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
    const form = document.querySelector('#contact-form');

    // Check services validation
    const services = form.querySelectorAll('input[name="services"]:checked');
    if (services.length === 0) {
        e.preventDefault();
        alert("Please select at least one service.");
        return;
    }

    e.preventDefault();

    if (notificationCount < maxNotifcations) {
        if (form) {
            handleFormSubmission(form);
        }
        formSubmittedNotification();
    }
})


function initContactFormType() {
    const contactRadios = document.querySelectorAll('input[name="contact_method"]');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const phoneLabel = document.getElementById('phone-req');
    const emailLabel = document.getElementById('email-req');

    const updateRequirements = (method) => {
        if (method === 'email') {
            emailInput.required = true;
            phoneInput.required = false;
            emailLabel.textContent = '*';
            emailLabel.classList.remove('text-muted-foreground', 'text-xs');
            emailLabel.classList.add('text-red-500');

            phoneLabel.textContent = '(Optional)';
            phoneLabel.classList.remove('text-red-500');
            phoneLabel.classList.add('text-muted-foreground', 'text-xs');
        } else {
            // call or text
            phoneInput.required = true;
            emailInput.required = false;
            phoneLabel.textContent = '*';
            phoneLabel.classList.remove('text-muted-foreground', 'text-xs');
            phoneLabel.classList.add('text-red-500');

            emailLabel.textContent = '(Optional)';
            emailLabel.classList.remove('text-red-500');
            emailLabel.classList.add('text-muted-foreground', 'text-xs');
        }
    };

    contactRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            updateRequirements(e.target.value);
        });

        // Check initial state
        if (radio.checked) {
            updateRequirements(radio.value);
        }
    });
}

function main() {
    generateCarousels()
    generateServices();
    generateReviews();
    generateWhyUs();


    initSliders();
    initContactFormType();
}

main();