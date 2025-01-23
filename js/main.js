(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-white shadow');
            } else {
                $('.fixed-top').removeClass('bg-white shadow');
            }
        } else {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-white shadow').css('top', -45);
            } else {
                $('.fixed-top').removeClass('bg-white shadow').css('top', 0);
            }
        }
    });
    
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

    
})(jQuery);

//mailS
document.getElementById('submitButton').addEventListener('click', function() {
    var email = document.getElementById('emailInput').value;
    var subject = "Product Enquiry";
    var body = "Please provide the product list for bananas, oranges, chips, onions, etc.";
    body += "%0A%0AHighlighted in red: Bananas, Oranges, Chips, Onions.";
    window.location.href = "mailto:official@royalpatilfarm.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
});


//cart
document.addEventListener('DOMContentLoaded', function() {
    const addToCartBtns = document.querySelectorAll('.addToCartBtn');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(event) {
            event.preventDefault();
            const productName = this.dataset.product;
            const productPrice = parseFloat(this.dataset.price);
            const product = { name: productName, price: productPrice };
            
            // Get existing cart items from local storage or initialize as an empty array
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            
            // Add the new product to the cart
            cartItems.push(product);
            
            // Store the updated cart items back to local storage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            // Optionally provide user feedback (e.g., toast message)
            console.log(`${productName} added to cart.`);
        });
    });
});

//cartpage JavaScript to handle displaying cart items, sending to WhatsApp, and removing items
document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cartItems');
    const whatsappBtn = document.getElementById('whatsappBtn');
    const totalAmountSpan = document.getElementById('totalAmount');
    
    // Retrieve cart items from local storage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Function to display cart items
    function displayCartItems() {
        cartItemsContainer.innerHTML = '';
        let totalAmount = 0;
        cartItems.forEach((item, index) => {
            totalAmount += item.price;
            cartItemsContainer.innerHTML += `
                <div class="row align-items-center mb-3">
                    <div class="col-md-6">
                        <h5>${item.name}</h5>
                        <p>Price: ₹${item.price.toFixed(2)}</p>
                    </div>
                    <div class="col-md-6">
                        <button class="btn btn-danger btn-remove" data-index="${index}">Remove</button>
                    </div>
                </div>
            `;
        });
        totalAmountSpan.textContent = `₹${totalAmount.toFixed(2)}`;
    }

    // Function to send cart details via WhatsApp
    function sendToWhatsApp() {
        const message = cartItems.map(item => `${item.name}: ₹${item.price}`).join('%0A');
        const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);
        const whatsappLink = `https://wa.me/9923203037?text=${encodeURIComponent(message + '%0A%0ATotal Amount: ₹' + totalAmount.toFixed(2))}`;
        window.open(whatsappLink, '_blank');
    }

    // Event listener for WhatsApp button click
    whatsappBtn.addEventListener('click', function(event) {
        event.preventDefault();
        sendToWhatsApp();
    });

    // Function to remove item from cart
    function removeItem(index) {
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        displayCartItems();
    }

    // Event delegation for remove buttons
    cartItemsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-remove')) {
            const index = parseInt(event.target.dataset.index);
            removeItem(index);
        }
    });

    // Call displayCartItems function to initially display cart items
    displayCartItems();
});



 // JavaScript for slideshow

//  var slideIndex = 0;
//  showSlides();

//  function showSlides() {
//    var i;
//    var slides = document.getElementsByClassName("img-fluid");
//    for (i = 0; i < slides.length; i++) {
//      slides[i].style.display = "none";  
//    }
//    slideIndex++;
//    if (slideIndex > slides.length) {slideIndex = 1}    
//    slides[slideIndex-1].style.display = "block";  
//    setTimeout(showSlides, 2000); // Change image every 2 seconds
//  }
function showPopup() {
    document.getElementById("popup").style.display = "block";
    setTimeout(hidePopup, 2000); // Hide the popup after 2 seconds
}

function hidePopup() {
    document.getElementById("popup").style.display = "none";
}

// Add event listeners to all Add to Cart buttons
var addToCartButtons = document.querySelectorAll('.addToCartBtn');
addToCartButtons.forEach(function(btn) {
    btn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default action (in this case, navigating to another page)
        showPopup(); // Show the popup message
    });
});


// *********about swiper
// let currentSlide = 0;

// function showSlide(index) {
//     const slides = document.querySelectorAll('.slide');
//     const totalSlides = slides.length;

//     if (index >= totalSlides) {
//         currentSlide = 0; // Loop back to the first slide
//     } else if (index < 0) {
//         currentSlide = totalSlides - 1; // Loop back to the last slide
//     } else {
//         currentSlide = index;
//     }

//     const sliderWrapper = document.querySelector('.slider-wrapper');
//     sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`; // Move slides left
// }

// // Automatic slide change every few seconds
// setInterval(() => {
//     changeSlide(1);
// }, 5000); // Change slide every 5 seconds

// function changeSlide(n) {
//     showSlide(currentSlide + n);
// }

// // Initialize the first slide
// showSlide(currentSlide);

let currentSlide = 1; // Start from the first actual slide (index 1)

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    const sliderWrapper = document.querySelector('.slider-wrapper');

    // Loop around the slides
    if (index >= totalSlides - 1) { // If we've reached the last clone (after the last actual slide)
        currentSlide = 1; // Set to the first actual slide
        sliderWrapper.style.transition = 'transform 0.5s ease'; // Enable transition for smooth effect
        sliderWrapper.style.transform = `translateX(-${index * 100}%)`; // Show the last clone
        setTimeout(() => {
            sliderWrapper.style.transition = 'none'; // Disable transition to avoid jump
            sliderWrapper.style.transform = 'translateX(-100%)'; // Instantly move to the first actual slide
        }, 500); // Wait for the slide transition to finish
    } else if (index <= 0) { // If we've reached the first clone (before the first actual slide)
        currentSlide = totalSlides - 2; // Set to the last actual slide
        sliderWrapper.style.transition = 'transform 0.5s ease'; // Enable transition for smooth effect
        sliderWrapper.style.transform = `translateX(0)`; // Show the first clone
        setTimeout(() => {
            sliderWrapper.style.transition = 'none'; // Disable transition to avoid jump
            sliderWrapper.style.transform = `translateX(-${(totalSlides - 2) * 100}%)`; // Instantly move to the last actual slide
        }, 500); // Wait for the slide transition to finish
    } else {
        currentSlide = index;
        sliderWrapper.style.transition = 'transform 0.5s ease'; // Re-enable transition
        sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`; // Move to the next slide
    }
}

// Automatic slide change every few seconds
setInterval(() => {
    changeSlide(1);
}, 5000); // Change slide every 5 seconds

function changeSlide(n) {
    showSlide(currentSlide + n);
}

// Initialize the first slide
showSlide(currentSlide);
