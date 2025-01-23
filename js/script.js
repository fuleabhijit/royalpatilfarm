// Get all the elements needed
const searchForm = document.querySelector('.search-form');
const shoppingCart = document.querySelector('.shopping-cart');
const loginForm = document.querySelector('.login-form');
const navbar = document.querySelector('.navbar');

document.querySelector('#cart-btn').onclick = () => {
  shoppingCart.classList.toggle('active');
  searchForm.classList.remove('active');
  loginForm.classList.remove('active');
  navbar.classList.remove('active');
};

document.querySelector('#menu-btn').onclick = () => {
  navbar.classList.toggle('active');
  searchForm.classList.remove('active');
  shoppingCart.classList.remove('active');
  loginForm.classList.remove('active');
};

window.onscroll = () => {
  searchForm.classList.remove('active');
  shoppingCart.classList.remove('active');
  loginForm.classList.remove('active');
  navbar.classList.remove('active');
};

// Initialize Swiper for product slider
var productSwiper = new Swiper(".product-slider", {
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  centeredSlides: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1020: {
      slidesPerView: 3,
    },
  },
});

// Initialize Swiper for review slider
var reviewSwiper = new Swiper(".review-slider", {
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  centeredSlides: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1020: {
      slidesPerView: 3,
    },
  },
});

// Get all the "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.products .btn');

// Loop through each button
addToCartButtons.forEach(button => {
  // Add a click event listener to each button
  button.addEventListener('click', addToCart);
});

// Function to handle adding to cart
function addToCart(event) {
  // Prevent the default action of the button (e.g., submitting a form)
  event.preventDefault();

  // Get the parent element of the button (the product container)
  const product = event.target.closest('.box');

  // Get the product name, price, and image from the product container
  const productName = product.querySelector('h3').innerText;
  const productPrice = parseFloat(product.querySelector('.price').innerText.replace(/[^\d.]/g, ''));
  const productImage = product.querySelector('img').src;

  // Create a new cart item element
  const cartItem = document.createElement('div');
  cartItem.classList.add('box');
  cartItem.innerHTML = `
    <i class="fas fa-minus-circle decrease-quantity"></i>
    <span class="quantity">1</span>
    <i class="fas fa-plus-circle increase-quantity"></i>
    <i class="fas fa-trash delete-product"></i>
    <img src="${productImage}" alt="">
    <div class="content">
        <h3>${productName}</h3>
        <span class="price">${productPrice}</span>
    </div>
  `;

  // Get the shopping cart element
  const shoppingCart = document.querySelector('.shopping-cart');

  // Append the new cart item to the shopping cart
  shoppingCart.appendChild(cartItem);

  // Update the total price
  updateTotalPrice();

  // Add event listeners for increasing and decreasing quantity
  const increaseQuantityBtn = cartItem.querySelector('.increase-quantity');
  const decreaseQuantityBtn = cartItem.querySelector('.decrease-quantity');
  increaseQuantityBtn.addEventListener('click', increaseQuantity);
  decreaseQuantityBtn.addEventListener('click', decreaseQuantity);
}

// Function to increase the quantity of an item
function increaseQuantity(event) {
  const quantityElement = event.target.parentElement.querySelector('.quantity');
  let quantity = parseInt(quantityElement.textContent);
  quantity++;
  quantityElement.textContent = quantity;
  updateTotalPrice();
}

// Function to decrease the quantity of an item
function decreaseQuantity(event) {
  const quantityElement = event.target.parentElement.querySelector('.quantity');
  let quantity = parseInt(quantityElement.textContent);
  if (quantity > 1) {
    quantity--;
    quantityElement.textContent = quantity;
    updateTotalPrice();
  }
}

// Function to update the total price in the shopping cart
function updateTotalPrice() {
  const cartItems = document.querySelectorAll('.shopping-cart .box');
  let totalPrice = 0;

  // Loop through each cart item and add up the prices considering the quantity
  cartItems.forEach(item => {
    const priceString = item.querySelector('.price').innerText;
    const price = parseFloat(priceString.replace(/[^\d.]/g, ''));
    const quantity = parseInt(item.querySelector('.quantity').textContent);
    totalPrice += price * quantity;
  });

  // Display the total price in the shopping cart
  const totalPriceElement = document.querySelector('.shopping-cart .total');
  totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Event listener for deleting a product from the cart
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-product')) {
    event.target.parentElement.remove();
    // Update the total price after deleting a product
    updateTotalPrice();
  }
});

// Get the checkout button
const checkoutBtn = document.querySelector('.shopping-cart .btn');

// Event listener for checkout button click
checkoutBtn.addEventListener('click', function (event) {
  event.preventDefault();

  // Prepare the message with product info
  let message = 'I want to purchase the following items:\n';
  const cartItems = document.querySelectorAll('.shopping-cart .box');
  cartItems.forEach(item => {
    const productName = item.querySelector('h3').innerText;
    const productPrice = item.querySelector('.price').innerText;
    const productQuantity = item.querySelector('.quantity').innerText;
    message += `${productName} - ${productPrice} (${productQuantity})\n`;
  });

  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);

  // Open WhatsApp with the encoded message and phone number
  window.open(`https://api.whatsapp.com/send?phone=+917620638650&text=${encodedMessage}`);
});

function openMap() {
  // Replace this with the actual map URL for Bhokar, Jalgaon
  window.location.href = "https://www.google.com/maps/place/Bhokar,+Jalgaon,+Maharashtra+425001,+India";
}


  